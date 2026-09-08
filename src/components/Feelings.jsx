import { useEffect, useRef, useState } from 'react'
import { gsap } from '../animations/gsapAnimations.js'
import Bouquet, { PALETTES } from './Bouquet.jsx'

const FEELINGS = [
  { key: 'love', label: 'Love', copy: 'For the person who makes your heart bloom.', palette: PALETTES.love },
  { key: 'thanks', label: 'Thank You', copy: 'A little beauty for a heartfelt thank you.', palette: PALETTES.thanks },
  { key: 'sorry', label: 'Sorry', copy: 'Sometimes flowers say what words cannot.', palette: PALETTES.sorry },
  { key: 'because', label: 'Just Because', copy: 'Because the best surprises need no reason.', palette: PALETTES.because },
]

export default function Feelings() {
  const [active, setActive] = useState(0)
  const visualRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(visualRef.current, { opacity: 0 }, { opacity: 1, duration: 0.55, ease: 'power2.out' })
  }, [active])

  return (
    <section id="feelings" className="feelings">
      <div className="container">
        <div className="section-head">
          <div className="section-kicker">Choose Your Feeling</div>
          <h2 className="section-title">Tell us how you feel.</h2>
          <p className="section-sub">We'll find the flowers that say it for you.</p>
        </div>
        <div className="feel-wrap">
          <div className="feel-options">
            {FEELINGS.map((f, i) => (
              <button
                key={f.key}
                className={`feel-option ${active === i ? 'active' : ''}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                data-cursor="hover"
              >
                <span className="fnum">0{i + 1}</span>
                {f.label}
              </button>
            ))}
          </div>
          <div className="feel-visual">
            <div ref={visualRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Bouquet palette={FEELINGS[active].palette} width={260} height={300} />
            </div>
            <div className="feel-visual-caption">
              <p>{FEELINGS[active].copy}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}