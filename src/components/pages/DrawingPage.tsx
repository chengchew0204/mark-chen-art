'use client'

import { useEffect } from 'react'
import Header from '@/components/Header'
import InfiniteGrid from '@/components/InfiniteGrid'
import '@/styles/pages/drawing.scss'

export default function DrawingPage() {
  const sources = [
    {src: '/drawing/drawing-image-1.jpg', caption: 'Calligraphy.1 <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2021'},
    {src: '/drawing/drawing-image-2.jpg', caption: 'Calligraphy.2 <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2024'},
    {src: '/drawing/drawing-image-3.jpg', caption: 'Conductor <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2014'},
    {src: '/drawing/drawing-image-4.jpg', caption: 'Death.Mask.of.Beethovan <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2022'},
    {src: '/drawing/drawing-image-5.jpg', caption: 'Portrait.of.Leah <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2016'},
    {src: '/drawing/drawing-image-6.jpeg', caption: 'Portrait.of.May <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2022'},
    {src: '/drawing/drawing-image-7.jpg', caption: 'Portrait.of.Patrick <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2025'},
    {src: '/drawing/drawing-image-8.jpg', caption: 'Study.of.a.Kazakh.lady <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2022'},
    {src: '/drawing/drawing-image-9.jpg', caption: 'Study.of.Philine <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2024'},
    {src: '/drawing/drawing-image-10.jpg', caption: 'Trista.in.Squares <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2024'},
    {src: '/drawing/drawing-image-11.jpg', caption: 'WingedVictory <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2024'},
  ]

  const data = [
    {x: 10, y: 258, w: 400*0.9, h: 270*0.9},
    {x: 311, y: 255, w: 540*0.8, h: 360*0.8},
    {x: 731, y: 128, w: 400, h: 270},
    {x: 1241, y: 145, w: 260, h: 195},
    {x: 351, y: 687, w: 260, h: 290},
    {x: 751, y: 824, w: 205, h: 154},
    {x: 1111, y: 450, w: 260*0.8, h: 350*0.8},
    {x: 951, y: 863, w: 400, h: 300},
    {x: 31, y: 1122, w: 350, h: 260},
    {x: 1451, y: 687, w: 300, h: 200},
    {x: 451, y: 1187, w: 280, h: 190},
  ]

  const originalSize = {w: 1522, h: 1238}

  useEffect(() => {
    // Set CSS custom property for responsive width
    const handleResize = () => {
      document.documentElement.style.setProperty('--rvw', `${document.documentElement.clientWidth / 100}px`)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    // Set body class for drawing page styles
    document.body.className = 'drawing'

    return () => {
      window.removeEventListener('resize', handleResize)
      document.body.className = ''
    }
  }, [])

  return (
    <main id="main">
      <Header />
      <section id="hero">
        <InfiniteGrid 
          sources={sources}
          data={data}
          originalSize={originalSize}
        />
      </section>
    </main>
  )
}


