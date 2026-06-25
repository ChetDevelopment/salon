"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { bookingSchema, type BookingFormData } from "@/lib/validations"
import { generateTimeSlots, formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface Service {
  id: string
  name: string
  price: number
  duration: number
  category: { name: string }
}

interface BookedSlot {
  time: string
}

export function BookingForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [services, setServices] = useState<Service[]>([])
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceId: searchParams.get("service") || "",
    },
  })

  const selectedServiceId = watch("serviceId")
  const selectedDate = watch("date")

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then(setServices)
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (selectedDate) {
      fetch(`/api/bookings?date=${selectedDate}`)
        .then((res) => res.json())
        .then((data) => setBookedSlots(data.bookedSlots || []))
        .catch(() => setBookedSlots([]))
    }
  }, [selectedDate])

  const selectedService = services.find((s) => s.id === selectedServiceId)
  const timeSlots = generateTimeSlots()
  const availableSlots = timeSlots.filter(
    (slot) => !bookedSlots.some((b) => b.time === slot)
  )

  const onSubmit = async (data: BookingFormData) => {
    setLoading(true)
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to book")
      }

      setSuccess(true)
    } catch (err: any) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">&#10003;</div>
        <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
        <p className="text-gray-600 mb-6">
          We will send you a confirmation email shortly.
        </p>
        <Button onClick={() => router.push("/")}>Back to Home</Button>
      </div>
    )
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split("T")[0]

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Select
        id="serviceId"
        label="Select Service"
        placeholder="Choose a service..."
        options={services.map((s) => ({
          value: s.id,
          label: `${s.name} - ${formatPrice(s.price)} (${s.duration} min)`,
        }))}
        error={errors.serviceId?.message}
        {...register("serviceId")}
        onChange={(e) => setValue("serviceId", e.target.value)}
      />

      {selectedService && (
        <div className="bg-cream p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>{selectedService.name}</strong> &mdash;{" "}
            {formatPrice(selectedService.price)} &bull; {selectedService.duration} min
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id="customerName"
          label="Your Name"
          placeholder="Enter your full name"
          error={errors.customerName?.message}
          {...register("customerName")}
        />
        <Input
          id="customerEmail"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          error={errors.customerEmail?.message}
          {...register("customerEmail")}
        />
      </div>

      <Input
        id="customerPhone"
        label="Phone Number"
        type="tel"
        placeholder="+1 (555) 000-0000"
        error={errors.customerPhone?.message}
        {...register("customerPhone")}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id="date"
          label="Preferred Date"
          type="date"
          min={minDate}
          error={errors.date?.message}
          {...register("date")}
        />
        <Select
          id="time"
          label="Preferred Time"
          placeholder="Select a time..."
          options={availableSlots.map((slot) => ({
            value: slot,
            label: slot,
          }))}
          error={errors.time?.message}
          {...register("time")}
          onChange={(e) => setValue("time", e.target.value)}
        />
      </div>

      <Textarea
        id="notes"
        label="Special Requests (Optional)"
        placeholder="Any special requests or notes..."
        error={errors.notes?.message}
        {...register("notes")}
      />

      <Button type="submit" size="lg" className="w-full" loading={loading}>
        Confirm Booking
      </Button>
    </form>
  )
}
