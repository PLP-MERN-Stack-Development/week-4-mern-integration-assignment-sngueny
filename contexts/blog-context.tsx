"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"

export interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  categoryId: string
  category?: Category
  author: string
  createdAt: string
  updatedAt: string
  imageUrl?: string
  comments?: Comment[]
}

export interface Category {
  id: string
  name: string
  description: string
  createdAt: string
}

export interface Comment {
  id: string
  postId: string
  author: string
  content: string
  createdAt: string
}

interface BlogState {
  posts: Post[]
  categories: Category[]
  loading: boolean
  error: string | null
  searchQuery: string
  selectedCategory: string
}

type BlogAction =
  | { type: "SET_POSTS"; payload: Post[] }
  | { type: "ADD_POST"; payload: Post }
  | { type: "UPDATE_POST"; payload: Post }
  | { type: "DELETE_POST"; payload: string }
  | { type: "SET_CATEGORIES"; payload: Category[] }
  | { type: "ADD_CATEGORY"; payload: Category }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_SELECTED_CATEGORY"; payload: string }

const initialState: BlogState = {
  posts: [],
  categories: [],
  loading: false,
  error: null,
  searchQuery: "",
  selectedCategory: "",
}

function blogReducer(state: BlogState, action: BlogAction): BlogState {
  switch (action.type) {
    case "SET_POSTS":
      return { ...state, posts: action.payload }
    case "ADD_POST":
      return { ...state, posts: [action.payload, ...state.posts] }
    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post) => (post.id === action.payload.id ? action.payload : post)),
      }
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      }
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload }
    case "ADD_CATEGORY":
      return { ...state, categories: [...state.categories, action.payload] }
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload }
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload }
    case "SET_SELECTED_CATEGORY":
      return { ...state, selectedCategory: action.payload }
    default:
      return state
  }
}

const BlogContext = createContext<{
  state: BlogState
  dispatch: React.Dispatch<BlogAction>
} | null>(null)

export function BlogProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(blogReducer, initialState)

  return <BlogContext.Provider value={{ state, dispatch }}>{children}</BlogContext.Provider>
}

export function useBlog() {
  const context = useContext(BlogContext)
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider")
  }
  return context
}
