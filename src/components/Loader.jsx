import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsapAnimations.js'

export default function Loader({ onFinish }) {
  const rootRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const ctx = gsap.context(() => {
      gsap.set('.loader-title', { opacity: 0, y: 16 })
      gsap.set('.loader-sub', { opacity: 0 })
      gsap.set('.loader-petal', { opacity: 0, scale: 0.5 })

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          document.body.style.overflow = 'auto'
          onFinish?.()
        },
      })

      tl.to('.loader-petal', { opacity: 1, scale: 1, duration: 0.5, stagger: 0.05 })
        .to('.loader-title', { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')
        .to('.loader-sub', { opacity: 1, duration: 0.5 }, '-=0.25')
        .to(rootRef.current, { autoAlpha: 0, duration: 0.7, delay: 0.45, ease: 'power2.inOut' })
    }, rootRef)

    return () => ctx.revert()
  }, [onFinish])

  return (
    <div className="loader" ref={rootRef}>
      <div className="loader-petals">
        {Array.from({ length: 6 }).map((_, i) => (
          <span className="loader-petal" key={i} />
        ))}
      </div>
      <div className="loader-title serif">BLOOM</div>
      <div className="loader-sub">flowers made for feelings</div>
    </div>
  )
}