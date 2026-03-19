import React, { useEffect, useState, useRef } from 'react'
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({
    x: 0,
    y: 0,
  })
  const ringPos = useRef({
    x: 0,
    y: 0,
  })
  const rafRef = useRef<number>(0)
  const [isHovering, setIsHovering] = useState(false)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: e.clientX,
        y: e.clientY,
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
    }
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const animateRing = () => {
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.12)
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.12)
      if (ringRef.current) {
        const size = isHovering ? 48 : 32
        ringRef.current.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`
      }
      rafRef.current = requestAnimationFrame(animateRing)
    }
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('button, a, [data-cursor-hover]')) {
        setIsHovering(true)
      }
    }
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('button, a, [data-cursor-hover]')) {
        setIsHovering(false)
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)
    rafRef.current = requestAnimationFrame(animateRing)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(rafRef.current)
    }
  }, [isHovering])
  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#FF6B00',
          boxShadow: '0 0 8px rgba(255,107,0,0.8)',
          transition: 'transform 0.05s linear',
          willChange: 'transform',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width: isHovering ? '48px' : '32px',
          height: isHovering ? '48px' : '32px',
          borderRadius: '50%',
          border: `1.5px solid rgba(255,107,0,${isHovering ? 0.8 : 0.5})`,
          background: isHovering ? 'rgba(255,107,0,0.08)' : 'transparent',
          transition:
            'width 0.2s ease, height 0.2s ease, background 0.2s ease, border-color 0.2s ease',
          willChange: 'transform',
        }}
      />
    </>
  )
}
