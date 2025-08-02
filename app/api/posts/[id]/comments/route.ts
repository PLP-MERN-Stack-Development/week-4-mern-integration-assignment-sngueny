import { type NextRequest, NextResponse } from "next/server"
import type { Comment } from "@/contexts/blog-context"

// Mock database for comments
const comments: Comment[] = [
  {
    id: "1",
    postId: "1",
    author: "Alice Johnson",
    content: "Great article! This really helped me understand Next.js better.",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "2",
    postId: "1",
    author: "Bob Wilson",
    content: "Thanks for the detailed explanation. Looking forward to more posts like this.",
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "3",
    postId: "2",
    author: "Carol Davis",
    content: "The future of web development is indeed exciting. AI integration is a game changer.",
    createdAt: new Date(Date.now() - 1800000).toISOString(),
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const postComments = comments
      .filter((comment) => comment.postId === params.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json(postComments)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    if (!body.author || !body.content) {
      return NextResponse.json({ error: "Author and content are required" }, { status: 400 })
    }

    const newComment: Comment = {
      id: (comments.length + 1).toString(),
      postId: params.id,
      author: body.author,
      content: body.content,
      createdAt: new Date().toISOString(),
    }

    comments.unshift(newComment)

    return NextResponse.json(newComment, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 })
  }
}
