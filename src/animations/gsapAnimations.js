import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register the plugin once, here, so every component can just import
// { gsap, ScrollTrigger } from this file instead of registering repeatedly.
gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Fade + rise elements into place as they enter the viewport.
 * Safe to call on a single element or a NodeList/array (gsap handles both).
 */
export function revealOnScroll(
  target,
  { y = 40, duration = 0.9, stagger = 0, start = 'top 82%', delay = 0 } = {}
) {
  if (!target) return
  return gsap.fromTo(
    target,
    { opacity: 0, y: prefersReducedMotion ? 0 : y },
    {
      opacity: 1,
      y: 0,
      duration: prefersReducedMotion ? 0.4 : duration,
      stagger,
      delay,
      ease: 'power3.out',
      scrollTrigger: { trigger: target, start },
    }
  )
}

/**
 * Attaches a subtle magnetic pull to an element: it eases toward the
 * cursor while hovered, and eases back to rest on mouse leave.
 * Returns a cleanup function. No-ops on touch devices / reduced motion.
 */
export function magneticEffect(el, strength = 0.35) {
  if (!el || prefersReducedMotion) return () => {}
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return () => {}

  const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
  const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })

  function handleMove(e) {
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    xTo(relX * strength)
    yTo(relY * strength)
  }
  function handleLeave() {
    xTo(0)
    yTo(0)
  }

  el.addEventListener('mousemove', handleMove)
  el.addEventListener('mouseleave', handleLeave)
  return () => {
    el.removeEventListener('mousemove', handleMove)
    el.removeEventListener('mouseleave', handleLeave)
  }
}