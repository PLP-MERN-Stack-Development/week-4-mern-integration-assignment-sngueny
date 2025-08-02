"use client"

import { useEffect } from "react"
import { useBlog } from "@/contexts/blog-context"
import { useApi } from "@/hooks/use-api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, Tags } from "lucide-react"
import Link from "next/link"

export function CategoryList() {
  const { state, dispatch } = useBlog()
  const { getCategories, loading } = useApi()

  const loadCategories = async () => {
    dispatch({ type: "SET_LOADING", payload: true })
    const result = await getCategories()

    if (result.success && result.data) {
      dispatch({ type: "SET_CATEGORIES", payload: result.data })
      dispatch({ type: "SET_ERROR", payload: null })
    } else {
      dispatch({ type: "SET_ERROR", payload: result.error || "Failed to load categories" })
    }
    dispatch({ type: "SET_LOADING", payload: false })
  }

  useEffect(() => {
    loadCategories()
  }, [])

  // Count posts per category
  const getCategoryPostCount = (categoryId: string) => {
    return state.posts.filter((post) => post.categoryId === categoryId).length
  }

  if (state.loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <RefreshCw className="w-6 h-6 animate-spin mr-2" />
        Loading categories...
      </div>
    )
  }

  if (state.error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{state.error}</p>
        <Button onClick={loadCategories} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {state.categories.map((category) => (
        <Card key={category.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Tags className="w-5 h-5 mr-2" />
                {category.name}
              </div>
              <Badge variant="secondary">{getCategoryPostCount(category.id)} posts</Badge>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground mb-4">{category.description || "No description available"}</p>

            <Link href={`/?category=${category.id}`}>
              <Button className="w-full">View Posts</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
