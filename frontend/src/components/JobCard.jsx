import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const categoryColors = {
  'General':           { bg: 'rgba(124,58,237,.12)', color: '#a78bfa', border: 'rgba(124,58,237,.25)' },
  'Data Entry':        { bg: 'rgba(245,158,11,.12)',  color: '#fbbf24', border: 'rgba(245,158,11,.25)' },
  'Social Media':      { bg: 'rgba(59,130,246,.12)',  color: '#60a5fa', border: 'rgba(59,130,246,.25)' },
  'Usability Testing': { bg: 'rgba(16,185,129,.12)',  color: '#34d399', border: 'rgba(16,185,129,.25)' },
  'Photography':       { bg: 'rgba(236,72,153,.12)',  color: '#f472b6', border: 'rgba(236,72,153,.25)' },
  'Content Writing':   { bg: 'rgba(245,158,11,.12)',  color: '#fbbf24', border: 'rgba(245,158,11,.25)' },
  'Research & Survey': { bg: 'rgba(16,185,129,.12)',  color: '#34d399', border: 'rgba(16,185,129,.25)' },
}

function JobCard({ job }) {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const calc = () => {
      const end  = new Date(job.expires_at || Date.now() + 7 * 86400000)
      const diff = end - Date.now()
      if (diff <= 0) { setTimeLeft('Expired'); return }
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff / 3600000) % 24)
      setTimeLeft(d > 0 ? `${d}d left` : `${h}h left`)
    }
    calc()
    const t = setInterval(calc, 60000)
    return () => clearInterval(t)
  }, [job])

  const isExpired  = timeLeft === 'Expired'
  const catStyle   = categoryColors[job.category] || categoryColors['General']

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 16,
      padding: '20px 22px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      transition: 'all .2s ease',
      cursor: 'pointer',
      minHeight: 200,
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--color-brand)'
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = '0 8px 28px rgba(124,58,237,.18)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Top row — category + time */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span style={{
          fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999,
          background: catStyle.bg, color: catStyle.color, border: `1px solid ${catStyle.border}`,
          textTransform: 'uppercase', letterSpacing: '.05em',
        }}>
          {job.category || 'General'}
        </span>
        <span style={{
          fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 999,
          background: isExpired ? 'rgba(239,68,68,.1)' : 'rgba(16,185,129,.1)',
          color: isExpired ? '#ef4444' : '#34d399',
          border: `1px solid ${isExpired ? 'rgba(239,68,68,.2)' : 'rgba(16,185,129,.2)'}`,
        }}>
          {timeLeft}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17,
        color: 'var(--text)', lineHeight: 1.3, margin: 0,
      }}>
        {job.title}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, flex: 1, margin: 0,
      }}>
        {job.description?.length > 120 ? `${job.description.slice(0, 120)}…` : job.description}
      </p>

      {/* Footer */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: 14, borderTop: '1px solid var(--border)',
      }}>
        <span style={{
          fontSize: 11, color: 'var(--subtle)', textTransform: 'uppercase',
          letterSpacing: '.07em', fontWeight: 600,
        }}>
          By Provider
        </span>
        <Link to={`/jobs/${job.id}`}>
          <button style={{
            padding: '7px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600,
            background: 'var(--color-brand)', color: '#fff', border: 'none',
            cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'opacity .15s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Apply →
          </button>
        </Link>
      </div>
    </div>
  )
}

export default JobCard
