import { useEffect, useRef } from 'react'
import { magneticEffect } from '../animations/gsapAnimations.js'

// Wraps any link/button and gives it a gentle magnetic pull toward the
// cursor while hovered. Pass as="a" (default) or as="button".
export default function MagneticButton({ as = 'a', className = '', children, strength = 0.35, ...rest }) {
  const ref = useRef(null)
  const Tag = as

  useEffect(() => {
    const cleanup = magneticEffect(ref.current, strength)
    return cleanup
  }, [strength])

  return (
    <Tag ref={ref} className={className} data-cursor="hover" {...rest}>
      {children}
    </Tag>
  )
}