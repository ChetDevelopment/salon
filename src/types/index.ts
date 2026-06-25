export interface NavLink {
  label: string
  href: string
}

export interface ServiceWithCategory {
  id: string
  name: string
  slug: string
  description: string
  price: number
  duration: number
  image: string | null
  categoryId: string
  category: { id: string; name: string; slug: string }
  isActive: boolean
  createdAt: Date
}

export interface BookingWithService {
  id: string
  serviceId: string
  service: { name: string; price: number; duration: number }
  customerName: string
  customerEmail: string
  customerPhone: string
  date: string
  time: string
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED"
  notes: string | null
  createdAt: Date
}

export interface GalleryItemWithCategory {
  id: string
  title: string
  description: string | null
  imageUrl: string
  cloudinaryPublicId: string | null
  categoryId: string | null
  category: { id: string; name: string; slug: string } | null
  isBeforeAfter: boolean
  beforeImage: string | null
  afterImage: string | null
  sortOrder: number
  isActive: boolean
}

export interface DashboardStats {
  totalBookings: number
  pendingBookings: number
  confirmedBookings: number
  completedBookings: number
  cancelledBookings: number
  totalRevenue: number
  totalServices: number
  totalGallery: number
  totalReviews: number
  unreadMessages: number
  recentBookings: BookingWithService[]
  popularServices: { name: string; count: number }[]
}
