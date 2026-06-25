import { prisma } from "@/lib/prisma"
import { ReviewsManager } from "@/components/admin/ReviewsManager"

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
  })

  const serialized = reviews.map((r) => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reviews</h1>
        <p className="text-gray-600">Manage customer reviews</p>
      </div>
      <ReviewsManager reviews={serialized as any} />
    </div>
  )
}
