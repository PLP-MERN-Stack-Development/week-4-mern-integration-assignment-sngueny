"use client"

import type React from "react"

import { useEffect, useState } from "react"
import type { Comment } from "@/contexts/blog-context"
import { useApi } from "@/hooks/use-api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CommentSectionProps {
  postId: string
}

export function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState({ author: "", content: "" })
  const [submitting, setSubmitting] = useState(false)
  const { getComments, createComment } = useApi()
  const { toast } = useToast()

  useEffect(() => {
    const loadComments = async () => {
      const result = await getComments(postId)
      if (result.success && result.data) {
        setComments(result.data)
      }
      setLoading(false)
    }
    loadComments()
  }, [postId])

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.author.trim() || !newComment.content.trim()) return

    setSubmitting(true)
    const result = await createComment(postId, newComment)

    if (result.success && result.data) {
      setComments([result.data, ...comments])
      setNewComment({ author: "", content: "" })
      toast({
        title: "Success",
        description: "Comment added successfully",
      })
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to add comment",
        variant: "destructive",
      })
    }
    setSubmitting(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageCircle className="w-5 h-5 mr-2" />
          Comments ({comments.length})
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmitComment} className="mb-6 space-y-4">
          <Input
            placeholder="Your name"
            value={newComment.author}
            onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
            required
          />
          <Textarea
            placeholder="Write your comment..."
            value={newComment.content}
            onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
            rows={3}
            required
          />
          <Button type="submit" disabled={submitting}>
            <Send className="w-4 h-4 mr-2" />
            {submitting ? "Posting..." : "Post Comment"}
          </Button>
        </form>

        {loading ? (
          <div className="text-center py-4">Loading comments...</div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No comments yet. Be the first to comment!</div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="border-l-2 border-muted pl-4 py-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-sm font-medium">
                    <User className="w-4 h-4 mr-1" />
                    {comment.author}
                  </div>
                  <span className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</span>
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
