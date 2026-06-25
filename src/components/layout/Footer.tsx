import Link from "next/link"
import { Scissors, Phone, Mail, MapPin, Camera, Globe, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Scissors className="h-6 w-6 text-gold-light" />
              <span className="text-xl font-bold">GLAMOUR</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium beauty and makeup services. Transform your look with our expert artists.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gold-light">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Services", href: "/services" },
                { label: "Gallery", href: "/gallery" },
                { label: "Booking", href: "/booking" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gold-light">
              Contact Info
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold-light shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold-light shrink-0" />
                <span>hello@glamoursalon.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold-light shrink-0" />
                <span>123 Beauty St, New York, NY</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gold-light">
              Follow Us
            </h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-gold-light transition-colors" aria-label="Instagram">
                <Camera className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-light transition-colors" aria-label="Facebook">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-light transition-colors" aria-label="Telegram">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Glamour Salon. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
