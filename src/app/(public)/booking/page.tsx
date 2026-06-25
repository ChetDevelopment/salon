import type { Metadata } from "next"
import { Suspense } from "react"
import { BookingForm } from "@/components/forms/BookingForm"

export const metadata: Metadata = {
  title: "Book Your Ritual",
  description: "Reserve your sacred beauty ritual at NĒARY. Choose your treatment, date, and time.",
}

export default function BookingPage() {
  return (
    <>
      <section className="relative min-h-[50vh] hero-gradient-khmer flex items-center overflow-hidden">
        <div className="absolute inset-0 temple-motif opacity-[0.04]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-khmer-gold-light/60 font-body">Reserve</span>
          <div className="ornate-divider justify-center my-6">
            <div className="diamond" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display text-white leading-tight mb-6">
            Begin Your <span className="gold-text-gradient">Ritual</span>
          </h1>
          <p className="text-white/40 font-body text-sm max-w-xl mx-auto">
            Choose your sacred treatment and preferred time. We will prepare your sanctuary.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-[#fdf8f3]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="khmer-card rounded-2xl p-8 sm:p-10 bg-white shadow-sm">
            <Suspense
              fallback={
                <div className="text-center py-12">
                  <div className="w-8 h-8 border-2 border-khmer-gold border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-sm text-[#161618]/40 font-body mt-4">Preparing your ritual...</p>
                </div>
              }
            >
              <BookingForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  )
}
