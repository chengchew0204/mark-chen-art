// GSAP configuration for Next.js
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText)
}

export { gsap, SplitText }


