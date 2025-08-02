const express = require("express")
const { v4: uuidv4 } = require("uuid")
const { validateCategory } = require("../middleware/validation")
const { categories, posts } = require("../data/mockData")

const router = express.Router()

// GET /api/categories - Get all categories
router.get("/", (req, res) => {
  try {
    // Add post count to each category
    const categoriesWithCounts = categories.map((category) => ({
      ...category,
      postCount: posts.filter((post) => post.categoryId === category.id).length,
    }))

    res.json(categoriesWithCounts)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" })
  }
})

// GET /api/categories/:id - Get a specific category
router.get("/:id", (req, res) => {
  try {
    const category = categories.find((c) => c.id === req.params.id)

    if (!category) {
      return res.status(404).json({ error: "Category not found" })
    }

    // Add post count
    const categoryWithCount = {
      ...category,
      postCount: posts.filter((post) => post.categoryId === category.id).length,
    }

    res.json(categoryWithCount)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch category" })
  }
})

// POST /api/categories - Create a new category
router.post("/", validateCategory, (req, res) => {
  try {
    const { name, description } = req.body

    // Check if category name already exists
    const existingCategory = categories.find((cat) => cat.name.toLowerCase() === name.toLowerCase())

    if (existingCategory) {
      return res.status(400).json({ error: "Category name already exists" })
    }

    const newCategory = {
      id: uuidv4(),
      name,
      description: description || "",
      createdAt: new Date().toISOString(),
      postCount: 0,
    }

    categories.push(newCategory)
    res.status(201).json(newCategory)
  } catch (error) {
    res.status(500).json({ error: "Failed to create category" })
  }
})

// PUT /api/categories/:id - Update a category
router.put("/:id", validateCategory, (req, res) => {
  try {
    const categoryIndex = categories.findIndex((c) => c.id === req.params.id)

    if (categoryIndex === -1) {
      return res.status(404).json({ error: "Category not found" })
    }

    const { name, description } = req.body

    // Check if new name conflicts with existing category (excluding current one)
    const existingCategory = categories.find(
      (cat) => cat.name.toLowerCase() === name.toLowerCase() && cat.id !== req.params.id,
    )

    if (existingCategory) {
      return res.status(400).json({ error: "Category name already exists" })
    }

    const updatedCategory = {
      ...categories[categoryIndex],
      name,
      description: description || categories[categoryIndex].description,
      updatedAt: new Date().toISOString(),
    }

    categories[categoryIndex] = updatedCategory

    // Add post count
    const categoryWithCount = {
      ...updatedCategory,
      postCount: posts.filter((post) => post.categoryId === updatedCategory.id).length,
    }

    res.json(categoryWithCount)
  } catch (error) {
    res.status(500).json({ error: "Failed to update category" })
  }
})

// DELETE /api/categories/:id - Delete a category
router.delete("/:id", (req, res) => {
  try {
    const categoryIndex = categories.findIndex((c) => c.id === req.params.id)

    if (categoryIndex === -1) {
      return res.status(404).json({ error: "Category not found" })
    }

    // Check if category has posts
    const postsInCategory = posts.filter((post) => post.categoryId === req.params.id)
    if (postsInCategory.length > 0) {
      return res.status(400).json({
        error: "Cannot delete category with existing posts",
        postCount: postsInCategory.length,
      })
    }

    categories.splice(categoryIndex, 1)
    res.json({ success: true, message: "Category deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: "Failed to delete category" })
  }
})

module.exports = router
