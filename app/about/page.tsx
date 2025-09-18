import type { Metadata } from 'next'
import AboutPage from '@/components/pages/AboutPage'

export const metadata: Metadata = {
  title: 'About - Mark Chen Art',
  description: 'Visual artist based between London and Taiwan, trained in classical painting and portraiture.',
}

export default function About() {
  return <AboutPage />
}