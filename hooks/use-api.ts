"use client"

import { useState, useCallback } from "react"
import type { Post, Category, Comment } from "@/contexts/blog-context"

interface ApiResponse<T> {
  data?: T
  error?: string
  success: boolean
}

export function useApi() {
  const [loading, setLoading] = useState(false)

  const apiCall = useCallback(async (url: string, options: RequestInit = {}): Promise<ApiResponse<any>> => {
    setLoading(true)
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      })

      const data = await response.json()

      if (!response.ok) {
        return { error: data.error || "An error occurred", success: false }
      }

      return { data, success: true }
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Network error",
        success: false,
      }
    } finally {
      setLoading(false)
    }
  }, [])

  // Posts API
  const getPosts = useCallback(
    async (query?: string, categoryId?: string) => {
      const params = new URLSearchParams()
      if (query) params.append("q", query)
      if (categoryId) params.append("categoryId", categoryId)

      return apiCall(`/api/posts?${params.toString()}`)
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
      return apiCall<{ success: boolean }>(`/api/posts/${id}`, {
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
    async (postId: string) => {
      return apiCall(`/api/posts/${postId}/comments`)
    },
    [apiCall],
  )

  const createComment = useCallback(
    async (postId: string, comment: Omit<Comment, "id" | "postId" | "createdAt">) => {
      return apiCall(`/api/posts/${postId}/comments`, {
        method: "POST",
        body: JSON.stringify(comment),
      })
    },
    [apiCall],
  )

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
  }
}
