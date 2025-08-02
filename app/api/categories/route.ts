import { type NextRequest, NextResponse } from "next/server"
import type { Category } from "@/contexts/blog-context"

// Mock database
const categories: Category[] = [
  { id: "1", name: "Web Development", description: "All about web development", createdAt: new Date().toISOString() },
  { id: "2", name: "Technology", description: "Latest in technology", createdAt: new Date().toISOString() },
  { id: "3", name: "Design", description: "UI/UX and design topics", createdAt: new Date().toISOString() },
]

export async function GET() {
  try {
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 })
    }

    const newCategory: Category = {
      id: (categories.length + 1).toString(),
      name: body.name,
      description: body.description || "",
      createdAt: new Date().toISOString(),
    }

    categories.push(newCategory)

    return NextResponse.json(newCategory, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}
