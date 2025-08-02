"use client"

import { useEffect } from "react"
import { useBlog } from "@/contexts/blog-context"
import { useApi } from "@/hooks/use-api"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

export function SearchAndFilter() {
  const { state, dispatch } = useBlog()
  const { getCategories } = useApi()

  useEffect(() => {
    const loadCategories = async () => {
      const result = await getCategories()
      if (result.success && result.data) {
        dispatch({ type: "SET_CATEGORIES", payload: result.data })
      }
    }
    loadCategories()
  }, [])

  const handleSearchChange = (value: string) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: value })
  }

  const handleCategoryChange = (value: string) => {
    dispatch({ type: "SET_SELECTED_CATEGORY", payload: value === "all" ? "" : value })
  }

  const clearFilters = () => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: "" })
    dispatch({ type: "SET_SELECTED_CATEGORY", payload: "" })
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-muted/50 rounded-lg">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search posts..."
          value={state.searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <Select value={state.selectedCategory || "all"} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {state.categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {(state.searchQuery || state.selectedCategory) && (
        <Button variant="outline" onClick={clearFilters}>
          <X className="w-4 h-4 mr-2" />
          Clear
        </Button>
      )}
    </div>
  )
}
