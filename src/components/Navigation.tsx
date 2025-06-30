'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'navigation-scrolled' : 'bg-transparent'
      }`}
      style={{
        borderBottom: isScrolled ? '1px solid var(--gris-chaud-200)' : 'none'
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-bold transition-colors"
            style={{ 
              color: isScrolled ? 'var(--primary)' : 'var(--primary)',
              fontFamily: 'var(--font-heading)'
            }}
          >
            Packshot.art
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/catalogue" 
              className="transition-colors hover:opacity-80"
              style={{ color: isScrolled ? 'var(--gris-chaud-700)' : 'var(--gris-chaud-700)' }}
            >
              Catalogue
            </Link>
            <Link 
              href="/dashboard" 
              className="transition-colors hover:opacity-80"
              style={{ color: isScrolled ? 'var(--gris-chaud-700)' : 'var(--gris-chaud-700)' }}
            >
              Dashboard
            </Link>
            <Link 
              href="#process" 
              className="transition-colors hover:opacity-80"
              style={{ color: isScrolled ? 'var(--gris-chaud-700)' : 'var(--gris-chaud-700)' }}
            >
              Process
            </Link>
            <Link 
              href="#faq" 
              className="transition-colors hover:opacity-80"
              style={{ color: isScrolled ? 'var(--gris-chaud-700)' : 'var(--gris-chaud-700)' }}
            >
              FAQ
            </Link>
          </div>

          {/* Actions Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Panier */}
            <Link 
              href="/panier" 
              className="relative w-11 h-11 flex items-center justify-center rounded-lg transition-all"
              style={{ 
                background: 'var(--gris-chaud-100)',
                border: '1px solid var(--gris-chaud-200)',
                color: 'var(--gris-chaud-700)'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L6 5H4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v0a2 2 0 012 2v1a2 2 0 01-2 2H9a2 2 0 01-2-2v-1a2 2 0 012-2h8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span 
                className="absolute -top-1 -right-1 w-5 h-5 text-xs font-semibold rounded-full flex items-center justify-center"
                style={{ 
                  background: 'var(--teal)', 
                  color: 'var(--blanc-pur)',
                  display: 'none' // Géré par JS côté client
                }}
              >
                0
              </span>
            </Link>

            {/* Auth */}
            <Link href="/login" className="btn-premium">
              Se connecter
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: 'var(--gris-chaud-700)' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div 
            className="md:hidden py-4 border-t"
            style={{ 
              background: 'var(--blanc-pur)',
              borderColor: 'var(--gris-chaud-200)'
            }}
          >
            <div className="flex flex-col space-y-4">
              <Link 
                href="/catalogue" 
                className="px-4 py-2 transition-colors"
                style={{ color: 'var(--gris-chaud-700)' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Catalogue
              </Link>
              <Link 
                href="/dashboard" 
                className="px-4 py-2 transition-colors"
                style={{ color: 'var(--gris-chaud-700)' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                href="#process" 
                className="px-4 py-2 transition-colors"
                style={{ color: 'var(--gris-chaud-700)' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Process
              </Link>
              <Link 
                href="#faq" 
                className="px-4 py-2 transition-colors"
                style={{ color: 'var(--gris-chaud-700)' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <div className="px-4 pt-4 border-t" style={{ borderColor: 'var(--gris-chaud-200)' }}>
                <Link href="/login" className="btn-premium w-full text-center">
                  Se connecter
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}