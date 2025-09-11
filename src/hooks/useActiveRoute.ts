'use client'

import { usePathname } from 'next/navigation'

export function useActiveRoute() {
  const pathname = usePathname()
  
  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true
    if (href !== '/' && pathname.startsWith(href)) return true
    return false
  }
  
  return { pathname, isActive }
}