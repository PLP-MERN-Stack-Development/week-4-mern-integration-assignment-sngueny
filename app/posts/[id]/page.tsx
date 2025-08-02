import { Suspense } from "react"
import { PostDetail } from "@/components/post-detail"
import { CommentSection } from "@/components/comment-section"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface PostPageProps {
  params: {
    id: string
  }
}

export default function PostPage({ params }: PostPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Posts
        </Button>
      </Link>

      <Suspense fallback={<div className="text-center py-8">Loading post...</div>}>
        <PostDetail postId={params.id} />
      </Suspense>

      <Suspense fallback={<div className="text-center py-4">Loading comments...</div>}>
        <CommentSection postId={params.id} />
      </Suspense>
    </div>
  )
}
