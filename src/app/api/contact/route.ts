import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { contactSchema } from "@/lib/validations"
import { rateLimit } from "@/lib/rate-limit"

export async function POST(request: Request) {
  const { success } = await rateLimit(3, 60000)
  if (!success) {
    return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 })
  }

  try {
    const body = await request.json()
    const validated = contactSchema.parse(body)

    const message = await prisma.contactMessage.create({ data: validated })
    return NextResponse.json({ success: true, id: message.id }, { status: 201 })
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ error: "Validation error", details: error.errors }, { status: 400 })
    }
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
