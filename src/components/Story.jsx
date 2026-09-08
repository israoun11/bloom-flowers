import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../animations/gsapAnimations.js'
import Bouquet, { PALETTES } from './Bouquet.jsx'
import MagneticButton from './MagneticButton.jsx'

export default function Story() {
  const ref = useRef(null)
  const headingLineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Curtain-style reveal on the image as it enters
      gsap.fromTo(
        '.story-media',
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'power3.inOut', scrollTrigger: { trigger: ref.current, start: 'top 72%' } }
      )
      // Line-mask heading reveal
      gsap.fromTo(
        headingLineRef.current,
        { yPercent: prefersReducedMotion ? 0 : 110 },
        { yPercent: 0, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: ref.current, start: 'top 72%' } }
      )
      gsap.fromTo(
        '.story-anim',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 70%' } }
      )

      // Continuous scroll-linked zoom: the image slowly settles as the
      // section scrolls through, like a camera easing to rest.
      if (!prefersReducedMotion) {
        gsap.fromTo(
          '.story-media-inner',
          { scale: 1.25 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          }
        )
      }
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
          <h2 className="story-title serif">
            <span className="line-mask">
              <span className="line-inner" ref={headingLineRef}>
                Flowers, with a little more feeling.
              </span>
            </span>
          </h2>
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