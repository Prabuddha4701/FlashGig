import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../api'

function JobDetails() {
  const { id }       = useParams()
  const navigate     = useNavigate()
  const [job, setJob]                 = useState(null)
  const [loading, setLoading]         = useState(true)
  const [submitting, setSubmitting]   = useState(false)
  const [formData, setFormData]       = useState({ worker_name: '', contact_info: '', submission_data: '' })

  useEffect(() => {
    api.get(`/jobs/${id}`)
      .then(r => setJob(r.data))
      .catch(() => toast.error('Failed to load job details'))
      .finally(() => setLoading(false))
  }, [id])

  const handleSubmit = async e => {
    e.preventDefault()
    if (!formData.worker_name || !formData.contact_info || !formData.submission_data) {
      toast.error('All fields are required.'); return
    }
    const phoneRe = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    if (!phoneRe.test(formData.contact_info) && !formData.contact_info.includes('@')) {
      toast.error('Enter a valid phone number or email.'); return
    }
    if (formData.submission_data.length < 20) { toast.error('Evidence too short (min 20 chars).'); return }
    if (formData.submission_data.length > 1000) { toast.error('Evidence too long (max 1000 chars).'); return }

    setSubmitting(true)
    try {
      await api.post(`/applications/apply/${id}`, formData)
      toast.success('Application submitted! 🎉')
      setTimeout(() => navigate('/jobs'), 1400)
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Submission failed.')
      setSubmitting(false)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center" style={{ minHeight: '60vh' }}>
      <div className="spinner" style={{ width: 36, height: 36, borderWidth: 3 }} />
    </div>
  )

  if (!job) return (
    <div className="page text-center">
      <p style={{ color: 'var(--muted)' }}>Job not found.</p>
      <Link to="/jobs"><button className="btn-primary mt-4">Back to Gigs</button></Link>
    </div>
  )

  const charCount = formData.submission_data.length
  const expiresDate = new Date(job.expires_at)
  const daysLeft = Math.max(0, Math.floor((expiresDate - Date.now()) / 86400000))

  return (
    <div className="page max-w-3xl" style={{ maxWidth: 760, margin: '0 auto' }}>
      {/* Back */}
      <Link to="/jobs" className="inline-flex items-center gap-1.5 text-sm mb-7" style={{ color: 'var(--muted)' }}
        onMouseEnter={e => e.currentTarget.style.color='var(--color-brand-light)'}
        onMouseLeave={e => e.currentTarget.style.color='var(--muted)'}
      >
        ← Back to Gigs
      </Link>

      {/* Job detail card */}
      <div className="rounded-2xl border p-7 md:p-10 mb-6" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="badge badge-brand">{job.category}</span>
          <span
            className="badge"
            style={{
              background: daysLeft > 0 ? 'rgba(16,185,129,.1)' : 'rgba(239,68,68,.1)',
              color: daysLeft > 0 ? '#34d399' : '#ef4444',
              borderColor: daysLeft > 0 ? 'rgba(16,185,129,.25)' : 'rgba(239,68,68,.25)',
            }}
          >
            {daysLeft > 0 ? `${daysLeft}d remaining` : 'Expired'}
          </span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,4vw,32px)', fontWeight: 800, color: 'var(--text)', marginBottom: '1rem', lineHeight: 1.2 }}>
          {job.title}
        </h1>

        <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7, whiteSpace: 'pre-wrap', marginBottom: '1.5rem' }}>
          {job.description}
        </p>

        <div className="rounded-xl p-4 flex gap-3 items-start" style={{ background: 'rgba(245,158,11,.08)', border: '1px solid rgba(245,158,11,.2)' }}>
          <span>⚠️</span>
          <div style={{ fontSize: 13, color: '#f59e0b' }}>
            <strong className="block mb-0.5" style={{ color: '#fbbf24' }}>Read before applying:</strong>
            Submit genuine evidence only. Low-quality or fake submissions are rejected and may block future access.
          </div>
        </div>
      </div>

      {/* Application form */}
      <div
        className="rounded-2xl border p-7 md:p-10"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', borderTop: '3px solid var(--color-brand)' }}
      >
        <div className="mb-7">
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: 'var(--text)', marginBottom: 4 }}>
            Submit Your Application
          </h2>
          <p style={{ fontSize: 13, color: 'var(--muted)' }}>Fill in your details and proof of task completion.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label className="label">Your Full Name</label>
            <input className="input" type="text" placeholder="e.g. Sarah Johnson"
              value={formData.worker_name}
              onChange={e => setFormData({ ...formData, worker_name: e.target.value })}
            />
          </div>

          <div>
            <label className="label">Contact (Phone or Email)</label>
            <input className="input" type="text" placeholder="e.g. sarah@uni.edu or +1 234 567 8900"
              value={formData.contact_info}
              onChange={e => setFormData({ ...formData, contact_info: e.target.value })}
            />
          </div>

          <div>
            <label className="label">Evidence / Proof (20–1000 chars)</label>
            <textarea className="input" rows={6}
              placeholder="Describe what you did. Include Google Drive, Imgur, or screenshot links."
              value={formData.submission_data}
              onChange={e => setFormData({ ...formData, submission_data: e.target.value })}
            />
            <div className="flex justify-end mt-1">
              <span style={{ fontSize: 11, color: charCount < 20 ? '#f59e0b' : charCount > 1000 ? '#ef4444' : 'var(--subtle)' }}>
                {charCount} / 1000
              </span>
            </div>
          </div>

          <button type="submit" className="btn-primary w-full py-3 text-base" disabled={submitting}>
            {submitting ? <><span className="spinner" /> Submitting…</> : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default JobDetails
