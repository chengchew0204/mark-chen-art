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
              <a href="/about" className="about-toggle">more...</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

/*

Currently, the images in both the drawing and painting pages are displayed in random positions. 
I think it looks a little messy. Can you make sure they are displayed in a grid pattern? 
And I want them to be organized and aligned properly with each other. 
The bottom of the paintings should be aligned with the bottom of the images in the same row. 
Make it a grid with three rows. 

*/