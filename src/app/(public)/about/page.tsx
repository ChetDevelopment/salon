import type { Metadata } from "next"
import { Award, Users, Calendar } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Glamour Salon's story, our expert team, and our commitment to beauty excellence.",
}

const stats = [
  { icon: Calendar, value: "10+", label: "Years Experience" },
  { icon: Users, value: "5000+", label: "Happy Clients" },
  { icon: Award, value: "15+", label: "Awards Won" },
]

const team = [
  { name: "Sophia Williams", role: "Founder & Lead Makeup Artist", bio: "With over 15 years of experience in the beauty industry." },
  { name: "Maria Garcia", role: "Senior Hairstylist", bio: "Specializing in creative cuts and color transformations." },
  { name: "Lisa Chen", role: "Nail Art Specialist", bio: "Expert in luxurious manicures and pedicures." },
]

export default function AboutPage() {
  return (
    <>
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Glamour Salon was born from a passion for beauty and a vision to create a sanctuary 
            where every client feels pampered, beautiful, and confident.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-6">Where Excellence Meets Passion</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in 2014, Glamour Salon has grown from a small studio to one of the most 
                sought-after beauty destinations. Our journey has been driven by a commitment to 
                continuous learning, using only the finest products, and delivering exceptional service.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe that beauty is not just about appearance—it is about confidence, 
                self-expression, and feeling your absolute best. Every service we offer is 
                crafted with attention to detail and a personal touch.
              </p>
            </div>
            <div className="bg-cream rounded-lg h-80 flex items-center justify-center">
              <span className="text-gray-400">[Salon Image]</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-8 bg-cream rounded-lg">
                <stat.icon className="h-8 w-8 text-gold mx-auto mb-4" />
                <div className="text-3xl font-bold text-black mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member) => (
                <div key={member.name} className="text-center p-6">
                  <div className="w-24 h-24 bg-cream rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-gold" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-gold text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
