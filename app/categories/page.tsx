import { Suspense } from "react"
import { CategoryList } from "@/components/category-list"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Posts
        </Button>
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Categories</h1>
        <Suspense fallback={<div className="text-center py-8">Loading categories...</div>}>
          <CategoryList />
        </Suspense>
      </div>
    </div>
  )
}
