import type { Metadata } from "next"
import { Playfair_Display, Outfit } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
})

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "NĒARY — Salon & Makeup Atelier | Phnom Penh",
    template: "%s | NĒARY",
  },
  description:
    "Where ancient Khmer elegance meets modern beauty. Premium salon and makeup artistry in Phnom Penh.",
  keywords: ["salon", "makeup", "beauty", "Khmer", "Phnom Penh", "hairstylist", "nail salon", "bridal"],
  openGraph: {
    title: "NĒARY — Salon & Makeup Atelier",
    description: "Where ancient Khmer elegance meets modern beauty.",
    siteName: "NĒARY",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  )
}
