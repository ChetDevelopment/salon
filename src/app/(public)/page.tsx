import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Scissors, Sparkles, Star, Clock, Shield, Award } from "lucide-react"

const features = [
  { icon: Scissors, title: "Expert Stylists", description: "Professional artists with years of experience" },
  { icon: Sparkles, title: "Premium Products", description: "Only the finest beauty products for our clients" },
  { icon: Clock, title: "Flexible Hours", description: "Open 7 days a week with evening appointments" },
  { icon: Shield, title: "Hygiene First", description: "Sterilized equipment and sanitized workstations" },
  { icon: Award, title: "Award Winning", description: "Recognized for excellence in beauty services" },
  { icon: Star, title: "5-Star Service", description: "Hundreds of satisfied customers" },
]

const testimonials = [
  { name: "Sarah J.", text: "Amazing service! The makeup artist made me look stunning for my wedding day.", rating: 5 },
  { name: "Emily R.", text: "Best salon in town. The hairstylist understood exactly what I wanted.", rating: 5 },
  { name: "Jessica M.", text: "Professional, clean, and incredibly talented. Highly recommend!", rating: 5 },
]

export default function HomePage() {
  return (
    <>
      <section className="hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
              Where Beauty
              <span className="block text-gold-light">Meets Elegance</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl">
              Experience premium beauty and makeup services crafted by expert artists. 
              Book your appointment today and transform your look.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/booking" size="lg" variant="secondary">
                Book Appointment
              </Button>
              <Button href="/services" size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Our Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide the highest quality beauty services in a luxurious and relaxing environment.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <feature.icon className="h-10 w-10 text-gold mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real reviews from our valued customers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-cream p-8 rounded-lg">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">&ldquo;{t.text}&rdquo;</p>
                <p className="font-semibold">- {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Transform Your Look?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
            Book your appointment now and experience the difference.
          </p>
          <Button href="/booking" size="lg" variant="secondary">
            Book Appointment
          </Button>
        </div>
      </section>
    </>
  )
}
