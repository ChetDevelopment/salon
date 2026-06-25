"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[#161618]/95 backdrop-blur-xl shadow-lg shadow-black/10"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 gold-gradient-bg rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-display font-bold">N</span>
              </div>
              <div className="absolute -inset-1 gold-gradient-bg rounded-full opacity-20 group-hover:opacity-40 blur transition-opacity" />
            </div>
            <div>
              <span className="text-xl font-display font-bold tracking-wider text-white">
                NĒARY
              </span>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-khmer-gold-light/70 font-body">
                Beauty Atelier
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-body font-light tracking-wider text-white/80 hover:text-khmer-gold-light transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] gold-gradient-bg transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link
              href="/booking"
              className="relative px-6 py-2.5 text-sm font-body font-medium tracking-wider text-white overflow-hidden group"
            >
              <span className="absolute inset-0 gold-gradient-bg rounded-full" />
              <span className="absolute inset-0 bg-black rounded-full translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10">Book Now</span>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "lg:hidden transition-all duration-400 overflow-hidden",
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 py-6 space-y-4 bg-[#161618]/98 backdrop-blur-xl border-t border-white/5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-sm font-body tracking-wider text-white/70 hover:text-khmer-gold-light py-2 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/booking"
            onClick={() => setIsOpen(false)}
            className="block text-center px-6 py-3 gold-gradient-bg rounded-full text-sm font-medium text-white tracking-wider"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </nav>
  )
}
