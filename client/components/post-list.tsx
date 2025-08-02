"use client"

import { useEffect } from "react"
import { useBlog } from "@/contexts/blog-context"
import { useApi } from "@/hooks/use-api"
import { PostCard } from "./post-card"
import { Button } from "@/components/ui/button"
import { RefreshCw, ChevronLeft, ChevronRight } from "lucide-react"

export function PostList() {
  const { state, dispatch } = useBlog()
  const { getPosts, loading } = useApi()

  const loadPosts = async (page = 1) => {
    dispatch({ type: "SET_LOADING", payload: true })
    const result = await getPosts(state.searchQuery, state.selectedCategory, page, 9)

    if (result.success && result.data) {
      dispatch({ type: "SET_POSTS", payload: result.data })
      dispatch({ type: "SET_PAGINATION", payload: result.pagination || null })
      dispatch({ type: "SET_ERROR", payload: null })
    } else {
      dispatch({ type: "SET_ERROR", payload: result.error || "Failed to load posts" })
    }
    dispatch({ type: "SET_LOADING", payload: false })
  }

  useEffect(() => {
    loadPosts(1) // Reset to page 1 when search/filter changes
  }, [state.searchQuery, state.selectedCategory])

  const handlePageChange = (page: number) => {
    loadPosts(page)
  }

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
        <Button onClick={() => loadPosts()} variant="outline">
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
        <Button onClick={() => loadPosts()} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {state.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      {state.pagination && state.pagination.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => handlePageChange(state.pagination!.currentPage - 1)}
            disabled={!state.pagination.hasPrev}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <span className="text-sm text-muted-foreground">
            Page {state.pagination.currentPage} of {state.pagination.totalPages}
          </span>

          <Button
            variant="outline"
            onClick={() => handlePageChange(state.pagination!.currentPage + 1)}
            disabled={!state.pagination.hasNext}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  )
}
