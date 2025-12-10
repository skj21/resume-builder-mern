import mongoose from "mongoose";

export const connectDB = async ()=> {
  await mongoose.connect('mongodb+srv://shashankjha2621_db_user:ResumeBuild21@cluster0.gytpa8v.mongodb.net/RESUME')
  .then(() => console.log('DB CONNECTED'))
}