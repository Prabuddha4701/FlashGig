import { Link } from 'react-router-dom'

const steps = [
  { n: '01', title: 'Providers Post Gigs', desc: 'Businesses or individuals register and post micro-tasks with clear instructions and a category. Gigs stay live for 7 days.' },
  { n: '02', title: 'Students Apply',      desc: 'UG students browse open gigs with no sign-up needed, complete the task, and submit evidence through a simple form.' },
  { n: '03', title: 'Review & Contact',    desc: 'Providers review submissions on their dashboard and contact approved applicants directly to arrange payment.' },
]

const values = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Student First',
    desc: 'Every feature is built around students — flexible hours, no experience requirements, mobile-friendly.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
    title: 'Fair & Transparent',
    desc: 'Clear task descriptions, open contact details, and no hidden fees. Providers and students connect directly.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Inclusive',
    desc: 'Open to undergraduates from any university, any country. Language and location are no barriers.',
  },
]



export default function About() {
  return (
    <div style={{ background: 'var(--base)', overflow: 'hidden' }}>

      {/* Hero */}
      <section style={{ position: 'relative', padding: '80px 24px 72px', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 400, borderRadius: '50%',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', maxWidth: 680, margin: '0 auto' }}>
          
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(36px, 6vw, 60px)', color: 'var(--text)',
            lineHeight: 1.08, marginBottom: 24, letterSpacing: '-0.03em',
          }}>
            Making Student Life<br />
            <span style={{ color: 'var(--color-brand-light)' }}>a Little Easier</span>
          </h1>
          <p style={{ fontSize: 17, color: 'var(--muted)', lineHeight: 1.75, maxWidth: 520, margin: '0 auto 36px' }}>
            UniGig is a micro-task marketplace built exclusively for undergraduate students.
            We connect students with short, flexible gigs so you can earn real money around your studies.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/jobs">
              <button className="btn-primary" style={{ padding: '11px 26px', fontSize: 14 }}>Browse Gigs</button>
            </Link>
            <Link to="/contact">
              <button className="btn-secondary" style={{ padding: '11px 26px', fontSize: 14 }}>Get in Touch</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
     

      {/* Mission */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
          borderRadius: 20, overflow: 'hidden',
          border: '1px solid var(--border)', background: 'var(--surface)',
        }}>
          <div style={{ padding: '56px 52px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--text)',
              lineHeight: 1.2, marginBottom: 20, letterSpacing: '-0.025em',
            }}>
              Bridging the Gap Between Students and Opportunity
            </h2>
            <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 28 }}>
              Tuition fees, rent, books — student costs add up fast. We believe every student deserves a
              flexible way to earn real income without sacrificing academic performance.
              UniGig turns spare hours into real earnings.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['No experience required', 'Flexible around your schedule', 'Direct payment from providers'].map(point => (
                <div key={point} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    background: 'rgba(108,71,255,0.15)', border: '1px solid rgba(108,71,255,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-light)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative', minHeight: 380, overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(108,71,255,0.22) 0%, rgba(108,71,255,0.04) 100%)',
              zIndex: 1,
            }} />
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700&q=80"
              alt="Students collaborating"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'clamp(24px, 4vw, 36px)', color: 'var(--text)', letterSpacing: '-0.025em',
            }}>Simple 3-Step Process</h2>
          </div>
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            <div style={{
              position: 'absolute', top: 36, left: '16%', right: '16%', height: 1,
              background: 'linear-gradient(90deg, transparent, var(--border), rgba(108,71,255,0.6), var(--border), transparent)',
              pointerEvents: 'none',
            }} />
            {steps.map((s, i) => (
              <div key={s.n}
                style={{
                  borderRadius: 18, border: '1px solid var(--border)', padding: '36px 28px 32px',
                  background: 'var(--raised)', display: 'flex', flexDirection: 'column', gap: 14,
                  position: 'relative', textAlign: 'center',
                  transition: 'border-color 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: '50%', margin: '0 auto 8px',
                  background: 'var(--surface)',
                  border: `2px solid var(--border)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18,
                  color:'var(--color-brand-light)',
                  
                }}>
                  {s.n}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: 'var(--text)' }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(24px, 4vw, 36px)', color: 'var(--text)', letterSpacing: '-0.025em',
          }}>Our Values</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {values.map(v => (
            <div key={v.title}
              style={{
                borderRadius: 18, border: '1px solid var(--border)', padding: '36px 28px',
                background: 'var(--surface)', display: 'flex', flexDirection: 'column', gap: 14,
                transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => {  e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{
                width: 46, height: 46, borderRadius: 12,
                background: 'rgb(108, 71, 255)', border: '1px solid rgba(108,71,255,0.22)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white',
              }}>
                {v.icon}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: 'var(--text)' }}>{v.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 88px' }}>
        <div style={{
          borderRadius: 20, padding: '56px 48px', textAlign: 'center',
          
          border: '1px solid rgba(108,71,255,0.25)', position: 'relative', overflow: 'hidden',
        }}>
          
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(22px, 3.5vw, 34px)', color: 'var(--text)',
            letterSpacing: '-0.025em', marginBottom: 16,
          }}>
            Ready to Start Earning?
          </h2>
          <p style={{ fontSize: 15, color: 'var(--muted)', maxWidth: 460, margin: '0 auto 32px' }}>
            Browse available gigs now — no sign-up required. Just find a task, complete it, and submit your work.
          </p>
          <Link to="/jobs">
            <button className="btn-primary" style={{ padding: '13px 32px', fontSize: 15 }}>Browse All Gigs →</button>
          </Link>
        </div>
      </section>

    </div>
  )
}
