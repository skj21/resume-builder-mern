// backend/server.js
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/db.js'
import userRouter from './routes/userRoutes.js'
import resumeRoutes from './routes/resumeRoutes.js'

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Use PORT from environment (Render) or fallback to 4000 for local
const PORT = process.env.PORT || 4000

// Configure CORS
// During development you allow localhost; in production you should set the frontend URL.
// For now this allows any origin (you can change to restrict later).
app.use(
  cors({
    origin: true,
    credentials: true
  })
)

// CONNECT DB
connectDB()

// MIDDLEWARE
app.use(express.json())

// Routes
app.use('/api/auth', userRouter)
app.use('/api/resume', resumeRoutes)

// Serve uploads and set permissive CORS header for static files
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res, _path) => {
      // Allow all origins for uploaded assets (safe if assets are public).
      // If you want to lock down, replace '*' with the exact frontend origin.
      res.set('Access-Control-Allow-Origin', '*')
    }
  })
)

// Simple health route
app.get('/', (req, res) => {
  res.send('API WORKING')
})

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
