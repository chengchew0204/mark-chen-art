'use client'

import { useEffect } from 'react'
import Header from '@/components/Header'
import '@/styles/pages/blog.scss'

export default function BlogPage() {
  useEffect(() => {
    // Set CSS custom property for responsive width
    const handleResize = () => {
      document.documentElement.style.setProperty('--rvw', `${document.documentElement.clientWidth / 100}px`)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    // Set body class for blog page styles
    document.body.className = 'blog'

    return () => {
      window.removeEventListener('resize', handleResize)
      document.body.className = ''
    }
  }, [])

  return (
    <main id="main">
      <Header />
      <section id="blog-content">
        {/* Content coming soon */}
      </section>
    </main>
  )
}


