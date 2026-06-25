import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { formatPrice } from "@/lib/utils"
import { Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Services",
  description: "Discover our curated treatments — where ancient Khmer rituals meet modern luxury.",
}

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    include: { category: true },
    orderBy: { category: { name: "asc" } },
  })

  const categories = await prisma.category.findMany({
    where: { services: { some: { isActive: true } } },
    orderBy: { name: "asc" },
  })

  return (
    <>
      <section className="relative min-h-[60vh] hero-gradient-khmer flex items-center overflow-hidden">
        <div className="absolute inset-0 temple-motif opacity-[0.04]" />
        <div className="absolute inset-0 silk-texture" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-khmer-gold-light/60 font-body">Our Treatments</span>
          <div className="ornate-divider justify-center my-6">
            <div className="diamond" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display text-white leading-tight mb-6">
            Sacred <span className="gold-text-gradient">Rituals</span>
          </h1>
          <p className="text-white/40 font-body text-sm max-w-xl mx-auto">
            Each treatment is a ceremony. Each product, an offering. You are our honored guest.
          </p>
        </div>
      </section>

      <section className="py-28 lg:py-36 bg-[#fdf8f3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.length === 0 ? (
            <p className="text-center text-[#161618]/40 font-body py-12">Treatments coming soon.</p>
          ) : (
            categories.map((category) => {
              const categoryServices = services.filter((s) => s.categoryId === category.id)
              if (categoryServices.length === 0) return null

              return (
                <div key={category.id} className="mb-20 last:mb-0">
                  <div className="mb-12">
                    <h2 className="text-2xl sm:text-3xl font-display text-[#161618] mb-3">{category.name}</h2>
                    <div className="ornate-divider justify-start">
                      <div className="diamond" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryServices.map((service) => (
                      <div key={service.id} className="khmer-card rounded-2xl bg-white overflow-hidden group">
                        <div className="aspect-[4/3] gold-gradient-bg flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-[#161618] opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                          <span className="text-white/40 font-display text-sm z-10">
                            {service.image ? "[Image]" : "No Image"}
                          </span>
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-display text-[#161618] mb-2">{service.name}</h3>
                          <p className="text-sm text-[#161618]/40 font-body leading-relaxed mb-5 line-clamp-2">
                            {service.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-display gold-text-gradient">
                              {formatPrice(Number(service.price))}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-[#161618]/30 font-body">
                              <Clock className="h-3.5 w-3.5" />
                              {service.duration} min
                            </span>
                          </div>
                          <Link
                            href={`/booking?service=${service.id}`}
                            className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-khmer-gold/20 text-khmer-gold text-sm font-body hover:bg-khmer-gold hover:text-white transition-all duration-300"
                          >
                            Book This Ritual
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </section>
    </>
  )
}
