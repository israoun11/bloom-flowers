import { useEffect, useRef } from 'react'
import { gsap, tiltEffect } from '../animations/gsapAnimations.js'
import Bouquet, { PALETTES } from './Bouquet.jsx'

const ITEMS = [
  { name: 'Rose Romance', price: '$45', palette: PALETTES.rose },
  { name: 'Soft Blush', price: '$42', palette: PALETTES.blush },
  { name: 'Wild Garden', price: '$49', palette: PALETTES.wild },
]

export default function Bouquets() {
  const ref = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(
          card,
          { opacity: 0, y: 70, rotateY: i % 2 === 0 ? -14 : 14, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            scale: 1,
            duration: 1.1,
            delay: i * 0.12,
            ease: 'power4.out',
            scrollTrigger: { trigger: ref.current, start: 'top 78%' },
          }
        )
      })
    }, ref)

    const cleanups = cardRefs.current.map((card) => (card ? tiltEffect(card, { max: 8, scale: 1.03, lift: 12 }) : () => {}))

    return () => {
      ctx.revert()
      cleanups.forEach((fn) => fn())
    }
  }, [])

  return (
    <section id="bouquets" className="bouquets" ref={ref}>
      <div className="container">
        <div className="section-head">
          <div className="section-kicker">Featured Bouquets</div>
          <h2 className="section-title">Made to make someone smile.</h2>
          <p className="section-sub">Little arrangements, big feelings.</p>
        </div>
        <div className="bouquet-grid">
          {ITEMS.map((it, i) => (
            <div
              className="bcard"
              key={it.name}
              ref={(el) => (cardRefs.current[i] = el)}
              data-cursor="hover"
            >
              <div className="bcard-media">
                <Bouquet palette={it.palette} width={200} height={220} dense={false} />
                <div className="bcard-view">View Bouquet →</div>
              </div>
              <div className="bcard-body">
                <span className="bcard-name">{it.name}</span>
                <span className="bcard-price">{it.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}