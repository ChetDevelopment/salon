import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { bookingSchema } from "@/lib/validations"
import { auth } from "@/lib/auth"
import { rateLimit } from "@/lib/rate-limit"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get("date")

  if (date) {
    const bookings = await prisma.booking.findMany({
      where: { date: new Date(date) },
      select: { time: true },
    })
    return NextResponse.json({ bookedSlots: bookings })
  }

  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const bookings = await prisma.booking.findMany({
    include: { service: { select: { name: true, price: true, duration: true } } },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(bookings)
}

export async function POST(request: Request) {
  const { success } = await rateLimit(5, 60000)
  if (!success) {
    return NextResponse.json({ error: "Too many requests. Please wait before booking again." }, { status: 429 })
  }

  try {
    const body = await request.json()
    const validated = bookingSchema.parse(body)

    const existing = await prisma.booking.findUnique({
      where: {
        serviceId_date_time: {
          serviceId: validated.serviceId,
          date: new Date(validated.date),
          time: validated.time,
        },
      },
    })

    if (existing) {
      return NextResponse.json({ error: "This time slot is already booked" }, { status: 409 })
    }

    const booking = await prisma.booking.create({
      data: {
        serviceId: validated.serviceId,
        customerName: validated.customerName,
        customerEmail: validated.customerEmail,
        customerPhone: validated.customerPhone,
        date: new Date(validated.date),
        time: validated.time,
        notes: validated.notes || null,
      },
      include: { service: { select: { name: true, price: true } } },
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ error: "Validation error", details: error.errors }, { status: 400 })
    }
    if (error.code === "P2002") {
      return NextResponse.json({ error: "This time slot is already booked" }, { status: 409 })
    }
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}
