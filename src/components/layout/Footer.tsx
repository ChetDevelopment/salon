import Link from "next/link"
import { Phone, Mail, MapPin, Camera, Globe, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-[#161618] overflow-hidden">
      <div className="absolute inset-0 temple-motif opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-[1px] gold-gradient-bg opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 gold-gradient-bg rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-display font-bold">N</span>
              </div>
              <div>
                <span className="text-xl font-display font-bold tracking-wider text-white">
                  NĒARY
                </span>
                <span className="block text-[10px] uppercase tracking-[0.3em] text-khmer-gold-light/50 font-body">
                  Beauty Atelier
                </span>
              </div>
            </Link>
            <p className="text-white/40 text-sm font-body leading-relaxed max-w-sm">
              Where the grace of ancient Khmer artistry meets contemporary beauty mastery. 
              Every treatment is a ritual, every guest is royalty.
            </p>
            <div className="flex gap-4 mt-8">
              {[
                { icon: Camera, href: "#", label: "Instagram" },
                { icon: Globe, href: "#", label: "Facebook" },
                { icon: MessageCircle, href: "#", label: "Telegram" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-khmer-gold-light hover:border-khmer-gold-light/30 transition-all duration-300 group"
                  aria-label={s.label}
                >
                  <s.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.25em] text-khmer-gold-light/60 font-body mb-6">
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Our Story", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-khmer-gold-light transition-colors font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.25em] text-khmer-gold-light/60 font-body mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              {[
                { icon: Phone, text: "+855 12 345 678" },
                { icon: Mail, text: "hello@neary-beauty.com" },
                { icon: MapPin, text: "123 Norodom Blvd, Phnom Penh" },
              ].map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <item.icon className="h-4 w-4 text-khmer-gold-light/50 mt-0.5 shrink-0" />
                  <span className="text-sm text-white/40 font-body">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.25em] text-khmer-gold-light/60 font-body mb-6">
              Hours
            </h4>
            <ul className="space-y-3 text-sm text-white/40 font-body">
              <li className="flex justify-between">
                <span>Mon — Fri</span>
                <span className="text-white/60">9:00 AM — 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="text-white/60">9:00 AM — 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-white/60">10:00 AM — 5:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20 font-body">
            &copy; {new Date().getFullYear()} NĒARY Beauty Atelier. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/20">Crafted with</span>
            <span className="text-khmer-gold-light/60 text-xs">&#9829;</span>
            <span className="text-xs text-white/20">in Cambodia</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
