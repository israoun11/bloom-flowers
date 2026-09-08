import { useEffect, useRef, useState } from 'react'
import { gsap } from '../animations/gsapAnimations.js'

// A minimal custom cursor: a small dot plus a trailing ring that widens
// over anything tagged data-cursor="hover". Desktop only — hidden via
// CSS on touch devices, and skipped entirely if the device has no
// fine pointer, so it never gets in the way on mobile.
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    setEnabled(isFinePointer)
    if (!isFinePointer) return

    const dotTo = { x: gsap.quickTo(dotRef.current, 'x', { duration: 0.1, ease: 'power3.out' }), y: gsap.quickTo(dotRef.current, 'y', { duration: 0.1, ease: 'power3.out' }) }
    const ringTo = { x: gsap.quickTo(ringRef.current, 'x', { duration: 0.35, ease: 'power3.out' }), y: gsap.quickTo(ringRef.current, 'y', { duration: 0.35, ease: 'power3.out' }) }

    function handleMove(e) {
      dotTo.x(e.clientX)
      dotTo.y(e.clientY)
      ringTo.x(e.clientX)
      ringTo.y(e.clientY)
    }
    function handleOver(e) {
      if (e.target.closest('[data-cursor="hover"]')) setHovering(true)
    }
    function handleOut(e) {
      if (e.target.closest('[data-cursor="hover"]')) setHovering(false)
    }

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseover', handleOver)
    document.addEventListener('mouseout', handleOut)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseout', handleOut)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className={`cursor-ring ${hovering ? 'hovering' : ''}`} ref={ringRef} />
    </>
  )
}