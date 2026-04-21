import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Architect.Log",
  description: "High-signal technical portfolio for systems architecture work",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full bg-[var(--color-surface)] antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
