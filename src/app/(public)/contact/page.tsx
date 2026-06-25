import type { Metadata } from "next"
import { ContactForm } from "@/components/forms/ContactForm"
import { Phone, Mail, MapPin, MessageCircle, Globe, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Glamour Salon. Find our location, phone, email, and social media.",
}

export default function ContactPage() {
  return (
    <>
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            We would love to hear from you. Get in touch with us.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-8">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-cream p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-cream p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-600">hello@glamoursalon.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-cream p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-gray-600">123 Beauty Street, New York, NY 10001</p>
                  </div>
                </div>
              </div>

              <h3 className="font-semibold mt-10 mb-4">Follow Us</h3>
              <div className="flex gap-4">
                {[
                  { icon: MessageCircle, label: "Telegram", href: "#" },
                  { icon: Globe, label: "Facebook", href: "#" },
                  { icon: ExternalLink, label: "Google Maps", href: "#" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-2 bg-cream px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    <item.icon className="h-4 w-4 text-gold" />
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-8">Send a Message</h2>
              <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
