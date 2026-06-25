import type { Metadata } from "next"
import { Award, Users, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Our Story",
  description: "Discover the NĒARY story — where ancient Khmer elegance meets modern beauty artistry.",
}

const stats = [
  { icon: Calendar, value: "10+", label: "Years of Heritage" },
  { icon: Users, value: "5000+", label: "Noble Guests" },
  { icon: Award, value: "15+", label: "Angkor Honors" },
]

const team = [
  { name: "Sophea Vann", role: "Founder & Master Artist", bio: "Trained in Paris and Phnom Penh, blending French technique with Khmer tradition." },
  { name: "Rathana Kim", role: "Senior Stylist", bio: "Specializing in transformative cuts inspired by Angkorian aesthetics." },
  { name: "Bopha Chea", role: "Nail & Lotus Artisan", bio: "Master of intricate hand-painted lotus motifs and luxurious manicures." },
]

export default function AboutPage() {
  return (
    <>
      <section className="relative min-h-[70vh] hero-gradient-khmer flex items-center overflow-hidden">
        <div className="absolute inset-0 temple-motif opacity-[0.04]" />
        <div className="absolute inset-0 silk-texture" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-khmer-gold-light/60 font-body">Our Heritage</span>
          <div className="ornate-divider justify-center my-6">
            <div className="diamond" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display text-white leading-tight mb-6">
            Where Tradition
            <br />
            <span className="gold-text-gradient">Meets Artistry</span>
          </h1>
          <p className="text-white/40 font-body text-sm max-w-xl mx-auto leading-relaxed">
            Born from a vision to honor Cambodia&rsquo;s sacred beauty heritage while embracing 
            the finest modern techniques from around the world.
          </p>
        </div>
      </section>

      <section className="py-28 lg:py-36 bg-[#fdf8f3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-khmer-gold font-body">Our Beginning</span>
              <div className="ornate-divider justify-start my-6">
                <div className="diamond" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-display text-[#161618] mb-6 leading-tight">
                A Vision Born in <span className="gold-text-gradient">Phnom Penh</span>
              </h2>
              <p className="text-[#161618]/50 font-body text-sm leading-relaxed mb-4">
                Founded in 2014, NĒARY emerged from a deep reverence for Cambodia&rsquo;s 
                unparalleled legacy of beauty. Our founder, Sophea Vann, envisioned a space 
                where the grace of Apsara dancers, the intricacy of Khmer silk, and the 
                golden glow of Angkor would inspire every service.
              </p>
              <p className="text-[#161618]/50 font-body text-sm leading-relaxed">
                Today, we are a sanctuary for those who seek more than a beauty treatment — 
                they seek a ritual, a transformation, a connection to something ancient and profound.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl gold-gradient-bg p-[2px]">
                <div className="w-full h-full rounded-2xl bg-[#fdf8f3] flex items-center justify-center">
                  <span className="text-khmer-gold/30 font-display text-sm">[Sanctuary Image]</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-khmer-gold/20 rounded-2xl -z-10" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-khmer-gold/5 rounded-full blur-xl" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-28">
            {stats.map((stat) => (
              <div key={stat.label} className="khmer-card rounded-2xl p-10 text-center bg-white">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-khmer-gold/10 to-khmer-gold/5 flex items-center justify-center mx-auto mb-6">
                  <stat.icon className="h-6 w-6 text-khmer-gold" />
                </div>
                <div className="text-4xl font-display text-[#161618] mb-2">{stat.value}</div>
                <div className="text-sm text-[#161618]/40 font-body">{stat.label}</div>
              </div>
            ))}
          </div>

          <div>
            <div className="text-center mb-16">
              <span className="text-[10px] uppercase tracking-[0.4em] text-khmer-gold font-body">Our Artisans</span>
              <div className="ornate-divider my-6 justify-center">
                <div className="diamond" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-display text-[#161618]">Masters of Their Craft</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member) => (
                <div key={member.name} className="khmer-card rounded-2xl p-8 text-center bg-white">
                  <div className="w-24 h-24 rounded-full gold-gradient-bg p-[2px] mx-auto mb-6">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <Users className="h-8 w-8 text-khmer-gold" />
                    </div>
                  </div>
                  <h3 className="text-lg font-display text-[#161618] mb-1">{member.name}</h3>
                  <p className="text-khmer-gold text-xs font-body tracking-wider uppercase mb-3">{member.role}</p>
                  <p className="text-sm text-[#161618]/40 font-body leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 lg:py-28 bg-[#161618] overflow-hidden">
        <div className="absolute inset-0 temple-motif opacity-[0.03]" />
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-display text-white mb-6">
            Experience the <span className="gold-text-gradient">NĒARY Ritual</span>
          </h2>
          <p className="text-white/40 font-body text-sm mb-10 max-w-lg mx-auto">
            Allow us to guide you through a journey of beauty and renewal.
          </p>
          <Link
            href="/booking"
            className="group relative inline-flex px-8 py-3.5 overflow-hidden rounded-full"
          >
            <span className="absolute inset-0 gold-gradient-bg" />
            <span className="absolute inset-0 bg-[#161618] rounded-full translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 flex items-center gap-2 text-sm tracking-wider text-white">
              Book Your Journey <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>
    </>
  )
}
