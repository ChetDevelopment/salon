import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { serviceSchema } from "@/lib/validations"
import { auth } from "@/lib/auth"
import { rateLimit } from "@/lib/rate-limit"

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      include: { category: true },
      orderBy: { category: { name: "asc" } },
    })
    return NextResponse.json(services)
  } catch (error) {
    console.error("Error fetching services:", error)
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "STAFF")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { success } = await rateLimit(20)
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  try {
    const body = await request.json()
    const validated = serviceSchema.parse(body)

    const service = await prisma.service.create({
      data: {
        name: validated.name,
        slug: validated.name.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/^-+|-+$/g, ""),
        description: validated.description,
        price: validated.price,
        duration: validated.duration,
        image: validated.image || null,
        categoryId: validated.categoryId,
        isActive: validated.isActive,
      },
      include: { category: true },
    })

    return NextResponse.json(service, { status: 201 })
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ error: "Validation error", details: error.errors }, { status: 400 })
    }
    console.error("Error creating service:", error)
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 })
  }
}
