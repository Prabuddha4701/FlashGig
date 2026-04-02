import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../api'
import JobCard from '../components/JobCard'

const ALL_CATS = [
  "All",
  "General",
  "Photography",
  "Teaching",
  "Content Writing",
  "Social Media",
  "Security",
  "Delivery Rider",
];

function Jobs() {
  const [jobs, setJobs]       = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')
  const [searchParams]        = useSearchParams()
  const [search, setSearch]   = useState('')
  const [cat, setCat]         = useState(() => searchParams.get('cat') || 'All')

  useEffect(() => {
    api.get('/jobs/')
      .then(r => {setJobs(r.data)})
      .catch(() => setError('Could not load jobs. Please try again.'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = jobs.filter(j => {
    const matchCat    = cat === 'All' || j.category === cat
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) ||
                        j.description?.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="page">

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,5vw,40px)', fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>
          Browse Gigs
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 14 }}>
          No account needed — pick a task, complete it, get paid.
        </p>
      </div>

      {/* Search bar */}
      <div style={{ position: 'relative', marginBottom: 20 }}>
        
        <input
          className="input"
          style={{ paddingLeft: 42, fontSize: 14, height: 46 }}
          placeholder="Search gigs by title or description..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            style={{
              position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--subtle)', fontSize: 18, lineHeight: 1, padding: '0 4px',
            }}
          >×</button>
        )}
      </div>

      {/* Category pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
        {ALL_CATS.map(c => (
          <button
            key={c}
            onClick={() => setCat(c)}
            style={{
              padding: '6px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600,
              border: '1px solid', cursor: 'pointer', transition: 'all .15s',
              background: cat === c ? '#7c3aed' : 'var(--raised)',
              borderColor: cat === c ? '#7c3aed' : 'var(--border)',
              color: cat === c ? '#fff' : 'var(--muted)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p style={{ fontSize: 13, color: 'var(--subtle)', marginBottom: 20 }}>
        {loading ? 'Loading…' : `${filtered.length} gig${filtered.length !== 1 ? 's' : ''} found`}
      </p>

      {/* Content */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 0', gap: 16 }}>
          <div className="spinner" style={{ width: 36, height: 36, borderWidth: 3 }} />
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>Loading gigs…</p>
        </div>
      ) : error && jobs.length === 0 ? (
        <div style={{ background: 'rgba(239,68,68,.05)', border: '1px solid rgba(239,68,68,.2)', borderRadius: 16, padding: '40px 24px', textAlign: 'center', color: '#ef4444' }}>
          <p style={{ fontSize: 14 }}>{error}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '64px 24px', textAlign: 'center' }}>
          <p style={{ fontSize: 36, marginBottom: 12 }}>🔎</p>
          <p style={{ color: 'var(--muted)', fontSize: 15 }}>No gigs match your search. Try a different category.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {filtered.map(job => <JobCard key={job.id} job={job} />)}
        </div>
      )}
    </div>
  )
}

export default Jobs
