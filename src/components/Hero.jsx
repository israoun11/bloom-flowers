import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../animations/gsapAnimations.js'
import Bouquet, { PALETTES } from './Bouquet.jsx'
import PetalField from './Petal.jsx'
import MagneticButton from './MagneticButton.jsx'

const PETAL_COLORS = ['#E7B7BC', '#F1D9D6', '#CE8E92', '#F3CBA6']

export default function Hero() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const backRef = useRef(null)
  const midRef = useRef(null)
  const foreRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)

  // Cinematic entrance: background focuses in first, then midground, then
  // the main bouquet — like a camera racking focus through the composition.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 })

      tl.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 0.7 })
        .fromTo(
          backRef.current,
          { opacity: 0, scale: 1.12, filter: 'blur(18px)' },
          { opacity: 1, scale: 1, filter: 'blur(3px)', duration: 1.2 },
          '-=0.35'
        )
        .fromTo(
          midRef.current,
          { opacity: 0, scale: 1.08, filter: 'blur(14px)' },
          { opacity: 1, scale: 1, filter: 'blur(1px)', duration: 1.1 },
          '-=0.85'
        )
        .fromTo(
          foreRef.current,
          { opacity: 0, scale: 0.88, filter: 'blur(10px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.1 },
          '-=0.75'
        )
        .fromTo(
          [line1Ref.current, line2Ref.current],
          { yPercent: prefersReducedMotion ? 0 : 110 },
          { yPercent: 0, duration: 1, stagger: 0.1 },
          '-=0.9'
        )
        .fromTo('.hero-eyebrow', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.9')
        .fromTo('.hero-sub', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.6')
        .fromTo('.hero-buttons', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')

      // Mouse parallax across three depth layers — each moves at a
      // different rate so the composition feels like it has real depth.
      if (!prefersReducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const back = { x: gsap.quickTo(backRef.current, 'x', { duration: 1.6, ease: 'power3.out' }) }
        const mid = {
          x: gsap.quickTo(midRef.current, 'x', { duration: 1.3, ease: 'power3.out' }),
          y: gsap.quickTo(midRef.current, 'y', { duration: 1.3, ease: 'power3.out' }),
        }
        const fore = {
          x: gsap.quickTo(foreRef.current, 'x', { duration: 0.9, ease: 'power3.out' }),
          y: gsap.quickTo(foreRef.current, 'y', { duration: 0.9, ease: 'power3.out' }),
          rotate: gsap.quickTo(foreRef.current, 'rotate', { duration: 1, ease: 'power3.out' }),
        }

        const handleMove = (e) => {
          const nx = e.clientX / window.innerWidth - 0.5
          const ny = e.clientY / window.innerHeight - 0.5
          back.x(nx * -18)
          mid.x(nx * 30)
          mid.y(ny * 14)
          fore.x(nx * 46)
          fore.y(ny * 26)
          fore.rotate(nx * 4)
        }
        window.addEventListener('mousemove', handleMove)
        return () => window.removeEventListener('mousemove', handleMove)
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Scroll-linked "camera push": as the visitor scrolls past the hero,
  // each depth layer moves, scales and defocuses at its own rate.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollCfg = {
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
        ease: 'none',
      }
      if (prefersReducedMotion) return

      gsap.to(backRef.current, { scale: 1.14, y: -18, opacity: 0.55, ...scrollCfg })
      gsap.to(midRef.current, { scale: 1.1, y: -60, opacity: 0.3, filter: 'blur(4px)', ...scrollCfg })
      gsap.to(foreRef.current, { scale: 0.82, y: -110, rotate: -8, opacity: 0, filter: 'blur(8px)', ...scrollCfg })
      gsap.to('.hero-grid', { y: -50, opacity: 0, ...scrollCfg })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" className="hero" ref={sectionRef} style={{ opacity: 0 }}>
      <div className="hero-3d-stage" ref={stageRef}>
        <div className="depth-layer depth-back" ref={backRef}>
          <div className="hero-bg-layer one" />
          <div className="hero-bg-layer two" />
        </div>

        <div className="depth-layer depth-mid" ref={midRef}>
          <Bouquet palette={PALETTES.blush} width={200} height={220} dense={false} className="hero-side-bouquet left" />
          <Bouquet palette={PALETTES.wild} width={180} height={200} dense={false} className="hero-side-bouquet right" />
        </div>

        <div className="depth-layer depth-fore" ref={foreRef}>
          <Bouquet palette={PALETTES.rose} width={380} height={400} />
        </div>

        <PetalField count={16} colors={PETAL_COLORS} />
      </div>

      <div className="container hero-grid">
        <div className="hero-eyebrow">A modern flower studio</div>
        <h1 className="hero-title">
          <span className="line-mask">
            <span className="line-inner" ref={line1Ref}>
              Flowers made
            </span>
          </span>
          <span className="line-mask">
            <span className="line-inner" ref={line2Ref}>
              for <em>feelings.</em>
            </span>
          </span>
        </h1>
        <p className="hero-sub">Thoughtfully arranged bouquets for the moments that matter.</p>
        <div className="hero-buttons">
          <MagneticButton as="a" href="#bouquets" className="btn btn-primary">
            Explore Bouquets <span className="arrow">→</span>
          </MagneticButton>
          <MagneticButton as="a" href="#story" className="btn btn-outline">
            Our Story
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}