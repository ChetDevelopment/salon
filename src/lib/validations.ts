import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
})

export const bookingSchema = z.object({
  serviceId: z.string().min(1, "Please select a service"),
  customerName: z.string().min(2, "Name must be at least 2 characters").max(100),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z.string().min(7, "Phone number must be at least 7 characters").max(20),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  notes: z.string().max(1000).optional(),
})

export const serviceSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().min(10).max(5000),
  price: z.number().positive("Price must be positive"),
  duration: z.number().int().positive("Duration must be positive"),
  image: z.string().optional(),
  categoryId: z.string().min(1, "Please select a category"),
  isActive: z.boolean(),
})

export const categorySchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  image: z.string().optional(),
})

export const gallerySchema = z.object({
  title: z.string().min(2).max(200),
  description: z.string().max(2000).optional(),
  imageUrl: z.string().min(1, "Image is required"),
  cloudinaryPublicId: z.string().optional(),
  categoryId: z.string().optional(),
  isBeforeAfter: z.boolean(),
  beforeImage: z.string().optional(),
  afterImage: z.string().optional(),
  sortOrder: z.number().int(),
  isActive: z.boolean(),
})

export const reviewSchema = z.object({
  customerName: z.string().min(2).max(100),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(2000).optional(),
  isApproved: z.boolean(),
})

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export type ContactFormData = z.infer<typeof contactSchema>
export type BookingFormData = z.infer<typeof bookingSchema>
export type ServiceFormData = z.infer<typeof serviceSchema>
export type CategoryFormData = z.infer<typeof categorySchema>
export type GalleryFormData = z.infer<typeof gallerySchema>
export type ReviewFormData = z.infer<typeof reviewSchema>
export type LoginFormData = z.infer<typeof loginSchema>
