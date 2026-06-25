import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Services",
  description: "Explore our premium beauty and makeup services with pricing.",
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

  if (services.length === 0) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-gray-600">Services coming soon. Check back later.</p>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            From makeup to hair, we offer a complete range of beauty services.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.map((category) => {
            const categoryServices = services.filter((s) => s.categoryId === category.id)
            if (categoryServices.length === 0) return null

            return (
              <div key={category.id} className="mb-16 last:mb-0">
                <h2 className="text-2xl sm:text-3xl font-bold mb-8">{category.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryServices.map((service) => (
                    <div key={service.id} className="bg-white border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="bg-cream rounded-lg h-40 mb-4 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">
                          {service.image ? "[Image]" : "No Image"}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-gold">{formatPrice(Number(service.price))}</span>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          {service.duration} min
                        </span>
                      </div>
                      <Button href={`/booking?service=${service.id}`} size="sm" className="w-full">
                        Book Now
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
