import { config } from "dotenv"
import { resolve } from "path"
config({ path: resolve("prisma/../.env") })
console.log("DATABASE_URL:", process.env.DATABASE_URL ? "SET" : "NOT SET")
import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import { hash } from "bcryptjs"

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set")
}
const adapter = new PrismaNeon({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  const adminExists = await prisma.user.findUnique({
    where: { email: process.env.ADMIN_EMAIL || "admin@salon.com" },
  })

  if (!adminExists) {
    const hashedPassword = await hash(process.env.ADMIN_PASSWORD || "Admin@123", 12)
    await prisma.user.create({
      data: {
        name: "Admin",
        email: process.env.ADMIN_EMAIL || "admin@salon.com",
        password: hashedPassword,
        role: "ADMIN",
      },
    })
    console.log("Admin user created")
  }

  const categories = [
    { name: "Makeup", slug: "makeup", description: "Professional makeup services" },
    { name: "Hair", slug: "hair", description: "Hair styling and treatments" },
    { name: "Nails", slug: "nails", description: "Manicure and pedicure services" },
    { name: "Skincare", slug: "skincare", description: "Facial and skincare treatments" },
    { name: "Bridal", slug: "bridal", description: "Bridal beauty packages" },
  ]

  for (const category of categories) {
    const exists = await prisma.category.findUnique({ where: { slug: category.slug } })
    if (!exists) {
      await prisma.category.create({ data: category })
      console.log(`Category "${category.name}" created`)
    }
  }

  const services = [
    { name: "Classic Makeup", slug: "classic-makeup", description: "Natural everyday makeup look", price: 75, duration: 60, categorySlug: "makeup" },
    { name: "Glam Makeup", slug: "glam-makeup", description: "Full glam evening makeup", price: 120, duration: 90, categorySlug: "makeup" },
    { name: "Bridal Makeup", slug: "bridal-makeup", description: "Complete bridal makeup package", price: 250, duration: 120, categorySlug: "bridal" },
    { name: "Haircut & Style", slug: "haircut-style", description: "Custom haircut with blow-dry styling", price: 85, duration: 60, categorySlug: "hair" },
    { name: "Hair Color", slug: "hair-color", description: "Full hair color application", price: 150, duration: 120, categorySlug: "hair" },
    { name: "Manicure", slug: "manicure", description: "Classic manicure with polish", price: 45, duration: 45, categorySlug: "nails" },
    { name: "Pedicure", slug: "pedicure", description: "Luxury pedicure treatment", price: 55, duration: 60, categorySlug: "nails" },
    { name: "Gel Nails", slug: "gel-nails", description: "Gel nail application", price: 65, duration: 60, categorySlug: "nails" },
    { name: "Facial Treatment", slug: "facial-treatment", description: "Deep cleansing facial", price: 90, duration: 60, categorySlug: "skincare" },
    { name: "Bridal Package", slug: "bridal-package", description: "Complete bridal package: hair, makeup, and trials", price: 500, duration: 240, categorySlug: "bridal" },
  ]

  for (const service of services) {
    const category = await prisma.category.findUnique({ where: { slug: service.categorySlug } })
    if (!category) continue

    const exists = await prisma.service.findUnique({ where: { slug: service.slug } })
    if (!exists) {
      await prisma.service.create({
        data: {
          name: service.name,
          slug: service.slug,
          description: service.description,
          price: service.price,
          duration: service.duration,
          categoryId: category.id,
        },
      })
      console.log(`Service "${service.name}" created`)
    }
  }

  const sampleReviews = [
    { customerName: "Sarah Johnson", rating: 5, comment: "Amazing service! The makeup artist made me look stunning for my wedding day.", isApproved: true },
    { customerName: "Emily Roberts", rating: 5, comment: "Best salon in town. The hairstylist understood exactly what I wanted.", isApproved: true },
    { customerName: "Jessica Miller", rating: 5, comment: "Professional, clean, and incredibly talented. Highly recommend!", isApproved: true },
    { customerName: "Amanda Brown", rating: 4, comment: "Great experience overall. Will definitely come back.", isApproved: true },
    { customerName: "Rachel Green", rating: 5, comment: "The bridal package was worth every penny. Felt like a queen!", isApproved: true },
  ]

  for (const review of sampleReviews) {
    await prisma.review.create({ data: review })
    console.log(`Review by "${review.customerName}" created`)
  }

  console.log("Seed completed successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
