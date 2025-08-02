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
  title: "Full-Stack Blog - Express.js & Next.js",
  description: "A modern blog application built with Express.js backend and Next.js frontend",
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
            <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    © 2024 Full-Stack Blog. Built with Express.js & Next.js.
                  </p>
                  <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <a
                      href="https://expressjs.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Express.js
                    </a>
                    <a
                      href="https://nextjs.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Next.js
                    </a>
                  </div>
                </div>
              </div>
            </footer>
            <Toaster />
          </BlogProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
