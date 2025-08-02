const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
require("dotenv").config()

const postsRoutes = require("./routes/posts")
const categoriesRoutes = require("./routes/categories")
const commentsRoutes = require("./routes/comments")
const { errorHandler, notFound } = require("./middleware/errorMiddleware")

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet())
app.use(morgan("combined"))
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
)
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api/posts", postsRoutes)
app.use("/api/categories", categoriesRoutes)
app.use("/api/comments", commentsRoutes)

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Blog API Server is running",
    timestamp: new Date().toISOString(),
  })
})

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📱 Client URL: ${process.env.CLIENT_URL || "http://localhost:3000"}`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`)
})

module.exports = app
