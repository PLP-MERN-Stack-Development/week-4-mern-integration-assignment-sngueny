"use client"

import { useEffect } from "react"
import { useBlog } from "@/contexts/blog-context"
import { useApi } from "@/hooks/use-api"
import { PostCard } from "./post-card"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export function PostList() {
  const { state, dispatch } = useBlog()
  const { getPosts, loading } = useApi()

  const loadPosts = async () => {
    dispatch({ type: "SET_LOADING", payload: true })
    const result = await getPosts(state.searchQuery, state.selectedCategory)

    if (result.success && result.data) {
      dispatch({ type: "SET_POSTS", payload: result.data })
      dispatch({ type: "SET_ERROR", payload: null })
    } else {
      dispatch({ type: "SET_ERROR", payload: result.error || "Failed to load posts" })
    }
    dispatch({ type: "SET_LOADING", payload: false })
  }

  useEffect(() => {
    loadPosts()
  }, [state.searchQuery, state.selectedCategory])

  if (state.loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <RefreshCw className="w-6 h-6 animate-spin mr-2" />
        Loading posts...
      </div>
    )
  }

  if (state.error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{state.error}</p>
        <Button onClick={loadPosts} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </div>
    )
  }

  if (state.posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No posts found</p>
        <Button onClick={loadPosts} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {state.posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
