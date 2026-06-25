import Link from "next/link"
import { Scissors, Sparkles, Clock, Shield, Award, Star, ArrowRight } from "lucide-react"

const features = [
  { icon: Scissors, title: "Master Artisans", description: "Decades of heritage-infused craftsmanship" },
  { icon: Sparkles, title: "Royal Treatments", description: "Ancient Khmer beauty rituals reimagined" },
  { icon: Clock, title: "Sacred Hours", description: "Open daily from sunrise to sunset" },
  { icon: Shield, title: "Pure Sanctuary", description: "Sterilized sanctity in every space" },
  { icon: Award, title: "Angkor Honors", description: "Awarded for excellence in beauty arts" },
  { icon: Star, title: "Devoted Clientele", description: "Cherished by hundreds of noble guests" },
]

const testimonials = [
  { name: "Sophea M.", text: "The bridal treatment was transcendent — I felt like a Khmer queen on my wedding day.", rating: 5 },
  { name: "Ratanak T.", text: "This is not just a salon; it is a sanctuary. Every visit is a ritual of renewal.", rating: 5 },
  { name: "Malin K.", text: "They understood my vision perfectly. The fusion of modern technique with traditional grace is unmatched.", rating: 5 },
]

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-screen hero-gradient-khmer flex items-center overflow-hidden">
        <div className="absolute inset-0 temple-motif opacity-[0.04]" />
        <div className="absolute inset-0 silk-texture" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-khmer-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-khmer-burgundy/10 rounded-full blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <div className="max-w-3xl">
            <div className="ornate-divider justify-start mb-8">
              <span className="text-[10px] uppercase tracking-[0.4em] text-khmer-gold-light/60 font-body">
                Phnom Penh &mdash; Since 2014
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-display font-medium text-white leading-[1.1] mb-8">
              Where Ancient
              <br />
              <span className="gold-text-gradient">Grace</span>
              <br />
              Meets Beauty
            </h1>
            <p className="text-lg text-white/40 font-body max-w-xl leading-relaxed mb-12">
              Step into our atelier, where centuries of Khmer artistry inform every stroke, 
              every treatment, every transformation. You are not merely a client — you are royalty.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link
                href="/booking"
                className="group relative px-8 py-3.5 overflow-hidden rounded-full"
              >
                <span className="absolute inset-0 gold-gradient-bg" />
                <span className="absolute inset-0 bg-[#161618] rounded-full translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 flex items-center gap-2 text-sm font-medium tracking-wider text-white">
                  Begin Your Ritual
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                href="/services"
                className="px-8 py-3.5 rounded-full border border-white/20 text-white/70 text-sm tracking-wider hover:bg-white/5 hover:border-khmer-gold-light/30 transition-all duration-300 font-body"
              >
                Discover Treatments
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border border-white/15 flex items-start justify-center p-1.5">
            <div className="w-1 h-3 bg-khmer-gold-light/40 rounded-full" />
          </div>
        </div>
      </section>

      <section className="relative py-28 lg:py-36 bg-[#fdf8f3]">
        <div className="absolute inset-0 temple-motif opacity-[0.02]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[10px] uppercase tracking-[0.4em] text-khmer-gold font-body">The NĒARY Difference</span>
            <div className="ornate-divider my-6">
              <div className="diamond" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-[#161618] leading-tight">
              Why Our Atelier?
            </h2>
            <p className="text-[#161618]/50 font-body text-sm mt-6 leading-relaxed">
              We honor the sacred Khmer tradition of beauty — each service a ceremony, 
              each guest an honored deity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group khmer-card rounded-2xl p-8 bg-white cursor-default"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-khmer-gold/10 to-khmer-gold/5 flex items-center justify-center mb-6 group-hover:from-khmer-gold/20 group-hover:to-khmer-gold/10 transition-all duration-500">
                  <f.icon className="h-6 w-6 text-khmer-gold" />
                </div>
                <h3 className="text-lg font-display text-[#161618] mb-3">{f.title}</h3>
                <p className="text-sm text-[#161618]/40 font-body leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-28 lg:py-36 bg-[#161618] overflow-hidden">
        <div className="absolute inset-0 temple-motif opacity-[0.03]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-khmer-gold/3 rounded-full blur-[150px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[10px] uppercase tracking-[0.4em] text-khmer-gold-light/60 font-body">Testimonials</span>
            <div className="ornate-divider my-6">
              <div className="diamond" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-white leading-tight">
              Voices of Our <span className="gold-text-gradient">Sanctuary</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-khmer-gold text-khmer-gold" />
                  ))}
                </div>
                <p className="text-white/60 text-sm font-body leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gold-gradient-bg flex items-center justify-center text-white font-display text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <span className="text-sm text-white/40 font-body">&mdash; {t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-28 lg:py-36 bg-[#fdf8f3] overflow-hidden">
        <div className="absolute inset-0 temple-motif opacity-[0.02]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-khmer-gold font-body">Begin Your Journey</span>
          <div className="ornate-divider my-6 justify-center">
            <div className="diamond" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-[#161618] leading-tight mb-8">
            Ready for Your <span className="gold-text-gradient">Transformation</span>?
          </h2>
          <p className="text-[#161618]/50 font-body text-sm max-w-xl mx-auto mb-12 leading-relaxed">
            Step into our sanctuary. Allow our master artisans to unveil the beauty 
            that has always been within you.
          </p>
          <Link
            href="/booking"
            className="group relative inline-flex px-10 py-4 overflow-hidden rounded-full"
          >
            <span className="absolute inset-0 gold-gradient-bg" />
            <span className="absolute inset-0 bg-[#161618] rounded-full translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 flex items-center gap-2 text-sm font-medium tracking-widest text-white">
              Reserve Your Ritual
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>
    </>
  )
}
