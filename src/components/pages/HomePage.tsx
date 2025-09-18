'use client'

import { useEffect } from 'react'
import Header from '@/components/Header'
import '@/styles/pages/home.scss'

export default function HomePage() {
  useEffect(() => {
    // Set CSS custom property for responsive width
    const handleResize = () => {
      document.documentElement.style.setProperty('--rvw', `${document.documentElement.clientWidth / 100}px`)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    // Set body class for home page styles
    document.body.className = 'home'

    return () => {
      window.removeEventListener('resize', handleResize)
      document.body.className = ''
    }
  }, [])

  return (
    <main id="main">
      <Header />
      <section id="hero">
        <div className="hero-content">
          <div className="featured-artwork">
            <img 
              src="/img/home-feature-image.webp" 
              alt="Featured artwork by Mark Chen" 
              className="featured-image"
            />
          </div>
          <div className="text-content">
            <h1>Mark Chen</h1>
            <div className="intro-text">
              <p>Contemporary artist exploring the intersection of traditional techniques and modern expression through drawing and painting.</p>
              <p>Each work captures moments of contemplation, translating emotion into monochrome studies and vibrant impressions.</p>
              <p>Based in the studio, creating limited edition prints and original works.</p>
              <a href="/about" className="about-toggle">more...</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

/*

The about page is not scrollable on mobiles.

*/