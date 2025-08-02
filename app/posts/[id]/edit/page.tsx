import { Suspense } from "react"
import { EditPostForm } from "@/components/edit-post-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface EditPostPageProps {
  params: {
    id: string
  }
}

export default function EditPostPage({ params }: EditPostPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href={`/posts/${params.id}`}>
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Post
        </Button>
      </Link>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
        <Suspense fallback={<div className="text-center py-8">Loading post...</div>}>
          <EditPostForm postId={params.id} />
        </Suspense>
      </div>
    </div>
  )
}
