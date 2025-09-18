import type { Metadata } from 'next'
import DrawingPage from '@/components/pages/DrawingPage'

export const metadata: Metadata = {
  title: 'Drawing',
  description: 'Drawings and studies by Mark Chen',
}

export default function Drawing() {
  return <DrawingPage />
}


