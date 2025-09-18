'use client'

import { useEffect } from 'react'
import Header from '@/components/Header'
import '@/styles/pages/about.scss'

export default function AboutPage() {
  useEffect(() => {
    // Set CSS custom property for responsive width
    const handleResize = () => {
      document.documentElement.style.setProperty('--rvw', `${document.documentElement.clientWidth / 100}px`)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    // Set body and html classes for about page styles
    document.body.className = 'about'
    document.documentElement.classList.add('about-page')

    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    }, observerOptions)

    // Observe sections that should animate on scroll
    const animatedSections = document.querySelectorAll('.education, .exhibitions')
    animatedSections.forEach((section) => observer.observe(section))

    return () => {
      window.removeEventListener('resize', handleResize)
      document.body.className = ''
      document.documentElement.classList.remove('about-page')
      observer.disconnect()
    }
  }, [])

  return (
    <main id="main">
      <Header />
      <section id="about-content">
        <div className="container">
          <h1>Mark Chen</h1>
          
          <div className="intro">
            <p>Mark Chen is a visual artist based between London and Taiwan. Trained in classical painting and portraiture, he has developed a strong foundation as a painter and draughtsman while also expanding his practice into analogue photography, mixed media drawing, and calligraphy. His background in philosophy, with a particular interest in Walter Benjamin and German Romanticism, continues to shape both his imagery and conceptual approach.</p>
            
            <p>Mark's influences span Russian masters such as Nicolai Fechin, early British impressionists including Whistler, and urban street photographers like Henri Cartier-Bresson and Fan Ho. Recent projects reimagine urban landscapes and portraiture as fragmented traces of memory, often combining double-printed photographs with drawings in charcoal, pencil, and ink.</p>
            
            <p>Alongside his studio practice, Mark is a senior tutor at London Fine Art Studios and co-founder of Big Turtle Studio in Wimbledon. He runs workshops in both the UK and Taiwan and exhibits regularly with galleries and art societies.</p>
          </div>

          <div className="divider"></div>

          <section className="education">
            <h2>Education</h2>
            <ul>
              <li><strong>2017</strong> – Repin Academy Summer Program, St. Petersburg, Russia</li>
              <li><strong>2016–2017</strong> – M.A. in Aesthetics and Art Theory, Kingston University, London</li>
              <li><strong>2012–2016</strong> – B.A. in Fine Art, Goldsmiths College, University of London</li>
            </ul>
          </section>

          <div className="divider"></div>

          <section className="exhibitions">
            <h2>Exhibitions and Awards</h2>
            <ul>
              <li><strong>2025</strong> – <em>Between Looking and Being Looked At</em>, Solo Show, 852 Art Space, Taichung, Taiwan</li>
              <li><strong>2025</strong> – <em>Beyond the Prizes</em>, Mall Galleries, London (Exhibition of Award-Winning Artists)</li>
              <li><strong>2025</strong> – Wimbledon Art Fair, Spring, London</li>
              <li><strong>2024</strong> – Royal Society of Portrait Painters Annual Exhibition, London</li>
              <li><strong>2024</strong> – Green and Stone Gallery Summer Exhibition, London</li>
              <li><strong>2023</strong> – New English Art Club, Bowyers Drawing Prize, London</li>
              <li><strong>2023</strong> – Green and Stone Gallery Summer Exhibition, London – <em>Highly Commended Young Artist Award</em></li>
              <li><strong>2023</strong> – The Pastel Society Annual Exhibition, London</li>
              <li><strong>2022</strong> – Royal Society of Portrait Painters Annual Exhibition, London</li>
              <li><strong>2022</strong> – Hampstead Art Society Summer Exhibition, London</li>
              <li><strong>2022</strong> – Joint Exhibition, Taichung 107 Gallery, Taiwan</li>
              <li><strong>2021</strong> – Royal Society of Oil Painters Annual Exhibition, London</li>
              <li><strong>2018, 2020</strong> – London Fine Art Studios, De Lazlo Scholarship</li>
            </ul>
          </section>
        </div>
      </section>
    </main>
  )
}