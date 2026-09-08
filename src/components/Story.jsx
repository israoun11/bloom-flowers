import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsapAnimations.js'
import Bouquet, { PALETTES } from './Bouquet.jsx'
import MagneticButton from './MagneticButton.jsx'

export default function Story() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clip-path reveal on the image, like a curtain opening
      gsap.fromTo(
        '.story-media',
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'power3.inOut', scrollTrigger: { trigger: ref.current, start: 'top 72%' } }
      )
      gsap.fromTo(
        '.story-media-inner',
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 72%' } }
      )
      gsap.fromTo(
        '.story-anim',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 70%' } }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="story" className="story" ref={ref}>
      <div className="container story-wrap">
        <div className="story-media">
          <div className="story-media-inner">
            <Bouquet palette={PALETTES.blush} width={280} height={320} />
          </div>
        </div>
        <div>
          <div className="section-kicker story-anim">Our Story</div>
          <h2 className="story-title serif story-anim">Flowers, with a little more feeling.</h2>
          <p className="story-text story-anim">
            We believe flowers are more than beautiful. They become part of the moments we remember.
          </p>
          <MagneticButton as="a" href="#hero" className="btn btn-outline story-anim" style={{ marginTop: '28px' }}>
            Discover Our Story <span className="arrow">→</span>
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}