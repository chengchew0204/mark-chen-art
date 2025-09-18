'use client'

import { useEffect } from 'react'
import Header from '@/components/Header'
import '@/styles/pages/shop.scss'

export default function ShopPage() {
  useEffect(() => {
    // Set CSS custom property for responsive width
    const handleResize = () => {
      document.documentElement.style.setProperty('--rvw', `${document.documentElement.clientWidth / 100}px`)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    // Set body class for shop page styles
    document.body.className = 'shop'

    return () => {
      window.removeEventListener('resize', handleResize)
      document.body.className = ''
    }
  }, [])

  return (
    <main id="main">
      <Header />
      <section id="shop-content">
        {/* Content coming soon */}
      </section>
    </main>
  )
}


