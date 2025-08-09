'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Games', href: '/games' },
  { name: 'About', href: '/about' },
  { name: 'News', href: '/news' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'backdrop-blur-md'
            : 'backdrop-blur-0'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ background: isScrolled ? 'rgba(11,11,14,.55)' : 'transparent' }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 relative">
            <div className="absolute inset-x-0 -top-px h-px bg-[color:var(--primary)]/50" />
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                className="text-2xl font-bold text-[color:var(--text)]"
                whileHover={{ scale: 1.05 }}
              >
                ZeroEdge Studios
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  <Link
                    href={item.href}
                    className="text-[color:var(--muted)] hover:text-[color:var(--text)] transition-colors duration-200 font-medium"
                  >
                    {item.name}
                  </Link>
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-1/2 -translate-x-1/2 -bottom-2 h-0.5 bg-[color:var(--primary)]"
                    initial={false}
                    animate={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                </div>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-[color:var(--muted)] hover:text-[color:var(--primary)] transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="absolute inset-x-0 -bottom-px h-px bg-[color:var(--primary)]/50" />
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 right-0 bottom-0 w-64 bg-[color:var(--bg)]/95 backdrop-blur-md border-l border-[color:var(--muted)]/20 z-40 md:hidden"
          >
            <nav className="flex flex-col p-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-[color:var(--muted)] hover:text-[color:var(--text)] transition-colors duration-200 font-medium py-2"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
