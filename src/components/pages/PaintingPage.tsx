'use client'

import { useEffect } from 'react'
import Header from '@/components/Header'
import InfiniteGrid from '@/components/InfiniteGrid'
import '@/styles/pages/painting.scss'

export default function PaintingPage() {
  const sources = [
    {src: '/painting/Lambi.jpeg', caption: 'Lambi <br>24 x 36 inch Oil on canvas <br>Original artwork <br>2023'},
    {src: '/painting/Morandi.still.life.jpeg', caption: 'Morandi Still Life <br>20 x 30 inch Oil on canvas <br>Original artwork <br>2023'},
    {src: '/painting/Nouveau.Miao.girl.jpeg', caption: 'Nouveau Miao Girl <br>30 x 40 inch Mixed media on canvas <br>Original artwork <br>2024'},
    {src: '/painting/Portrait.of.Jack.jpeg', caption: 'Portrait of Jack <br>18 x 24 inch Oil on canvas <br>Original artwork <br>2023'},
    {src: '/painting/Portrait.of.Kinga.jpeg', caption: 'Portrait of Kinga <br>16 x 20 inch Oil on canvas <br>Original artwork <br>2024'},
    {src: '/painting/Portrait.of.Ziki.jpeg', caption: 'Portrait of Ziki <br>24 x 30 inch Oil on canvas <br>Original artwork <br>2024'},
    {src: '/painting/Rosesandplums.jpeg', caption: 'Roses and Plums <br>20 x 24 inch Oil on canvas <br>Original artwork <br>2023'},
  ]

  const data = [
    {x: 71, y: 58, w: 400, h: 270},
    {x: 461, y: 270, w: 345, h: 230},
    {x: 831, y: 158, w: 400, h: 270},
    {x: 1291, y: 245, w: 260, h: 195},
    {x: 351, y: 687, w: 260, h: 290},
    {x: 751, y: 824, w: 205, h: 154},
    {x: 1211, y: 540, w: 260, h: 350},
  ]

  const originalSize = {w: 1522, h: 1238}

  useEffect(() => {
    // Set CSS custom property for responsive width
    const handleResize = () => {
      document.documentElement.style.setProperty('--rvw', `${document.documentElement.clientWidth / 100}px`)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    // Set body class for painting page styles
    document.body.className = 'painting'

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

/*
Please adjust the data(it's size and position) for the painting page so that the images are more spread out and the layout is more balanced, and the images should not overlapped
  const data = [
    {x: 71, y: 58, w: 400, h: 270},
    {x: 211, y: 255, w: 345, h: 230},
    {x: 631, y: 158, w: 400, h: 270},
    {x: 1191, y: 245, w: 260, h: 195},
    {x: 351, y: 687, w: 260, h: 290},
    {x: 751, y: 824, w: 205, h: 154},
    {x: 911, y: 540, w: 260, h: 350},
  ]

*/