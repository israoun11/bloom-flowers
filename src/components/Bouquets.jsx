import { useEffect, useRef } from 'react'
import { revealOnScroll } from '../animations/gsapAnimations.js'
import Bouquet, { PALETTES } from './Bouquet.jsx'

const ITEMS = [
  { name: 'Rose Romance', price: '$45', palette: PALETTES.rose },
  { name: 'Soft Blush', price: '$42', palette: PALETTES.blush },
  { name: 'Wild Garden', price: '$49', palette: PALETTES.wild },
]

export default function Bouquets() {
  const ref = useRef(null)

  useEffect(() => {
    revealOnScroll(ref.current.querySelectorAll('.bcard'), { y: 50, stagger: 0.12 })
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
          {ITEMS.map((it) => (
            <div className="bcard" key={it.name} data-cursor="hover">
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