"use client"

import { useEffect, useState } from "react"
import type { Post } from "@/contexts/blog-context"
import { useApi } from "@/hooks/use-api"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, Edit, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface PostDetailProps {
  postId: string
}

export function PostDetail({ postId }: PostDetailProps) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { getPost, deletePost } = useApi()
  const router = useRouter()
  const { toast } = useToast()

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

  const handleDelete = async () => {
    if (!post || !confirm("Are you sure you want to delete this post?")) return

    const result = await deletePost(post.id)
    if (result.success) {
      toast({
        title: "Success",
        description: "Post deleted successfully",
      })
      router.push("/")
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to delete post",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading post...</div>
  }

  if (error || !post) {
    return <div className="text-center py-8 text-red-500">{error || "Post not found"}</div>
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card className="mb-8">
      {post.imageUrl && (
        <div className="relative h-64 md:h-96 w-full">
          <Image
            src={post.imageUrl || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
      )}

      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {post.category && <Badge variant="secondary">{post.category.name}</Badge>}
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(post.createdAt)}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <User className="w-4 h-4 mr-1" />
              {post.author}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Link href={`/posts/${post.id}/edit`}>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </Link>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
      </CardHeader>

      <CardContent>
        <div className="prose prose-lg max-w-none dark:prose-invert">
          {post.content.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
