import { prisma } from "@/lib/prisma"
import { ServicesManager } from "@/components/admin/ServicesManager"

export default async function AdminServicesPage() {
  const [services, categories] = await Promise.all([
    prisma.service.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
    }),
  ])

  const serialized = services.map((s) => ({
    ...s,
    price: Number(s.price),
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Services</h1>
        <p className="text-gray-600">Manage your salon services</p>
      </div>

      <ServicesManager services={serialized as any} categories={categories} />
    </div>
  )
}
