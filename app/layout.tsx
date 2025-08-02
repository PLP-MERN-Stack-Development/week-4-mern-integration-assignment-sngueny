import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Navigation } from "@/components/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { BlogProvider } from "@/contexts/blog-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Full-Stack Blog",
  description: "A modern blog application built with Next.js",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <BlogProvider>
            <Navigation />
            <main className="min-h-screen bg-background">{children}</main>
            <Toaster />
          </BlogProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
