import type { Metadata } from 'next'
import ContactPage from '@/components/pages/ContactPage'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Mark Chen',
}

export default function Contact() {
  return <ContactPage />
}


