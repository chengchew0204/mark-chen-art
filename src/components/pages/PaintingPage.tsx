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

  // Generate 3x3 grid layout - duplicate images if needed to complete the grid
  const generateGridData = () => {
    const baseWidth = 340
    const baseHeight = 320
    const rowHeight = 450
    const columnSpacing = 520 // Increased from 420 to 520 for wider spacing
    const startX = 50 // Adjusted to accommodate wider spacing
    const startY = 100
    
    const data = []
    const itemsPerRow = 3
    const totalRows = 3
    const totalItems = itemsPerRow * totalRows // 9 items total
    
    // Create extended sources array by duplicating if needed
    const extendedSources = [...sources]
    while (extendedSources.length < totalItems) {
      // Duplicate from the beginning until we have enough items
      const remainingNeeded = totalItems - extendedSources.length
      const itemsToDuplicate = Math.min(remainingNeeded, sources.length)
      extendedSources.push(...sources.slice(0, itemsToDuplicate))
    }
    
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
  
  // Create extended sources for the grid
  const createExtendedSources = () => {
    const totalItems = 9 // 3x3 grid
    const extendedSources = [...sources]
    
    while (extendedSources.length < totalItems) {
      const remainingNeeded = totalItems - extendedSources.length
      const itemsToDuplicate = Math.min(remainingNeeded, sources.length)
      extendedSources.push(...sources.slice(0, itemsToDuplicate))
    }
    
    return extendedSources
  }
  
  const extendedSources = createExtendedSources()

  const data = generateGridData()
  const originalSize = {w: 1600, h: 1400} // Increased both width and height for wider spacing between grid repetitions

  useEffect(() => {
    // Set CSS custom property for responsive width
    const handleResize = () => {
      document.documentElement.style.setProperty('--rvw', `${document.documentElement.clientWidth / 100}px`)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    // Set body and html classes for painting page styles
    document.body.className = 'painting'
    document.documentElement.classList.add('painting-page')

    return () => {
      window.removeEventListener('resize', handleResize)
      document.body.className = ''
      document.documentElement.classList.remove('painting-page')
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
