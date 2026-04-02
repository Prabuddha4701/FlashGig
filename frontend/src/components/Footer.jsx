import { Link } from 'react-router-dom'

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
)

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

const cols = [
  {
    heading: 'Platform',
    links: [
      { label: 'Browse Jobs',      to: '/jobs' },
      { label: 'About UniGig',     to: '/about' },
      { label: 'Contact Us',       to: '/contact' },
      { label: 'Provider Login',   to: '/login' },
    ],
  },
  {
    heading: 'Students',
    links: [
      { label: 'How It Works',     to: '/about' },
      { label: 'Browse All Gigs',  to: '/jobs' },
      { label: 'Submit Evidence',  to: '/jobs' },
      { label: 'Get Help',         to: '/contact' },
    ],
  },
  {
    heading: 'Providers',
    links: [
      { label: 'Post a Gig',       to: '/login' },
      { label: 'Provider Dashboard', to: '/dashboard' },
      { label: 'Review Applications', to: '/dashboard' },
      { label: 'Contact Support',  to: '/contact' },
    ],
  },
]

const socials = [
  { icon: <TwitterIcon />,   href: '#', label: 'Twitter' },
  { icon: <FacebookIcon />,  href: '#', label: 'Facebook' },
  { icon: <InstagramIcon />, href: '#', label: 'Instagram' },
  { icon: <LinkedinIcon />,  href: '#', label: 'LinkedIn' },
  { icon: <MailIcon />,      href: '#', label: 'Email' },
]

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      marginTop: 'auto',
    }}>
      {/* Main footer content */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 40 }}>

          {/* Brand column */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 16 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                background: 'linear-gradient(135deg,#7c3aed,#5b21b6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 900, fontSize: 12,
                boxShadow: '0 2px 8px rgba(124,58,237,0.4)',
              }}>UG</div>
              <span style={{ fontFamily: 'var(--font-display)', color: 'var(--text)', fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em' }}>
                UniGig
              </span>
            </Link>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75, maxWidth: 240, marginBottom: 24 }}>
              A micro-task marketplace built exclusively for undergraduate students. Turn spare hours into real earnings.
            </p>
            <p style={{ fontSize: 12, color: 'var(--subtle)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              SOLO COMPANY
            </p>
          </div>

          {/* Link columns */}
          {cols.map(col => (
            <div key={col.heading}>
              <h4 style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: 'var(--muted)',
                marginBottom: 18,
              }}>
                {col.heading}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ height: 1, background: 'var(--border)' }} />
      </div>

      {/* Bottom bar */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          {/* Social icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                style={{
                  width: 34, height: 34, borderRadius: '50%',
                  border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--muted)', textDecoration: 'none',
                  transition: 'border-color 0.2s, color 0.2s, background 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(108,71,255,0.5)'
                  e.currentTarget.style.color = 'var(--color-brand-light)'
                  e.currentTarget.style.background = 'rgba(108,71,255,0.08)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.color = 'var(--muted)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p style={{ fontSize: 12, color: 'var(--subtle)' }}>
            © {new Date().getFullYear()} UniGig. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
