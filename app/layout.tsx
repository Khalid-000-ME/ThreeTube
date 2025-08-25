import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Pathway_Gothic_One } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
})

const pathwayGothicOne = Pathway_Gothic_One({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pathway-gothic",
  weight: ["400"],
})

export const metadata: Metadata = {
  title: "ThreeTube - Decentralized Video Platform",
  description: "A decentralized video sharing platform powered by blockchain technology",
  generator: "ThreeTube",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${pathwayGothicOne.variable}`} suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${spaceGrotesk.style.fontFamily};
  --font-sans: ${spaceGrotesk.variable};
  --font-logo: ${pathwayGothicOne.variable};
}
        `}</style>
      </head>
      <body className="antialiased">
        <ThemeProvider defaultTheme="system" storageKey="threetube-ui-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
