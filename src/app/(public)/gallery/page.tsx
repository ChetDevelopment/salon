import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse our portfolio of beauty transformations and salon work.",
}

export default async function GalleryPage() {
  const items = await prisma.galleryItem.findMany({
    where: { isActive: true },
    include: { category: true },
    orderBy: { sortOrder: "asc" },
  })

  const categories = await prisma.category.findMany({
    where: { galleryItems: { some: { isActive: true } } },
    orderBy: { name: "asc" },
  })

  return (
    <>
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Our Gallery</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore our portfolio of stunning transformations.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 py-12">Gallery coming soon.</p>
          ) : categories.length > 1 ? (
            categories.map((category) => {
              const catItems = items.filter((i) => i.categoryId === category.id)
              if (catItems.length === 0) return null
              return (
                <div key={category.id} className="mb-16 last:mb-0">
                  <h2 className="text-2xl font-bold mb-8">{category.name}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {catItems.map((item) => (
                      <div key={item.id} className="group relative overflow-hidden rounded-lg bg-cream">
                        <div className="aspect-square flex items-center justify-center">
                          <span className="text-gray-400">{item.imageUrl ? "[Image]" : "No Image"}</span>
                        </div>
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="text-white text-center p-4">
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            {item.description && <p className="text-sm text-gray-300 mt-1">{item.description}</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div key={item.id} className="group relative overflow-hidden rounded-lg bg-cream">
                  <div className="aspect-square flex items-center justify-center">
                    <span className="text-gray-400">{item.imageUrl ? "[Image]" : "No Image"}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-white text-center p-4">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      {item.description && <p className="text-sm text-gray-300 mt-1">{item.description}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
