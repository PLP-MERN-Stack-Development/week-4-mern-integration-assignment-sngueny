"use client"

import { useState, useCallback } from "react"
import type { Post, Category, Comment } from "@/contexts/blog-context"

interface ApiResponse<T> {
  data?: T
  error?: string
  success: boolean
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export function useApi() {
  const [loading, setLoading] = useState(false)

  const apiCall = useCallback(async (url: string, options: RequestInit = {}): Promise<ApiResponse<any>> => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          error: data.error || `HTTP ${response.status}: ${response.statusText}`,
          success: false,
        }
      }

      return { data, success: true }
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Network error occurred",
        success: false,
      }
    } finally {
      setLoading(false)
    }
  }, [])

  // Posts API
  const getPosts = useCallback(
    async (query?: string, categoryId?: string, page = 1, limit = 10) => {
      const params = new URLSearchParams()
      if (query) params.append("q", query)
      if (categoryId) params.append("categoryId", categoryId)
      params.append("page", page.toString())
      params.append("limit", limit.toString())

      const result = await apiCall(`/api/posts?${params.toString()}`)

      // Handle both paginated and non-paginated responses
      if (result.success && result.data) {
        if (result.data.posts) {
          // Paginated response
          return { ...result, data: result.data.posts, pagination: result.data.pagination }
        } else {
          // Non-paginated response (backward compatibility)
          return result
        }
      }

      return result
    },
    [apiCall],
  )

  const getPost = useCallback(
    async (id: string) => {
      return apiCall(`/api/posts/${id}`)
    },
    [apiCall],
  )

  const createPost = useCallback(
    async (post: Omit<Post, "id" | "createdAt" | "updatedAt">) => {
      return apiCall("/api/posts", {
        method: "POST",
        body: JSON.stringify(post),
      })
    },
    [apiCall],
  )

  const updatePost = useCallback(
    async (id: string, post: Partial<Post>) => {
      return apiCall(`/api/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify(post),
      })
    },
    [apiCall],
  )

  const deletePost = useCallback(
    async (id: string) => {
      return apiCall(`/api/posts/${id}`, {
        method: "DELETE",
      })
    },
    [apiCall],
  )

  // Categories API
  const getCategories = useCallback(async () => {
    return apiCall("/api/categories")
  }, [apiCall])

  const createCategory = useCallback(
    async (category: Omit<Category, "id" | "createdAt">) => {
      return apiCall("/api/categories", {
        method: "POST",
        body: JSON.stringify(category),
      })
    },
    [apiCall],
  )

  // Comments API
  const getComments = useCallback(
    async (postId: string, page = 1, limit = 10) => {
      const params = new URLSearchParams()
      params.append("page", page.toString())
      params.append("limit", limit.toString())

      const result = await apiCall(`/api/comments/post/${postId}?${params.toString()}`)

      // Handle both paginated and non-paginated responses
      if (result.success && result.data) {
        if (result.data.comments) {
          // Paginated response
          return { ...result, data: result.data.comments, pagination: result.data.pagination }
        } else {
          // Non-paginated response (backward compatibility)
          return result
        }
      }

      return result
    },
    [apiCall],
  )

  const createComment = useCallback(
    async (postId: string, comment: Omit<Comment, "id" | "postId" | "createdAt">) => {
      return apiCall(`/api/comments/post/${postId}`, {
        method: "POST",
        body: JSON.stringify(comment),
      })
    },
    [apiCall],
  )

  // Health check
  const healthCheck = useCallback(async () => {
    return apiCall("/api/health")
  }, [apiCall])

  return {
    loading,
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    getCategories,
    createCategory,
    getComments,
    createComment,
    healthCheck,
  }
}
