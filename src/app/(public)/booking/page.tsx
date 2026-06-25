import type { Metadata } from "next"
import { Suspense } from "react"
import { BookingForm } from "@/components/forms/BookingForm"

export const metadata: Metadata = {
  title: "Book Appointment",
  description: "Book your beauty appointment at Glamour Salon. Select services, date, and time.",
}

export default function BookingPage() {
  return (
    <>
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Book Appointment</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Choose your service and preferred time. We will confirm your booking shortly.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-100 rounded-lg p-6 sm:p-8 shadow-sm">
            <Suspense fallback={<div className="text-center py-8">Loading booking form...</div>}>
              <BookingForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  )
}
