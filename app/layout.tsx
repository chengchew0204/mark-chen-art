import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'
import '@/styles/index.scss'

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Mark Chen Art',
    default: 'Mark Chen Art',
  },
  description: 'Mark Chen Art - Contemporary drawing and painting',
  keywords: ['art', 'drawing', 'painting', 'contemporary art', 'Mark Chen'],
  authors: [{ name: 'Mark Chen' }],
  creator: 'Mark Chen',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://markchen.art',
    siteName: 'Mark Chen Art',
    title: 'Mark Chen Art - Contemporary drawing and painting',
    description: 'Contemporary artist exploring the intersection of traditional techniques and modern expression through drawing and painting.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mark Chen Art',
    description: 'Contemporary drawing and painting',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" className={robotoMono.className}>
      <head>
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" href="/fav/fav.ico" sizes="any" />
        <link rel="icon" href="/fav/fav.svg" />
        <link rel="mask-icon" href="/fav/fav-mask.svg" color="#FFFFFF" />
        <link rel="apple-touch-icon" href="/fav/apple-touch.png" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}


