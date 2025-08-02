const express = require("express")
const { v4: uuidv4 } = require("uuid")
const { validateComment } = require("../middleware/validation")
const { comments, posts } = require("../data/mockData")

const router = express.Router()

// GET /api/comments/post/:postId - Get comments for a specific post
router.get("/post/:postId", (req, res) => {
  try {
    const { postId } = req.params
    const { page = 1, limit = 10 } = req.query

    // Check if post exists
    const post = posts.find((p) => p.id === postId)
    if (!post) {
      return res.status(404).json({ error: "Post not found" })
    }

    // Get comments for the post
    const postComments = comments
      .filter((comment) => comment.postId === postId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedComments = postComments.slice(startIndex, endIndex)

    res.json({
      comments: paginatedComments,
      pagination: {
        currentPage: Number.parseInt(page),
        totalPages: Math.ceil(postComments.length / limit),
        totalComments: postComments.length,
        hasNext: endIndex < postComments.length,
        hasPrev: startIndex > 0,
      },
    })
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" })
  }
})

// POST /api/comments/post/:postId - Add a comment to a post
router.post("/post/:postId", validateComment, (req, res) => {
  try {
    const { postId } = req.params
    const { author, content } = req.body

    // Check if post exists
    const post = posts.find((p) => p.id === postId)
    if (!post) {
      return res.status(404).json({ error: "Post not found" })
    }

    const newComment = {
      id: uuidv4(),
      postId,
      author,
      content,
      createdAt: new Date().toISOString(),
    }

    comments.unshift(newComment)
    res.status(201).json(newComment)
  } catch (error) {
    res.status(500).json({ error: "Failed to create comment" })
  }
})

// GET /api/comments/:id - Get a specific comment
router.get("/:id", (req, res) => {
  try {
    const comment = comments.find((c) => c.id === req.params.id)

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" })
    }

    res.json(comment)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comment" })
  }
})

// PUT /api/comments/:id - Update a comment
router.put("/:id", validateComment, (req, res) => {
  try {
    const commentIndex = comments.findIndex((c) => c.id === req.params.id)

    if (commentIndex === -1) {
      return res.status(404).json({ error: "Comment not found" })
    }

    const updatedComment = {
      ...comments[commentIndex],
      content: req.body.content,
      updatedAt: new Date().toISOString(),
    }

    comments[commentIndex] = updatedComment
    res.json(updatedComment)
  } catch (error) {
    res.status(500).json({ error: "Failed to update comment" })
  }
})

// DELETE /api/comments/:id - Delete a comment
router.delete("/:id", (req, res) => {
  try {
    const commentIndex = comments.findIndex((c) => c.id === req.params.id)

    if (commentIndex === -1) {
      return res.status(404).json({ error: "Comment not found" })
    }

    comments.splice(commentIndex, 1)
    res.json({ success: true, message: "Comment deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: "Failed to delete comment" })
  }
})

module.exports = router
