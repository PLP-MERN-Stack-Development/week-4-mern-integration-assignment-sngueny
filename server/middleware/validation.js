const Joi = require("joi")

// Post validation schema
const postSchema = Joi.object({
  title: Joi.string().min(1).max(500).required().messages({
    "string.empty": "Title is required",
    "string.max": "Title must be less than 500 characters",
  }),
  content: Joi.string().min(1).required().messages({
    "string.empty": "Content is required",
  }),
  excerpt: Joi.string().max(300).optional().allow(""),
  categoryId: Joi.string().optional().allow(""),
  author: Joi.string().min(1).max(255).required().messages({
    "string.empty": "Author is required",
    "string.max": "Author name must be less than 255 characters",
  }),
  imageUrl: Joi.string().uri().optional().allow(""),
})

// Post update validation schema (all fields optional)
const postUpdateSchema = Joi.object({
  title: Joi.string().min(1).max(500).optional(),
  content: Joi.string().min(1).optional(),
  excerpt: Joi.string().max(300).optional().allow(""),
  categoryId: Joi.string().optional().allow(""),
  author: Joi.string().min(1).max(255).optional(),
  imageUrl: Joi.string().uri().optional().allow(""),
})

// Category validation schema
const categorySchema = Joi.object({
  name: Joi.string().min(1).max(100).required().messages({
    "string.empty": "Category name is required",
    "string.max": "Category name must be less than 100 characters",
  }),
  description: Joi.string().max(500).optional().allow(""),
})

// Comment validation schema
const commentSchema = Joi.object({
  author: Joi.string().min(1).max(255).required().messages({
    "string.empty": "Author name is required",
    "string.max": "Author name must be less than 255 characters",
  }),
  content: Joi.string().min(1).max(1000).required().messages({
    "string.empty": "Comment content is required",
    "string.max": "Comment must be less than 1000 characters",
  }),
})

// Validation middleware functions
const validatePost = (req, res, next) => {
  const { error } = postSchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      error: "Validation failed",
      details: error.details.map((detail) => detail.message),
    })
  }
  next()
}

const validatePostUpdate = (req, res, next) => {
  const { error } = postUpdateSchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      error: "Validation failed",
      details: error.details.map((detail) => detail.message),
    })
  }
  next()
}

const validateCategory = (req, res, next) => {
  const { error } = categorySchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      error: "Validation failed",
      details: error.details.map((detail) => detail.message),
    })
  }
  next()
}

const validateComment = (req, res, next) => {
  const { error } = commentSchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      error: "Validation failed",
      details: error.details.map((detail) => detail.message),
    })
  }
  next()
}

module.exports = {
  validatePost,
  validatePostUpdate,
  validateCategory,
  validateComment,
}
