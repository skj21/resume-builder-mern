// backend/controllers/uploadImages.js
import fs from "fs";
import path from "path";
import Resume from "../models/resumeModel.js";

export const uploadResumeImage = async (req, res) => {
  try {
    const resumeId = req.params.id;

    // Make sure multer has already run on this route (we'll set that in routes)
    const resume = await Resume.findOne({
      _id: resumeId,
      userId: req.user._id
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found or unauthorized" });
    }

    const uploadsFolder = path.join(process.cwd(), "uploads");
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    // Correct access for fields upload
    const newThumbnail = req.files?.thumbnail?.[0] || null;
    const newProfileImage = req.files?.profileImage?.[0] || null;

    if (newThumbnail) {
      if (resume.thumbnailLink) {
        const oldFile = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
        if (fs.existsSync(oldFile)) fs.unlinkSync(oldFile);
      }
      resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
    }

    if (newProfileImage) {
      if (resume.profileInfo?.profilePreviewUrl) {
        const oldFile = path.join(
          uploadsFolder,
          path.basename(resume.profileInfo.profilePreviewUrl)
        );
        if (fs.existsSync(oldFile)) fs.unlinkSync(oldFile);
      }
      // ensure profileInfo object exists
      resume.profileInfo = resume.profileInfo || {};
      resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
    }

    await resume.save();

    return res.status(200).json({
      message: "Image uploaded successfully",
      thumbnailLink: resume.thumbnailLink,
      profilePreviewUrl: resume.profileInfo?.profilePreviewUrl || null
    });
  } catch (err) {
    console.error("Error uploading images:", err);
    return res.status(500).json({
      message: "Failed to upload images",
      error: err.message
    });
  }
};
