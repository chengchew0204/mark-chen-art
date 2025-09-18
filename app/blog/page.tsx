import type { Metadata } from 'next'
import BlogPage from '@/components/pages/BlogPage'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts and insights from Mark Chen on art, process, and inspiration',
}

export default function Blog() {
  return <BlogPage />
}


