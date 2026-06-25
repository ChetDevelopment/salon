import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { reviewSchema } from "@/lib/validations"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(reviews)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const validated = reviewSchema.parse(body)

    const review = await prisma.review.create({ data: validated })
    return NextResponse.json(review, { status: 201 })
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ error: "Validation error", details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 })
  }
}
