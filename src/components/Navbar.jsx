import { useState, useEffect } from 'react'
import './Navbar.css'

export default function Navbar({ currentPage, onNavigate }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'campaigns', label: 'Campaigns' },
    { id: 'ecosystem', label: 'Ecosystem' },
  ]

  const handleNav = (id) => {
    onNavigate(id)
    setMenuOpen(false)
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner container">
          <button className="navbar__logo" onClick={() => handleNav('home')}>
            <span className="navbar__logo-text">P</span>
            <span className="navbar__logo-text navbar__logo-u">U</span>
            <span className="navbar__logo-text">L</span>
            <span className="navbar__logo-text">S</span>
            <span className="navbar__logo-text">E</span>
            <span className="navbar__logo-dot"></span>
          </button>

          <div className="navbar__links">
            {links.map(link => (
              <button
                key={link.id}
                className={`navbar__link ${currentPage === link.id ? 'navbar__link--active' : ''}`}
                onClick={() => handleNav(link.id)}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="navbar__actions">
            <button className="btn btn-primary btn-sm" onClick={() => handleNav('dashboard')}>
              Start Earning
            </button>
          </div>

          <button
            className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
        <div className="mobile-menu__content">
          {links.map((link, i) => (
            <button
              key={link.id}
              className={`mobile-menu__link ${currentPage === link.id ? 'mobile-menu__link--active' : ''}`}
              onClick={() => handleNav(link.id)}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {link.label}
            </button>
          ))}
          <button className="btn btn-primary btn-lg mobile-menu__cta" onClick={() => handleNav('dashboard')}>
            Start Earning →
          </button>
        </div>
      </div>
    </>
  )
}
