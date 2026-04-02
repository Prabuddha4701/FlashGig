import { useState } from 'react'

const info = [
  { label: 'Email',    value: 'supportunigig@gmail.com' },
  { label: 'Response', value: 'Usually same day' },
  ,
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  return (
    <div className="page">
      {/* Header */}
      <div className="max-w-xl mx-auto text-center mb-12">
        
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px,5vw,44px)', color: 'var(--text)', marginBottom: '0.75rem' }}>
          How Can We Help?
        </h1>
        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 max-w-4xl mx-auto">
        {/* Form */}
        <div className="lg:col-span-2 rounded-2xl border p-7" style={{ background: 'var(--surface)', borderColor: 'var(--border)', borderTop: '3px solid var(--color-brand)' }}>
          <form
            action={`mailto:support@unigig.io`}
            method="get"
            encType="text/plain"
            style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Name *</label>
                <input className="input" type="text" name="name" placeholder="Your name"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Email *</label>
                <input className="input" type="email" name="email" placeholder="your@email.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="label">Subject</label>
              <input className="input" type="text" name="subject" placeholder="e.g. Payment question"
                value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Message *</label>
              <textarea className="input" name="body" rows={6} placeholder="Describe your issue or question…"
                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <button type="submit" className="btn-primary py-3 text-base">
              Send Message
            </button>
          </form>
        </div>

        {/* Info sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {info.map(i => (
            <div key={i.label} className="rounded-2xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <p className="label mb-0.5">{i.label}</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{i.value}</p>
            </div>
          ))}

          {/* FAQ nudge */}
          <div className="rounded-2xl border p-5 mt-auto" style={{ background: 'var(--raised)', borderColor: 'var(--border)' }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>Quick Answers</p>
            <ul style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.9, paddingLeft: 0, listStyle: 'none' }}>
              <li>Do workers need an account? <strong style={{ color: 'var(--text)' }}>No</strong></li>
              <li>When do I get paid? <strong style={{ color: 'var(--text)' }}>Provider contacts you directly</strong></li>
              <li>Is it free to apply? <strong style={{ color: 'var(--text)' }}>Yes, always</strong></li>
              <li>Can I post multiple gigs? <strong style={{ color: 'var(--text)' }}>Yes</strong></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
