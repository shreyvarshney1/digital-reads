import type { Metadata } from 'next'
import './globals.css'
import React from 'react'

import { cn } from '@/lib/utils'
import { Poppins as FontSans } from 'next/font/google'
const fontSans = FontSans({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Digital-Reads',
  description: 'DigitalReads is a platform for reading and sharing your favorite ebooks.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}
