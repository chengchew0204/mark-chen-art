import type { Metadata } from 'next'
import PaintingPage from '@/components/pages/PaintingPage'

export const metadata: Metadata = {
  title: 'Painting',
  description: 'Paintings by Mark Chen',
}

export default function Painting() {
  return <PaintingPage />
}


