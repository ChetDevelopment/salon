import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "Gallery",
  description: "Witness the artistry of NĒARY — a portfolio of transformations inspired by Khmer elegance.",
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
      <section className="relative min-h-[50vh] hero-gradient-khmer flex items-center overflow-hidden">
        <div className="absolute inset-0 temple-motif opacity-[0.04]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-khmer-gold-light/60 font-body">Portfolio</span>
          <div className="ornate-divider justify-center my-6">
            <div className="diamond" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display text-white leading-tight mb-6">
            Our <span className="gold-text-gradient">Artistry</span>
          </h1>
          <p className="text-white/40 font-body text-sm max-w-xl mx-auto">
            Every transformation is a masterpiece, inspired by the grace of Khmer heritage.
          </p>
        </div>
      </section>

      <section className="py-28 lg:py-36 bg-[#fdf8f3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <p className="text-center text-[#161618]/40 font-body py-12">Gallery coming soon.</p>
          ) : categories.length > 1 ? (
            categories.map((category) => {
              const catItems = items.filter((i) => i.categoryId === category.id)
              if (catItems.length === 0) return null
              return (
                <div key={category.id} className="mb-20 last:mb-0">
                  <div className="mb-10">
                    <h2 className="text-2xl sm:text-3xl font-display text-[#161618] mb-3">{category.name}</h2>
                    <div className="ornate-divider justify-start">
                      <div className="diamond" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {catItems.map((item) => (
                      <div key={item.id} className="group relative overflow-hidden rounded-2xl khmer-card bg-white">
                        <div className="aspect-square flex items-center justify-center bg-gradient-to-br from-khmer-gold/5 to-transparent">
                          <span className="text-khmer-gold/30 font-display text-sm">
                            {item.imageUrl ? "[Image]" : "No Image"}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#161618] via-[#161618]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <h3 className="text-white font-display text-lg mb-1">{item.title}</h3>
                            {item.description && (
                              <p className="text-white/50 font-body text-xs">{item.description}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((item) => (
                <div key={item.id} className="group relative overflow-hidden rounded-2xl khmer-card bg-white">
                  <div className="aspect-square flex items-center justify-center bg-gradient-to-br from-khmer-gold/5 to-transparent">
                    <span className="text-khmer-gold/30 font-display text-sm">
                      {item.imageUrl ? "[Image]" : "No Image"}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161618] via-[#161618]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white font-display text-lg mb-1">{item.title}</h3>
                      {item.description && (
                        <p className="text-white/50 font-body text-xs">{item.description}</p>
                      )}
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
