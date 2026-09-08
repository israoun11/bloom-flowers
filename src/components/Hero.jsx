import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../animations/gsapAnimations.js'
import Bouquet, { PALETTES } from './Bouquet.jsx'
import PetalField from './Petal.jsx'
import MagneticButton from './MagneticButton.jsx'

const PETAL_COLORS = ['#E7B7BC', '#F1D9D6', '#CE8E92', '#F3CBA6']

export default function Hero() {
  const sectionRef = useRef(null)
  const artRef = useRef(null)
  const bgOneRef = useRef(null)
  const bgTwoRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Page-load reveal
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 })
      tl.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 })
        .fromTo('.hero-reveal', { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.03 }, '-=0.5')
        .fromTo(artRef.current, { scale: 0.86, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.1 }, '-=0.9')
        .fromTo('.hero-eyebrow', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.6')
        .fromTo('.hero-title', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.4')
        .fromTo('.hero-sub', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
        .fromTo('.hero-buttons', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')

      // Mouse parallax: bouquet + two depth layers move at different rates
      if (!prefersReducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const artX = gsap.quickTo(artRef.current, 'x', { duration: 1.1, ease: 'power3.out' })
        const artY = gsap.quickTo(artRef.current, 'y', { duration: 1.1, ease: 'power3.out' })
        const artRotate = gsap.quickTo(artRef.current, 'rotate', { duration: 1.2, ease: 'power3.out' })
        const bg1X = gsap.quickTo(bgOneRef.current, 'x', { duration: 1.4, ease: 'power3.out' })
        const bg2X = gsap.quickTo(bgTwoRef.current, 'x', { duration: 1.6, ease: 'power3.out' })

        const handleMove = (e) => {
          const nx = e.clientX / window.innerWidth - 0.5
          const ny = e.clientY / window.innerHeight - 0.5
          artX(nx * 26)
          artY(ny * 16)
          artRotate(nx * 3)
          bg1X(nx * -40)
          bg2X(nx * 30)
        }
        window.addEventListener('mousemove', handleMove)
        return () => window.removeEventListener('mousemove', handleMove)
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Cinematic hero -> next-section scroll transition
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(artRef.current, {
        scale: prefersReducedMotion ? 1 : 0.78,
        y: prefersReducedMotion ? 0 : -60,
        rotate: prefersReducedMotion ? 0 : -8,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" className="hero" ref={sectionRef} style={{ opacity: 0 }}>
      <div className="hero-bg-layer one" ref={bgOneRef} />
      <div className="hero-bg-layer two" ref={bgTwoRef} />
      <PetalField count={16} colors={PETAL_COLORS} />
      <div className="container hero-grid">
        <div className="hero-eyebrow hero-reveal">A modern flower studio</div>
        <h1 className="hero-title hero-reveal">
          Flowers made
          <br />
          for <em>feelings.</em>
        </h1>
        <p className="hero-sub hero-reveal">
          Thoughtfully arranged bouquets for the moments that matter.
        </p>
        <div className="hero-buttons hero-reveal">
          <MagneticButton as="a" href="#bouquets" className="btn btn-primary">
            Explore Bouquets <span className="arrow">→</span>
          </MagneticButton>
          <MagneticButton as="a" href="#story" className="btn btn-outline">
            Our Story
          </MagneticButton>
        </div>
        <div className="hero-art">
          <div className="hero-art-inner" ref={artRef}>
            <Bouquet palette={PALETTES.rose} width={360} height={380} />
          </div>
        </div>
      </div>
    </section>
  )
}