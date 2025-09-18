'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  text: string
  href: string
}

export default function Header() {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    { text: 'About', href: '/about' },
    { text: 'Painting', href: '/painting' },
    { text: 'Drawing', href: '/drawing' },
    { text: 'Blog', href: '/blog' },
    { text: 'Shop', href: '/shop' },
    { text: 'Contact', href: '/contact' }
  ]

  const isActiveRoute = (href: string): boolean => {
    // Handle root path
    if (href === '/' && pathname === '/') {
      return true
    }
    
    // Handle other paths
    return pathname.includes(href) && href !== '/'
  }

  return (
    <header className="frame">
      <div className="frame-left">
        <h1>
          <Link href="/" aria-label="Go to Home">
            MarkChenArt
          </Link>
        </h1>
        <nav className="nav" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActiveRoute(item.href) ? 'active' : ''}
              aria-current={isActiveRoute(item.href) ? 'page' : undefined}
            >
              {item.text}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}


