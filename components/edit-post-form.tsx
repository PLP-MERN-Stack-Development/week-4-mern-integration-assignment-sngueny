"use client"

import { useEffect, useState } from "react"
import type { Post } from "@/contexts/blog-context"
import { useApi } from "@/hooks/use-api"
import { PostForm } from "./post-form"

interface EditPostFormProps {
  postId: string
}

export function EditPostForm({ postId }: EditPostFormProps) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { getPost } = useApi()

  useEffect(() => {
    const loadPost = async () => {
      const result = await getPost(postId)
      if (result.success && result.data) {
        setPost(result.data)
        setError(null)
      } else {
        setError(result.error || "Failed to load post")
      }
      setLoading(false)
    }
    loadPost()
  }, [postId])

  if (loading) {
    return <div className="text-center py-8">Loading post...</div>
  }

  if (error || !post) {
    return <div className="text-center py-8 text-red-500">{error || "Post not found"}</div>
  }

  return <PostForm post={post} isEditing={true} />
}
