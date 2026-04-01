import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'

const SunIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="4"/>
    <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
    <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
  </svg>
)

const MoonIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

export default function Navbar() {
  const location   = useLocation()
  const [user, setUser]         = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDark, setIsDark]     = useState(() => localStorage.getItem('theme') !== 'light')
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.add('light')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => setUser(u))
    return () => unsub()
  }, [])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const handleLogout = async () => { try { await signOut(auth) } catch (e) {} }
  const isActive = p => location.pathname === p ? 'active' : ''

  const NavLinks = ({ mobile }) => (
    <>
      {[['/', 'Home'], ['/jobs', 'Browse Jobs'], ['/about', 'About'], ['/contact', 'Contact']].map(([path, label]) => (
        <Link key={path} to={path} className={`nav-link ${isActive(path)}`}
          style={mobile ? { fontSize: 16, fontWeight: 500, color: 'var(--text)' } : {}}>
          {label}
        </Link>
      ))}
      {user && (
        <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}
          style={mobile ? { fontSize: 16, color: 'var(--text)' } : {}}>
          Dashboard
        </Link>
      )}
    </>
  )

  const navBg = scrolled
    ? isDark ? 'rgba(13,17,23,0.88)' : 'rgba(243,244,246,0.92)'
    : 'transparent'

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: 64,
        display: 'flex', alignItems: 'center',
        background: navBg,
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 0.3s, border-color 0.3s',
      }}>
        <div style={{
          width: '100%', maxWidth: 1152, margin: '0 auto', padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8, flexShrink: 0,
              background: 'linear-gradient(135deg,#7c3aed,#5b21b6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 900, fontSize: 12,
              boxShadow: '0 2px 8px rgba(124,58,237,0.4)',
            }}>UG</div>
            <span style={{ fontFamily: 'var(--font-display)', color: 'var(--text)', fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em' }}>
              UniGig
            </span>
          </Link>

          {/* Desktop links — only show if not mobile */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
              <NavLinks />
            </div>
          )}

          {/* Right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

            {/* Theme toggle */}
            <button
              onClick={() => setIsDark(d => !d)}
              aria-label="Toggle theme"
              style={{
                position: 'relative', width: 52, height: 28, borderRadius: 99,
                border: '1px solid', padding: 0, cursor: 'pointer', outline: 'none',
                borderColor: isDark ? 'rgba(124,58,237,0.45)' : 'var(--border)',
                background: isDark ? 'rgba(124,58,237,0.18)' : 'var(--raised)',
                transition: 'background 0.3s, border-color 0.3s',
                flexShrink: 0,
              }}
            >
              {/* Sun (left) */}
              <span style={{
                position: 'absolute', left: 7, top: '50%', transform: 'translateY(-50%)',
                display: 'flex', alignItems: 'center',
                color: isDark ? 'rgba(255,255,255,0.2)' : 'var(--muted)',
                transition: 'color 0.3s',
              }}><SunIcon /></span>
              {/* Moon (right) */}
              <span style={{
                position: 'absolute', right: 7, top: '50%', transform: 'translateY(-50%)',
                display: 'flex', alignItems: 'center',
                color: isDark ? 'var(--color-brand-light)' : 'rgba(0,0,0,0.15)',
                transition: 'color 0.3s',
              }}><MoonIcon /></span>
              {/* Thumb */}
              <span style={{
                position: 'absolute', top: 3, width: 20, height: 20, borderRadius: '50%',
                left: isDark ? 'calc(100% - 23px)' : 3,
                background: isDark ? '#7c3aed' : '#9ca3af',
                boxShadow: isDark ? '0 0 8px rgba(124,58,237,0.5)' : '0 1px 3px rgba(0,0,0,0.15)',
                transition: 'left 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.3s',
              }} />
            </button>

            {/* Auth — desktop only */}
            {!isMobile && (
              user ? (
                <button onClick={handleLogout} className="btn-danger" style={{ padding: '6px 14px', fontSize: 13 }}>
                  Sign Out
                </button>
              ) : (
                <Link to="/login">
                  <button className="btn-primary" style={{ padding: '7px 16px', fontSize: 13 }}>
                    Provider Login
                  </button>
                </Link>
              )
            )}

            {/* Hamburger — mobile only */}
            {isMobile && (
              <button
                onClick={() => setMenuOpen(o => !o)}
                aria-label="Menu"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, display: 'flex', flexDirection: 'column', gap: 5 }}
              >
                <span style={{ display: 'block', width: 20, height: 2, borderRadius: 2, background: 'var(--text)', transform: menuOpen ? 'rotate(45deg) translate(4px,4px)' : 'none', transition: 'transform 0.25s' }} />
                <span style={{ display: 'block', width: 20, height: 2, borderRadius: 2, background: 'var(--text)', opacity: menuOpen ? 0 : 1, transition: 'opacity 0.25s' }} />
                <span style={{ display: 'block', width: 20, height: 2, borderRadius: 2, background: 'var(--text)', transform: menuOpen ? 'rotate(-45deg) translate(4px,-4px)' : 'none', transition: 'transform 0.25s' }} />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {isMobile && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 40,
          pointerEvents: menuOpen ? 'auto' : 'none',
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.25s',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setMenuOpen(false)} />
          <div style={{
            position: 'absolute', top: 64, left: 0, right: 0,
            background: 'var(--surface)', borderBottom: '1px solid var(--border)',
            padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 18,
            transform: menuOpen ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'transform 0.25s',
          }}>
            <NavLinks mobile />
            <hr style={{ borderColor: 'var(--border)', margin: '2px 0' }} />
            {user ? (
              <button onClick={handleLogout} className="btn-danger" style={{ width: '100%' }}>Sign Out</button>
            ) : (
              <Link to="/login" style={{ width: '100%' }}>
                <button className="btn-primary" style={{ width: '100%' }}>Provider Login</button>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  )
}
