import { prisma } from "@/lib/prisma"
import { BookingsManager } from "@/components/admin/BookingsManager"

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    include: { service: { select: { name: true, price: true, duration: true } } },
    orderBy: { createdAt: "desc" },
  })

  const serialized = bookings.map((b) => ({
    ...b,
    service: { ...b.service, price: Number(b.service.price) },
    date: b.date.toISOString(),
    createdAt: b.createdAt.toISOString(),
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Bookings</h1>
        <p className="text-gray-600">Manage customer bookings</p>
      </div>
      <BookingsManager bookings={serialized as any} />
    </div>
  )
}
