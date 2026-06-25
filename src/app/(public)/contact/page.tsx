import type { Metadata } from "next"
import { ContactForm } from "@/components/forms/ContactForm"
import { Phone, Mail, MapPin, MessageCircle, Globe, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach out to NĒARY Beauty Atelier in Phnom Penh. We await your presence.",
}

export default function ContactPage() {
  return (
    <>
      <section className="relative min-h-[50vh] hero-gradient-khmer flex items-center overflow-hidden">
        <div className="absolute inset-0 temple-motif opacity-[0.04]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-khmer-gold-light/60 font-body">Connect</span>
          <div className="ornate-divider justify-center my-6">
            <div className="diamond" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display text-white leading-tight mb-6">
            We Await Your <span className="gold-text-gradient">Presence</span>
          </h1>
          <p className="text-white/40 font-body text-sm max-w-xl mx-auto">
            Your journey begins with a conversation. Reach out and let us welcome you.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-[#fdf8f3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-khmer-gold font-body">Our Sanctuary</span>
              <div className="ornate-divider justify-start my-6">
                <div className="diamond" />
              </div>
              <h2 className="text-3xl font-display text-[#161618] mb-10">Find Us</h2>

              <div className="space-y-8">
                {[
                  { icon: Phone, title: "Phone", value: "+855 12 345 678" },
                  { icon: Mail, title: "Email", value: "hello@neary-beauty.com" },
                  { icon: MapPin, title: "Address", value: "123 Norodom Blvd, Phnom Penh, Cambodia" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-khmer-gold/10 to-khmer-gold/5 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-khmer-gold" />
                    </div>
                    <div>
                      <h3 className="text-sm font-display text-[#161618] mb-1">{item.title}</h3>
                      <p className="text-sm text-[#161618]/40 font-body">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <h3 className="text-sm font-display text-[#161618] mb-4">Follow Our Journey</h3>
                <div className="flex gap-3">
                  {[
                    { icon: MessageCircle, label: "Telegram", href: "#" },
                    { icon: Globe, label: "Facebook", href: "#" },
                    { icon: ExternalLink, label: "Google Maps", href: "#" },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white khmer-card text-sm font-body text-[#161618]/60 hover:text-khmer-gold transition-all"
                    >
                      <item.icon className="h-4 w-4 text-khmer-gold" />
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-khmer-gold font-body">Send a Message</span>
              <div className="ornate-divider justify-start my-6">
                <div className="diamond" />
              </div>
              <h2 className="text-3xl font-display text-[#161618] mb-10">Write to Us</h2>
              <div className="khmer-card rounded-2xl p-8 sm:p-10 bg-white shadow-sm">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
