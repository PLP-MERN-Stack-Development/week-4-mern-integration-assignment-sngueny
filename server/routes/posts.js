const express = require("express")
const { v4: uuidv4 } = require("uuid")
const { validatePost, validatePostUpdate } = require("../middleware/validation")
const { posts, categories } = require("../data/mockData")

const router = express.Router()

// GET /api/posts - Get all posts with optional search and filtering
router.get("/", (req, res) => {
  try {
    const { q: query, categoryId, page = 1, limit = 10 } = req.query

    let filteredPosts = [...posts]

    // Filter by search query
    if (query) {
      const searchTerm = query.toLowerCase()
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm) ||
          post.content.toLowerCase().includes(searchTerm) ||
          post.author.toLowerCase().includes(searchTerm),
      )
    }

    // Filter by category
    if (categoryId) {
      filteredPosts = filteredPosts.filter((post) => post.categoryId === categoryId)
    }

    // Add category information
    const postsWithCategories = filteredPosts.map((post) => ({
      ...post,
      category: categories.find((cat) => cat.id === post.categoryId),
    }))

    // Sort by creation date (newest first)
    postsWithCategories.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedPosts = postsWithCategories.slice(startIndex, endIndex)

    res.json({
      posts: paginatedPosts,
      pagination: {
        currentPage: Number.parseInt(page),
        totalPages: Math.ceil(postsWithCategories.length / limit),
        totalPosts: postsWithCategories.length,
        hasNext: endIndex < postsWithCategories.length,
        hasPrev: startIndex > 0,
      },
    })
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" })
  }
})

// GET /api/posts/:id - Get a specific post
router.get("/:id", (req, res) => {
  try {
    const post = posts.find((p) => p.id === req.params.id)

    if (!post) {
      return res.status(404).json({ error: "Post not found" })
    }

    // Add category information
    const postWithCategory = {
      ...post,
      category: categories.find((cat) => cat.id === post.categoryId),
    }

    res.json(postWithCategory)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch post" })
  }
})

// POST /api/posts - Create a new post
router.post("/", validatePost, (req, res) => {
  try {
    const { title, content, excerpt, categoryId, author, imageUrl } = req.body

    const newPost = {
      id: uuidv4(),
      title,
      content,
      excerpt: excerpt || content.substring(0, 150) + "...",
      categoryId: categoryId || "",
      author,
      imageUrl: imageUrl || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: [],
    }

    posts.unshift(newPost)

    // Add category information for response
    const postWithCategory = {
      ...newPost,
      category: categories.find((cat) => cat.id === newPost.categoryId),
    }

    res.status(201).json(postWithCategory)
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" })
  }
})

// PUT /api/posts/:id - Update an existing post
router.put("/:id", validatePostUpdate, (req, res) => {
  try {
    const postIndex = posts.findIndex((p) => p.id === req.params.id)

    if (postIndex === -1) {
      return res.status(404).json({ error: "Post not found" })
    }

    const updatedPost = {
      ...posts[postIndex],
      ...req.body,
      updatedAt: new Date().toISOString(),
    }

    posts[postIndex] = updatedPost

    // Add category information for response
    const postWithCategory = {
      ...updatedPost,
      category: categories.find((cat) => cat.id === updatedPost.categoryId),
    }

    res.json(postWithCategory)
  } catch (error) {
    res.status(500).json({ error: "Failed to update post" })
  }
})

// DELETE /api/posts/:id - Delete a post
router.delete("/:id", (req, res) => {
  try {
    const postIndex = posts.findIndex((p) => p.id === req.params.id)

    if (postIndex === -1) {
      return res.status(404).json({ error: "Post not found" })
    }

    posts.splice(postIndex, 1)
    res.json({ success: true, message: "Post deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" })
  }
})

module.exports = router
