import { Suspense } from "react"
import { PostList } from "@/components/post-list"
import { SearchAndFilter } from "@/components/search-and-filter"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Blog Posts</h1>
          <p className="text-muted-foreground">Discover amazing content from our community</p>
        </div>
        <Link href="/posts/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Post
          </Button>
        </Link>
      </div>

      <SearchAndFilter />

      <Suspense fallback={<div className="text-center py-8">Loading posts...</div>}>
        <PostList />
      </Suspense>
    </div>
  )
}
