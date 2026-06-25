import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { gallerySchema } from "@/lib/validations"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const items = await prisma.galleryItem.findMany({
      where: { isActive: true },
      include: { category: true },
      orderBy: { sortOrder: "asc" },
    })
    return NextResponse.json(items)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const validated = gallerySchema.parse(body)

    const item = await prisma.galleryItem.create({
      data: validated,
      include: { category: true },
    })

    return NextResponse.json(item, { status: 201 })
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ error: "Validation error", details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 })
  }
}
