"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useBlog, type Post } from "@/contexts/blog-context"
import { useApi } from "@/hooks/use-api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Save, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface PostFormProps {
  post?: Post
  isEditing?: boolean
}

export function PostForm({ post, isEditing = false }: PostFormProps) {
  const [formData, setFormData] = useState({
    title: post?.title || "",
    content: post?.content || "",
    excerpt: post?.excerpt || "",
    categoryId: post?.categoryId || "",
    author: post?.author || "",
    imageUrl: post?.imageUrl || "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [showNewCategory, setShowNewCategory] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: "", description: "" })

  const { state, dispatch } = useBlog()
  const { createPost, updatePost, getCategories, createCategory } = useApi()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const loadCategories = async () => {
      const result = await getCategories()
      if (result.success && result.data) {
        dispatch({ type: "SET_CATEGORIES", payload: result.data })
      }
    }
    loadCategories()
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })

    // Auto-generate excerpt from content
    if (field === "content" && !formData.excerpt) {
      const excerpt = value.substring(0, 150) + (value.length > 150 ? "..." : "")
      setFormData((prev) => ({ ...prev, excerpt }))
    }
  }

  const handleCreateCategory = async () => {
    if (!newCategory.name.trim()) return

    const result = await createCategory(newCategory)
    if (result.success && result.data) {
      dispatch({ type: "ADD_CATEGORY", payload: result.data })
      setFormData({ ...formData, categoryId: result.data.id })
      setNewCategory({ name: "", description: "" })
      setShowNewCategory(false)
      toast({
        title: "Success",
        description: "Category created successfully",
      })
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to create category",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.content.trim() || !formData.author.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)

    const postData = {
      ...formData,
      excerpt: formData.excerpt || formData.content.substring(0, 150) + "...",
    }

    const result = isEditing && post ? await updatePost(post.id, postData) : await createPost(postData)

    if (result.success && result.data) {
      if (isEditing) {
        dispatch({ type: "UPDATE_POST", payload: result.data })
      } else {
        dispatch({ type: "ADD_POST", payload: result.data })
      }

      toast({
        title: "Success",
        description: `Post ${isEditing ? "updated" : "created"} successfully`,
      })
      router.push(`/posts/${result.data.id}`)
    } else {
      toast({
        title: "Error",
        description: result.error || `Failed to ${isEditing ? "update" : "create"} post`,
        variant: "destructive",
      })
    }
    setSubmitting(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Post" : "Create New Post"}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter post title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Author *</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => handleInputChange("author", e.target.value)}
              placeholder="Enter author name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Featured Image URL</Label>
            <Input
              id="imageUrl"
              value={formData.imageUrl}
              onChange={(e) => handleInputChange("imageUrl", e.target.value)}
              placeholder="https://example.com/image.jpg"
              type="url"
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <div className="flex gap-2">
              <Select value={formData.categoryId} onValueChange={(value) => handleInputChange("categoryId", value)}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {state.categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" variant="outline" onClick={() => setShowNewCategory(!showNewCategory)}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {showNewCategory && (
              <div className="mt-4 p-4 border rounded-lg space-y-3">
                <Input
                  placeholder="Category name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                />
                <Input
                  placeholder="Category description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                />
                <div className="flex gap-2">
                  <Button type="button" onClick={handleCreateCategory} size="sm">
                    Create Category
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowNewCategory(false)} size="sm">
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => handleInputChange("excerpt", e.target.value)}
              placeholder="Brief description of the post (auto-generated from content if left empty)"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              placeholder="Write your post content here..."
              rows={12}
              required
            />
          </div>

          <Button type="submit" disabled={submitting} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            {submitting ? (isEditing ? "Updating..." : "Creating...") : isEditing ? "Update Post" : "Create Post"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
