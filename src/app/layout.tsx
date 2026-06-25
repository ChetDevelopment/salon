import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Glamour Salon - Premium Beauty & Makeup Services",
    template: "%s | Glamour Salon",
  },
  description:
    "Experience premium beauty and makeup services at Glamour Salon. Book appointments with expert stylists and makeup artists.",
  keywords: ["salon", "makeup", "beauty", "hair salon", "nail salon", "booking"],
  openGraph: {
    title: "Glamour Salon - Premium Beauty & Makeup Services",
    description: "Experience premium beauty and makeup services at Glamour Salon.",
    url: "https://glamoursalon.vercel.app",
    siteName: "Glamour Salon",
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
