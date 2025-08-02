"use client"

import type { Post } from "@/contexts/blog-context"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Calendar, User, Eye, MessageCircle } from "lucide-react"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      {post.imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={post.imageUrl || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
      )}

      <CardHeader className="flex-1">
        <div className="flex items-center justify-between mb-2">
          {post.category && <Badge variant="secondary">{post.category.name}</Badge>}
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(post.createdAt)}
          </div>
        </div>

        <h3 className="text-xl font-semibold line-clamp-2 mb-2">{post.title}</h3>

        <p className="text-muted-foreground line-clamp-3 text-sm">{post.excerpt}</p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            {post.author}
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-1" />
              {post.comments?.length || 0}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Link href={`/posts/${post.id}`} className="w-full">
          <Button className="w-full">
            <Eye className="w-4 h-4 mr-2" />
            Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
