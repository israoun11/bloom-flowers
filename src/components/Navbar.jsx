import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import MagneticButton from './MagneticButton.jsx'

const LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#bouquets', label: 'Bouquets' },
  { href: '#feelings', label: 'Feelings' },
  { href: '#story', label: 'Our Story' },
  { href: '#footer', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <a href="#hero" className="nav-logo serif" data-cursor="hover">
            BLOOM
          </a>
          <div className="nav-links">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="link-underline" data-cursor="hover">
                {l.label}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            <MagneticButton as="a" href="#bouquets" className="nav-cta" strength={0.3}>
              Shop Flowers
            </MagneticButton>
            <button className="hamburger" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="#bouquets" onClick={() => setOpen(false)} className="btn btn-primary" style={{ marginTop: '10px' }}>
          Shop Flowers
        </a>
      </div>
    </>
  )
}