import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsapAnimations.js'
import PetalField from './Petal.jsx'
import MagneticButton from './MagneticButton.jsx'

const PETAL_COLORS = ['#CE8E92', '#E7B7BC', '#F3CBA6']

export default function FinalCTA() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="cta" className="finalcta" ref={ref}>
      <PetalField count={12} colors={PETAL_COLORS} />
      <div className="container">
        <div className="section-kicker cta-anim">A gift, delivered with care</div>
        <h2 className="serif cta-anim">Send someone a little happiness.</h2>
        <p className="section-sub cta-anim">Because ordinary days deserve beautiful flowers too.</p>
        <MagneticButton as="a" href="#bouquets" className="btn btn-primary cta-anim cta-button">
          Create a Bouquet <span className="arrow">→</span>
        </MagneticButton>
      </div>
    </section>
  )
}