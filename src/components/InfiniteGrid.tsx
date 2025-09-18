'use client'

import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText)
}

interface Source {
  src: string
  caption: string
}

interface DataPoint {
  x: number
  y: number
  w: number
  h: number
}

interface OriginalSize {
  w: number
  h: number
}

interface InfiniteGridProps {
  sources: Source[]
  data: DataPoint[]
  originalSize: OriginalSize
}

interface Item {
  el: HTMLDivElement
  container: HTMLDivElement
  wrapper: HTMLDivElement
  img: HTMLImageElement
  x: number
  y: number
  w: number
  h: number
  extraX: number
  extraY: number
  rect: DOMRect
  ease: number
}

interface ScrollState {
  ease: number
  current: { x: number; y: number }
  target: { x: number; y: number }
  last: { x: number; y: number }
  delta: {
    x: { c: number; t: number }
    y: { c: number; t: number }
  }
}

interface MouseState {
  x: { t: number; c: number }
  y: { t: number; c: number }
  press: { t: number; c: number }
}

interface DragState {
  startX: number
  startY: number
  scrollX: number
  scrollY: number
}

export default function InfiniteGrid({ sources, data, originalSize }: InfiniteGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<Item[]>([])
  const scrollRef = useRef<ScrollState>({
    ease: 0.06,
    current: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
    last: { x: 0, y: 0 },
    delta: { x: { c: 0, t: 0 }, y: { c: 0, t: 0 } }
  })
  const mouseRef = useRef<MouseState>({
    x: { t: 0.5, c: 0.5 },
    y: { t: 0.5, c: 0.5 },
    press: { t: 0, c: 0 }
  })
  const dragRef = useRef<DragState>({ startX: 0, startY: 0, scrollX: 0, scrollY: 0 })
  const isDraggingRef = useRef(false)
  const isMobileRef = useRef(false)
  const tileSizeRef = useRef({ w: 0, h: 0 })
  const winSizeRef = useRef({ w: 0, h: 0 })
  const observerRef = useRef<IntersectionObserver | null>(null)
  const animationFrameRef = useRef<number>()

  // Resize handler
  const handleResize = useCallback(() => {
    if (!containerRef.current) return

    winSizeRef.current.w = window.innerWidth
    winSizeRef.current.h = window.innerHeight
    isMobileRef.current = window.innerWidth <= 768 || 'ontouchstart' in window

    // Adjust tile size for mobile to show bigger, fewer images
    if (isMobileRef.current) {
      tileSizeRef.current = {
        w: winSizeRef.current.w * 2.0,
        h: (winSizeRef.current.w * 2.0) * (originalSize.h / originalSize.w)
      }
    } else {
      tileSizeRef.current = {
        w: winSizeRef.current.w,
        h: winSizeRef.current.w * (originalSize.h / originalSize.w)
      }
    }

    scrollRef.current.current = { x: 0, y: 0 }
    scrollRef.current.target = { x: 0, y: 0 }
    scrollRef.current.last = { x: 0, y: 0 }

    containerRef.current.innerHTML = ''

    // Create all items first
    const baseItems = data.map((d, i) => {
      const scaleX = tileSizeRef.current.w / originalSize.w
      const scaleY = tileSizeRef.current.h / originalSize.h
      const source = sources[i % sources.length]

      // Extra spacing on mobile to reduce density
      const spacingMultiplier = isMobileRef.current ? 2.2 : 1

      return {
        src: source.src,
        caption: source.caption,
        x: d.x * scaleX * spacingMultiplier,
        y: d.y * scaleY * spacingMultiplier,
        w: d.w * scaleX,
        h: d.h * scaleY
      }
    })

    // Apply no-overlap layout for mobile
    if (isMobileRef.current) {
      const baseSpacing = 80
      const cellSize = Math.max(96, Math.min(tileSizeRef.current.w, tileSizeRef.current.h) * 0.12)
      relaxNoOverlapPeriodic(baseItems, tileSizeRef.current.w, tileSizeRef.current.h, {
        iterations: 18,
        cellSize,
        spacing: baseSpacing,
        sizeAware: true
      })
    }

    itemsRef.current = []

    // IMPORTANT: reps are aligned to the base tile size (periodic tiling)
    const repsX = [0, tileSizeRef.current.w]
    const repsY = [0, tileSizeRef.current.h]

    // Create DOM for items (2x2 tiling)
    baseItems.forEach(base => {
      repsX.forEach(offsetX => {
        repsY.forEach(offsetY => {
          const el = document.createElement('div')
          el.classList.add('item')
          el.style.width = `${base.w}px`

          const wrapper = document.createElement('div')
          wrapper.classList.add('item-wrapper')
          el.appendChild(wrapper)

          const itemImage = document.createElement('div')
          itemImage.classList.add('item-image')
          itemImage.style.width = `${base.w}px`
          itemImage.style.height = `${base.h}px`
          wrapper.appendChild(itemImage)

          const img = new Image()
          img.src = `/img/${base.src}`
          itemImage.appendChild(img)

          const caption = document.createElement('small')
          caption.innerHTML = base.caption
          
          // Only use SplitText if available
          if (typeof window !== 'undefined' && SplitText) {
            const split = new SplitText(caption, { type: 'lines', linesClass: 'line' })
            split.lines.forEach((line: HTMLElement, i: number) => {
              line.style.transitionDelay = `${i * 0.15}s`
              if (line.parentElement) {
                line.parentElement.style.transitionDelay = `${i * 0.15}s`
              }
            })
          }
          
          wrapper.appendChild(caption)
          containerRef.current!.appendChild(el)
          observerRef.current?.observe(caption)

          itemsRef.current.push({
            el,
            container: itemImage,
            wrapper,
            img,
            x: base.x + offsetX,
            y: base.y + offsetY,
            w: base.w,
            h: base.h,
            extraX: 0,
            extraY: 0,
            rect: el.getBoundingClientRect(),
            ease: Math.random() * 0.5 + 0.5,
          })
        })
      })
    })

    // Double the tile after replicating to 2x2
    tileSizeRef.current.w *= 2
    tileSizeRef.current.h *= 2

    scrollRef.current.current.x = scrollRef.current.target.x = scrollRef.current.last.x = -winSizeRef.current.w * 0.1
    scrollRef.current.current.y = scrollRef.current.target.y = scrollRef.current.last.y = -winSizeRef.current.h * 0.1

    // Set CSS custom property for responsive width
    document.documentElement.style.setProperty('--rvw', `${document.documentElement.clientWidth / 100}px`)
  }, [data, sources, originalSize])

  // Periodic, size-aware relaxation with spatial hashing (no-overlap for mobile)
  const relaxNoOverlapPeriodic = (items: any[], tileW: number, tileH: number, {
    iterations = 16,
    cellSize = 120,
    spacing = 80,
    sizeAware = true
  } = {}) => {
    const mod = (v: number, L: number) => ((v % L) + L) % L

    const buildHash = () => {
      const cols = Math.max(1, Math.ceil(tileW / cellSize))
      const rows = Math.max(1, Math.ceil(tileH / cellSize))
      const hash = new Map()

      const pushToCell = (gx: number, gy: number, it: any) => {
        const key = `${(gx + cols) % cols}|${(gy + rows) % rows}`
        if (!hash.has(key)) hash.set(key, [])
        hash.get(key).push(it)
      }

      items.forEach(it => {
        it._nx = mod(it.x, tileW)
        it._ny = mod(it.y, tileH)
        const gx = Math.floor(it._nx / cellSize)
        const gy = Math.floor(it._ny / cellSize)
        pushToCell(gx, gy, it)
      })

      return { hash, cols, rows }
    }

    for (let iter = 0; iter < iterations; iter++) {
      const { hash, cols, rows } = buildHash()
      let movedPairs = 0

      items.forEach(a => {
        const gx = Math.floor(a._nx / cellSize)
        const gy = Math.floor(a._ny / cellSize)

        for (let ox = -1; ox <= 1; ox++) {
          for (let oy = -1; oy <= 1; oy++) {
            const key = `${(gx + ox + cols) % cols}|${(gy + oy + rows) % rows}`
            const bucket = hash.get(key)
            if (!bucket) continue

            for (const b of bucket) {
              if (a === b) continue

              let dx = a._nx - b._nx
              let dy = a._ny - b._ny
              dx -= Math.round(dx / tileW) * tileW
              dy -= Math.round(dy / tileH) * tileH

              const dist = Math.hypot(dx, dy) || 1e-6

              const ra = sizeAware ? Math.min(a.w, a.h) * 0.5 : 0
              const rb = sizeAware ? Math.min(b.w, b.h) * 0.5 : 0
              const required = ra + rb + spacing

              if (dist < required) {
                const push = (required - dist) * 0.5
                const ux = dx / dist
                const uy = dy / dist

                a.x += ux * push
                a.y += uy * push
                b.x -= ux * push
                b.y -= uy * push

                movedPairs++
              }
            }
          }
        }
      })

      const jitter = 0.01
      items.forEach(it => {
        it.x = mod(it.x, tileW) + (Math.random() - 0.5) * jitter
        it.y = mod(it.y, tileH) + (Math.random() - 0.5) * jitter
      })

      if (movedPairs === 0) break
    }
  }

  // Event handlers
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()
    const factor = 0.4
    scrollRef.current.target.x -= e.deltaX * factor
    scrollRef.current.target.y -= e.deltaY * factor
  }, [])

  const handleMouseDown = useCallback((e: MouseEvent) => {
    e.preventDefault()
    isDraggingRef.current = true
    document.documentElement.classList.add('dragging')
    mouseRef.current.press.t = 1
    dragRef.current.startX = e.clientX
    dragRef.current.startY = e.clientY
    dragRef.current.scrollX = scrollRef.current.target.x
    dragRef.current.scrollY = scrollRef.current.target.y
  }, [])

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false
    document.documentElement.classList.remove('dragging')
    mouseRef.current.press.t = 0
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current.x.t = e.clientX / winSizeRef.current.w
    mouseRef.current.y.t = e.clientY / winSizeRef.current.h

    if (isDraggingRef.current) {
      const dx = e.clientX - dragRef.current.startX
      const dy = e.clientY - dragRef.current.startY
      scrollRef.current.target.x = dragRef.current.scrollX + dx
      scrollRef.current.target.y = dragRef.current.scrollY + dy
    }
  }, [])

  const handleTouchStart = useCallback((e: TouchEvent) => {
    e.preventDefault()
    isDraggingRef.current = true
    document.documentElement.classList.add('dragging')
    mouseRef.current.press.t = 1
    dragRef.current.startX = e.touches[0].clientX
    dragRef.current.startY = e.touches[0].clientY
    dragRef.current.scrollX = scrollRef.current.target.x
    dragRef.current.scrollY = scrollRef.current.target.y
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault()
    mouseRef.current.x.t = e.touches[0].clientX / winSizeRef.current.w
    mouseRef.current.y.t = e.touches[0].clientY / winSizeRef.current.h

    if (isDraggingRef.current) {
      const dx = e.touches[0].clientX - dragRef.current.startX
      const dy = e.touches[0].clientY - dragRef.current.startY
      scrollRef.current.target.x = dragRef.current.scrollX + dx
      scrollRef.current.target.y = dragRef.current.scrollY + dy
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false
    document.documentElement.classList.remove('dragging')
    mouseRef.current.press.t = 0
  }, [])

  // Render loop
  const render = useCallback(() => {
    const scroll = scrollRef.current
    const mouse = mouseRef.current
    
    scroll.current.x += (scroll.target.x - scroll.current.x) * scroll.ease
    scroll.current.y += (scroll.target.y - scroll.current.y) * scroll.ease

    scroll.delta.x.t = scroll.current.x - scroll.last.x
    scroll.delta.y.t = scroll.current.y - scroll.last.y
    scroll.delta.x.c += (scroll.delta.x.t - scroll.delta.x.c) * 0.04
    scroll.delta.y.c += (scroll.delta.y.t - scroll.delta.y.c) * 0.04
    mouse.x.c += (mouse.x.t - mouse.x.c) * 0.04
    mouse.y.c += (mouse.y.t - mouse.y.c) * 0.04
    mouse.press.c += (mouse.press.t - mouse.press.c) * 0.04

    const dirX = scroll.current.x > scroll.last.x ? 'right' : 'left'
    const dirY = scroll.current.y > scroll.last.y ? 'down' : 'up'

    itemsRef.current.forEach(item => {
      const baseX = item.x + scroll.current.x + item.extraX
      const baseY = item.y + scroll.current.y + item.extraY

      const parallaxMax = isMobileRef.current
        ? Math.min(24, 0.18 * Math.min(item.w, item.h))
        : Math.min(60, 0.25 * Math.min(item.w, item.h))

      let pX = (mouse.x.c - 0.5) * 2 * parallaxMax + 2.5 * scroll.delta.x.c * item.ease
      let pY = (mouse.y.c - 0.5) * 2 * parallaxMax + 2.5 * scroll.delta.y.c * item.ease

      pX = Math.max(-parallaxMax, Math.min(parallaxMax, pX))
      pY = Math.max(-parallaxMax, Math.min(parallaxMax, pY))

      const posX = baseX
      const posY = baseY

      const beforeX = posX > winSizeRef.current.w
      const afterX = posX + item.rect.width < 0
      if (dirX === 'right' && beforeX) item.extraX -= tileSizeRef.current.w
      if (dirX === 'left' && afterX) item.extraX += tileSizeRef.current.w

      const beforeY = posY > winSizeRef.current.h
      const afterY = posY + item.rect.height < 0
      if (dirY === 'down' && beforeY) item.extraY -= tileSizeRef.current.h
      if (dirY === 'up' && afterY) item.extraY += tileSizeRef.current.h

      item.el.style.transform = `translate(${baseX}px, ${baseY}px)`
      item.container.style.transform = `translate(${pX}px, ${pY}px)`
      item.img.style.transform = `scale(${1.2 + 0.2 * mouse.press.c * item.ease}) translate(${-mouse.x.c * item.ease * 10}%, ${-mouse.y.c * item.ease * 10}%)`
    })

    scroll.last.x = scroll.current.x
    scroll.last.y = scroll.current.y

    animationFrameRef.current = requestAnimationFrame(render)
  }, [])

  // Initialize intro animation
  const initIntro = useCallback(() => {
    if (!containerRef.current) return
    
    const introItems = [...containerRef.current.querySelectorAll('.item-wrapper')].filter((item) => {
      const rect = item.getBoundingClientRect()
      return (
        rect.x > -rect.width &&
        rect.x < window.innerWidth + rect.width &&
        rect.y > -rect.height &&
        rect.y < window.innerHeight + rect.height
      )
    })
    
    introItems.forEach((item) => {
      const rect = item.getBoundingClientRect()
      const x = -rect.x + window.innerWidth * 0.5 - rect.width * 0.5
      const y = -rect.y + window.innerHeight * 0.5 - rect.height * 0.5
      gsap.set(item, { x, y })
    })

    gsap.to(introItems.reverse(), {
      duration: 2,
      ease: 'expo.inOut',
      x: 0,
      y: 0,
      stagger: 0.05,
    })
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    // Set up intersection observer
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle('visible', entry.isIntersecting)
      })
    })

    // Set up event listeners
    window.addEventListener('resize', handleResize)
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('mousemove', handleMouseMove)
    containerRef.current.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    
    containerRef.current.addEventListener('touchstart', handleTouchStart, { passive: false })
    containerRef.current.addEventListener('touchmove', handleTouchMove, { passive: false })
    containerRef.current.addEventListener('touchend', handleTouchEnd, { passive: true })

    // Initialize
    handleResize()
    render()
    
    // Delay intro to allow layout to settle
    setTimeout(() => {
      initIntro()
    }, 100)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousedown', handleMouseDown)
        containerRef.current.removeEventListener('touchstart', handleTouchStart)
        containerRef.current.removeEventListener('touchmove', handleTouchMove)
        containerRef.current.removeEventListener('touchend', handleTouchEnd)
      }
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      
      observerRef.current?.disconnect()
    }
  }, [handleResize, handleWheel, handleMouseMove, handleMouseDown, handleMouseUp, handleTouchStart, handleTouchMove, handleTouchEnd, render, initIntro])

  return <div ref={containerRef} id="images" />
}


