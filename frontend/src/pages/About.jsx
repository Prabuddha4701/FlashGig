const steps = [
  { n: '01', title: 'Providers Post Gigs', desc: 'Businesses or individuals register and post micro-tasks with clear instructions and a category. Gigs stay live for 7 days.' },
  { n: '02', title: 'Students Apply',      desc: 'UG students browse open gigs with no sign-up needed, complete the task, and submit evidence through a simple form.' },
  { n: '03', title: 'Review & Contact',    desc: 'Providers review submissions on their dashboard and contact approved applicants directly to arrange payment.' },
]

const values = [
  { title: 'Student First',      desc: 'Every feature is built around students — flexible hours, no experience requirements, mobile-friendly.' },
  { title: 'Fair & Transparent', desc: 'Clear task descriptions, open contact details, and no hidden fees. Providers and students connect directly.' },
  { title: 'Inclusive',          desc: 'Open to undergraduates from any university, any country. Language and location are no barriers.' },
]

export default function About() {
  return (
    <div className="page">
      {/* Hero */}
      <div className="max-w-2xl mx-auto text-center mb-16">
        <span className="badge badge-brand mb-4">About UniGig</span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(30px,6vw,52px)', color: 'var(--text)', lineHeight: 1.1, marginBottom: '1rem' }}>
          Making Student Life a Little Easier
        </h1>
        <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.7 }}>
          UniGig is a micro-task marketplace built exclusively for undergraduate students.
          We connect students with short, flexible gigs so you can earn real money around your studies.
        </p>
      </div>

      {/* Mission */}
      <div className="rounded-2xl overflow-hidden border mb-12" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 md:p-10">
            <p className="badge badge-brand mb-4">Our Mission</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, color: 'var(--text)', marginBottom: '1rem' }}>
              Bridging the Gap Between Students and Opportunity
            </h2>
            <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.75 }}>
              Tuition fees, rent, books — student costs add up fast. We believe every student deserves a
              flexible way to earn real income without sacrificing academic performance.
              UniGig turns spare hours into real earnings.
            </p>
          </div>
          <div
            className="hidden md:block"
            style={{
              background: 'var(--raised)',
              minHeight: 220,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=75"
              alt="Students"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: .45 }}
            />
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <p className="badge badge-brand mb-3">How It Works</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: 'var(--text)' }}>
            Simple 3-Step Process
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map(s => (
            <div key={s.n} className="rounded-2xl border p-6 flex flex-col gap-3" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, color: 'var(--border)', lineHeight: 1 }}>{s.n}</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--text)' }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="mb-12">
        <h2 className="text-center mb-8" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: 'var(--text)' }}>
          Our Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {values.map(v => (
            <div key={v.title} className="rounded-2xl border p-6 flex flex-col gap-3" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--text)' }}>{v.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
