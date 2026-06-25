import { prisma } from "@/lib/prisma"
import { formatPrice } from "@/lib/utils"
import {
  CalendarCheck,
  Clock,
  DollarSign,
  Scissors,
  Image,
  Star,
  MessageSquare,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

async function getDashboardStats() {
  const [
    totalBookings,
    pendingBookings,
    confirmedBookings,
    completedBookings,
    cancelledBookings,
    totalServices,
    totalGallery,
    totalReviews,
    unreadMessages,
    recentBookings,
    popularServices,
  ] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status: "PENDING" } }),
    prisma.booking.count({ where: { status: "CONFIRMED" } }),
    prisma.booking.count({ where: { status: "COMPLETED" } }),
    prisma.booking.count({ where: { status: "CANCELLED" } }),
    prisma.service.count(),
    prisma.galleryItem.count(),
    prisma.review.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.booking.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { service: { select: { name: true, price: true } } },
    }),
    prisma.booking.groupBy({
      by: ["serviceId"],
      _count: true,
      orderBy: { _count: { serviceId: "desc" } },
      take: 5,
    }),
  ])

  const completedBookingsData = await prisma.booking.findMany({
    where: { status: "COMPLETED" },
    select: { service: { select: { price: true } } },
  })
  const totalRevenue = completedBookingsData.reduce(
    (sum, b) => sum + Number(b.service.price),
    0
  )

  const serviceIds = popularServices.map((s) => s.serviceId)
  const services = serviceIds.length > 0
    ? await prisma.service.findMany({ where: { id: { in: serviceIds } }, select: { id: true, name: true } })
    : []
  const serviceMap = new Map(services.map((s) => [s.id, s.name]))

  return {
    totalBookings,
    pendingBookings,
    confirmedBookings,
    completedBookings,
    cancelledBookings,
    totalRevenue,
    totalServices,
    totalGallery,
    totalReviews,
    unreadMessages,
    recentBookings: recentBookings.map((b) => ({
      ...b,
      service: { ...b.service, price: Number(b.service.price) },
      date: b.date.toISOString(),
      createdAt: b.createdAt.toISOString(),
    })),
    popularServices: popularServices.map((s) => ({
      name: serviceMap.get(s.serviceId) || "Unknown",
      count: s._count,
    })),
  }
}

export default async function DashboardPage() {
  const stats = await getDashboardStats()

  const cards = [
    { label: "Total Bookings", value: stats.totalBookings, icon: CalendarCheck, color: "bg-blue-500" },
    { label: "Pending", value: stats.pendingBookings, icon: Clock, color: "bg-yellow-500" },
    { label: "Completed", value: stats.completedBookings, icon: TrendingUp, color: "bg-green-500" },
    { label: "Revenue", value: formatPrice(stats.totalRevenue), icon: DollarSign, color: "bg-gold" },
    { label: "Services", value: stats.totalServices, icon: Scissors, color: "bg-purple-500" },
    { label: "Gallery", value: stats.totalGallery, icon: Image, color: "bg-pink-500" },
    { label: "Reviews", value: stats.totalReviews, icon: Star, color: "bg-orange-500" },
    { label: "Messages", value: stats.unreadMessages, icon: MessageSquare, color: "bg-teal-500" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Overview of your salon business</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-lg p-6 shadow-sm border">
            <div className={`${card.color} p-3 rounded-lg text-white w-fit mb-4`}>
              <card.icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold">{card.value}</p>
            <p className="text-sm text-gray-600">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
          {stats.recentBookings.length === 0 ? (
            <p className="text-gray-500 text-sm">No bookings yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentBookings.map((booking: any) => (
                <div key={booking.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium text-sm">{booking.customerName}</p>
                    <p className="text-xs text-gray-500">
                      {booking.service.name} - {new Date(booking.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    booking.status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                    booking.status === "CONFIRMED" ? "bg-green-100 text-green-800" :
                    booking.status === "COMPLETED" ? "bg-blue-100 text-blue-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          )}
          <Link href="/admin/bookings" className="text-sm text-gold hover:underline mt-4 inline-block">
            View all bookings &rarr;
          </Link>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Popular Services</h2>
          {stats.popularServices.length === 0 ? (
            <p className="text-gray-500 text-sm">No data yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.popularServices.map((service, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium">{service.name}</span>
                  <span className="text-sm text-gray-600">{service.count} bookings</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
