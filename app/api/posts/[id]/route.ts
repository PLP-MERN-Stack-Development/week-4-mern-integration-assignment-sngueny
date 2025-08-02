import { type NextRequest, NextResponse } from "next/server"
import type { Post, Category } from "@/contexts/blog-context"

// Mock database - same as in route.ts
const posts: Post[] = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    content:
      "Next.js is a powerful React framework that makes building web applications easier and more efficient. In this comprehensive guide, we'll explore the key features that make Next.js stand out from other frameworks.\n\nFirst, let's talk about the App Router, which is the recommended way to build Next.js applications. The App Router provides a more intuitive file-based routing system that makes organizing your application structure straightforward.\n\nServer Components are another game-changing feature. They allow you to render components on the server, reducing the JavaScript bundle size sent to the client and improving performance significantly.",
    excerpt: "Learn the fundamentals of Next.js and discover why it's become the go-to framework for React developers.",
    categoryId: "1",
    category: {
      id: "1",
      name: "Web Development",
      description: "All about web development",
      createdAt: new Date().toISOString(),
    },
    author: "John Doe",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    imageUrl: "/placeholder.svg?height=400&width=600",
    comments: [],
  },
  {
    id: "2",
    title: "The Future of Web Development",
    content:
      "The web development landscape is constantly evolving, with new technologies and frameworks emerging regularly. As we look toward the future, several trends are shaping how we build web applications.\n\nArtificial Intelligence is becoming increasingly integrated into development workflows. From code completion to automated testing, AI tools are helping developers become more productive and write better code.\n\nEdge computing is another significant trend. By processing data closer to users, we can create faster, more responsive applications that provide better user experiences regardless of geographic location.",
    excerpt: "Explore the emerging trends and technologies that will shape the future of web development.",
    categoryId: "2",
    category: { id: "2", name: "Technology", description: "Latest in technology", createdAt: new Date().toISOString() },
    author: "Jane Smith",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
    imageUrl: "/placeholder.svg?height=400&width=600",
    comments: [],
  },
  {
    id: "3",
    title: "Building Responsive Designs",
    content:
      "Creating responsive web designs is essential in today's multi-device world. Users access websites from smartphones, tablets, laptops, and desktop computers, each with different screen sizes and capabilities.\n\nThe key to successful responsive design lies in understanding CSS Grid and Flexbox. These layout systems provide powerful tools for creating flexible, adaptive layouts that work across all device sizes.\n\nMobile-first design is a crucial approach. By starting with the smallest screen size and progressively enhancing for larger screens, you ensure that your website works well on all devices.",
    excerpt: "Master the art of creating websites that look great on any device with responsive design principles.",
    categoryId: "3",
    category: { id: "3", name: "Design", description: "UI/UX and design topics", createdAt: new Date().toISOString() },
    author: "Mike Johnson",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date(Date.now() - 259200000).toISOString(),
    imageUrl: "/placeholder.svg?height=400&width=600",
    comments: [],
  },
]

const categories: Category[] = [
  { id: "1", name: "Web Development", description: "All about web development", createdAt: new Date().toISOString() },
  { id: "2", name: "Technology", description: "Latest in technology", createdAt: new Date().toISOString() },
  { id: "3", name: "Design", description: "UI/UX and design topics", createdAt: new Date().toISOString() },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const post = posts.find((p) => p.id === params.id)

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    // Add category information
    const postWithCategory = {
      ...post,
      category: categories.find((cat) => cat.id === post.categoryId),
    }

    return NextResponse.json(postWithCategory)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const postIndex = posts.findIndex((p) => p.id === params.id)

    if (postIndex === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    const updatedPost = {
      ...posts[postIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    posts[postIndex] = updatedPost

    // Add category information
    const postWithCategory = {
      ...updatedPost,
      category: categories.find((cat) => cat.id === updatedPost.categoryId),
    }

    return NextResponse.json(postWithCategory)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const postIndex = posts.findIndex((p) => p.id === params.id)

    if (postIndex === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    posts.splice(postIndex, 1)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}
