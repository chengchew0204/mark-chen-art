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

  // Generate 3x3 grid layout - duplicate images if needed to complete the grid
  const generateGridData = () => {
    const baseWidth = 320
    const baseHeight = 280
    const rowHeight = 450
    const columnSpacing = 500 // Increased from 400 to 500 for wider spacing
    const startX = 50 // Adjusted to accommodate wider spacing
    const startY = 120
    
    const data = []
    const itemsPerRow = 3
    const totalRows = 3
    const totalItems = itemsPerRow * totalRows // 9 items total
    
    let currentIndex = 0
    
    // Create 3 rows with 3 items each
    for (let row = 0; row < totalRows; row++) {
      const y = startY + (row * rowHeight)
      
      for (let col = 0; col < itemsPerRow; col++) {
        const x = startX + (col * columnSpacing)
        
        // Use consistent sizes for perfect grid alignment
        const w = baseWidth
        const h = baseHeight
        
        data.push({x, y, w, h})
        currentIndex++
      }
    }
    
    return data
  }
  
  // Create extended sources for the grid - drawing page already has 11 items, more than 9
  const createExtendedSources = () => {
    const totalItems = 9 // 3x3 grid
    // For drawing page, we have 11 items, so we'll take the first 9
    return sources.slice(0, totalItems)
  }
  
  const extendedSources = createExtendedSources()

  const data = generateGridData()
  const originalSize = {w: 1500, h: 1400} // Increased both width and height for wider spacing between grid repetitions

  useEffect(() => {
    // Set CSS custom property for responsive width
    const handleResize = () => {
      document.documentElement.style.setProperty('--rvw', `${document.documentElement.clientWidth / 100}px`)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    // Set body and html classes for drawing page styles
    document.body.className = 'drawing'
    document.documentElement.classList.add('drawing-page')

    return () => {
      window.removeEventListener('resize', handleResize)
      document.body.className = ''
      document.documentElement.classList.remove('drawing-page')
    }
  }, [])

  return (
    <main id="main">
      <Header />
      <section id="hero">
        <InfiniteGrid 
          sources={extendedSources}
          data={data}
          originalSize={originalSize}
        />
      </section>
    </main>
  )
}


