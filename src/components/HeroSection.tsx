'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

export default function HeroSection() {
  const [sliderPosition, setSliderPosition] = useState(25)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = () => {
    setIsDragging(true)
    document.body.style.cursor = 'col-resize'
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    document.body.style.cursor = 'default'
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const percentage = (offsetX / rect.width) * 100
    const clampedPercentage = Math.min(Math.max(percentage, 0), 100)
    
    setSliderPosition(clampedPercentage)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const offsetX = e.touches[0].clientX - rect.left
    const percentage = (offsetX / rect.width) * 100
    const clampedPercentage = Math.min(Math.max(percentage, 0), 100)
    
    setSliderPosition(clampedPercentage)
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('touchend', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleMouseUp)
    }
  }, [isDragging])

  return (
    <section 
      className="relative"
      style={{ 
        paddingTop: '140px', 
        paddingBottom: '100px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}
    >
      {/* Hero Content */}
      <div className="text-center max-w-4xl mx-auto px-8 mb-20">
        <h1 
          className="font-bold mb-8"
          style={{ 
            fontSize: 'clamp(3rem, 6vw, 4.5rem)',
            lineHeight: '1.15',
            color: 'var(--primary)',
            fontFamily: 'var(--font-heading)'
          }}
        >
          Vos packshots, augmentés
        </h1>
        
        <p 
          className="mb-10 font-light"
          style={{ 
            fontSize: '1.35rem',
            color: 'var(--gris-chaud-600)',
            lineHeight: '1.6',
            fontWeight: '300'
          }}
        >
          Transformez vos photos produits en visuels qui vendent. 
          Direction artistique experte, livraison en 72h max.
        </p>
        
        <Link 
          href="/catalogue" 
          className="btn-premium inline-flex items-center gap-3"
          style={{ 
            padding: '1.2rem 2.5rem',
            fontSize: '1.05rem',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          Explorer le catalogue
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 10h6m0 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </Link>
      </div>

      {/* Before/After Slider */}
      <div className="px-8">
        <div 
          ref={containerRef}
          className="relative mx-auto overflow-hidden select-none"
          style={{
            maxWidth: '1200px',
            height: '600px',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--gris-chaud-100)',
            boxShadow: 'var(--shadow-premium)',
            border: '1px solid var(--gris-chaud-200)'
          }}
        >
          {/* Before Image */}
          <img 
            src="/images/hero-before.jpg" 
            alt="Packshot produit original"
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{ borderRadius: 'var(--radius-lg)' }}
          />
          
          {/* After Image */}
          <img 
            src="/images/hero-after.jpg" 
            alt="Packshot avec direction artistique"
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{ 
              borderRadius: 'var(--radius-lg)',
              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
            }}
          />

          {/* Packshot Overlays - 3 carrés verticaux */}
          <div 
            className="absolute pointer-events-none"
            style={{
              bottom: '24px',
              left: '60px',
              zIndex: 9999
            }}
          >
            <img 
              src="/images/packshot-exemple.jpg" 
              alt="Photo produit originale"
              className="object-cover"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: 'var(--radius)',
                border: '3px solid var(--blanc-pur)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
              }}
            />
          </div>
          
          <div 
            className="absolute pointer-events-none"
            style={{
              bottom: '204px',
              left: '60px',
              zIndex: 9999
            }}
          >
            <img 
              src="/images/packshot-exemple2.jpg" 
              alt="Photo produit exemple 2"
              className="object-cover"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: 'var(--radius)',
                border: '3px solid var(--blanc-pur)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
              }}
            />
          </div>
          
          <div 
            className="absolute pointer-events-none"
            style={{
              bottom: '384px',
              left: '60px',
              zIndex: 9999
            }}
          >
            <img 
              src="/images/packshot-exemple3.jpg" 
              alt="Photo produit exemple 3"
              className="object-cover"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: 'var(--radius)',
                border: '3px solid var(--blanc-pur)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
              }}
            />
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 h-full cursor-col-resize transform -translate-x-1/2"
            style={{
              left: `${sliderPosition}%`,
              width: '4px',
              background: 'linear-gradient(180deg, var(--primary) 0%, var(--primary-dark) 100%)',
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)'
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            {/* Slider Button */}
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{
                width: '48px',
                height: '48px',
                background: 'var(--blanc-pur)',
                borderRadius: '50%',
                border: '2px solid var(--primary)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path 
                  d="M7 5l-3 5 3 5M13 5l3 5-3 5" 
                  stroke="var(--primary)" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Labels */}
          <div 
            className="absolute top-6 left-6 px-4 py-2 text-sm font-medium"
            style={{
              background: 'rgba(255,255,255,0.95)',
              color: 'var(--gris-chaud-700)',
              borderRadius: 'var(--radius-sm)',
              boxShadow: 'var(--shadow-subtile)',
              backdropFilter: 'blur(10px)'
            }}
          >
            Avant
          </div>
          
          <div 
            className="absolute top-6 right-6 px-4 py-2 text-sm font-medium"
            style={{
              background: 'linear-gradient(135deg, var(--accent) 0%, var(--teal) 100%)',
              color: 'var(--blanc-pur)',
              borderRadius: 'var(--radius-sm)',
              boxShadow: 'var(--shadow-subtile)'
            }}
          >
            Après
          </div>
        </div>
      </div>

      {/* Responsive Media Queries */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .packshot-overlay {
            left: 40px !important;
          }
        }
        
        @media (max-width: 768px) {
          .packshot-overlay {
            left: 20px !important;
          }
        }
      `}</style>
    </section>
  )
}