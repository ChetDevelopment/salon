import { prisma } from "@/lib/prisma"
import { GalleryManager } from "@/components/admin/GalleryManager"

export default async function AdminGalleryPage() {
  const [items, categories] = await Promise.all([
    prisma.galleryItem.findMany({
      include: { category: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ])

  const serialized = items.map((i) => ({
    ...i,
    createdAt: i.createdAt.toISOString(),
    updatedAt: i.updatedAt.toISOString(),
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Gallery</h1>
        <p className="text-gray-600">Manage your gallery images</p>
      </div>
      <GalleryManager items={serialized as any} categories={categories} />
    </div>
  )
}
