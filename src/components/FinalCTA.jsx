import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../animations/gsapAnimations.js'
import PetalField from './Petal.jsx'
import Bouquet, { PALETTES } from './Bouquet.jsx'
import MagneticButton from './MagneticButton.jsx'

const PETAL_COLORS = ['#CE8E92', '#E7B7BC', '#F3CBA6']

export default function FinalCTA() {
  const ref = useRef(null)
  const headingLineRef = useRef(null)
  const silhouetteRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingLineRef.current,
        { yPercent: prefersReducedMotion ? 0 : 110 },
        { yPercent: 0, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } }
      )
      gsap.fromTo(
        '.cta-anim',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } }
      )
      gsap.fromTo(
        '.cta-button',
        { scale: 0.9 },
        { scale: 1, duration: 0.7, ease: 'back.out(1.6)', scrollTrigger: { trigger: ref.current, start: 'top 70%' } }
      )
      if (!prefersReducedMotion) {
        gsap.fromTo(
          silhouetteRef.current,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 0.16,
            scale: 1.15,
            ease: 'none',
            scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
          }
        )
      }
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="cta" className="finalcta" ref={ref}>
      <div className="finalcta-silhouette" ref={silhouetteRef}>
        <Bouquet palette={PALETTES.wild} width={520} height={560} dense={false} />
      </div>
      <PetalField count={12} colors={PETAL_COLORS} />
      <div className="container">
        <div className="section-kicker cta-anim">A gift, delivered with care</div>
        <h2 className="serif">
          <span className="line-mask">
            <span className="line-inner" ref={headingLineRef}>
              Send someone a little happiness.
            </span>
          </span>
        </h2>
        <p className="section-sub cta-anim">Because ordinary days deserve beautiful flowers too.</p>
        <div className="cta-button-wrap cta-anim">
          <span className="cta-glow" aria-hidden="true" />
          <MagneticButton as="a" href="#bouquets" className="btn btn-primary cta-button">
            Create a Bouquet <span className="arrow">→</span>
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}