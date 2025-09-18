import type { Metadata } from 'next'
import ShopPage from '@/components/pages/ShopPage'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Original artworks and limited edition prints by Mark Chen',
}

export default function Shop() {
  return <ShopPage />
}


