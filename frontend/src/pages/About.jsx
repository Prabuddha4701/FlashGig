function About() {
  return (
    <div className="animate-fade-in" style={{ padding: '2rem 0', maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="mb-4 text-center">About FlashGig</h1>
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h2 className="mb-2">Our Mission</h2>
        <p className="mb-4" style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
          FlashGig was created to bridge the gap between people who need small tasks done quickly and workers looking for flexible earning opportunities. 
          We believe in creating a fair, transparent, and efficient marketplace for microwork.
        </p>

        <h2 className="mb-2">How It Works</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.2)', color: 'var(--primary)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>1</div>
            <div>
              <h3 className="mb-1">Providers Post Gigs</h3>
              <p style={{ color: 'var(--text-muted)' }}>Anyone can become a provider by signing up. Post a task, set the category, and provide detailed instructions.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.2)', color: 'var(--primary)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>2</div>
            <div>
              <h3 className="mb-1">Workers Apply</h3>
              <p style={{ color: 'var(--text-muted)' }}>Workers browse active jobs, complete the required task, and submit evidence via our streamlined form—no account required for workers!</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.2)', color: 'var(--primary)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>3</div>
            <div>
              <h3 className="mb-1">Verification & Payment</h3>
              <p style={{ color: 'var(--text-muted)' }}>Providers review submissions on their dashboard. Once verified with the external payment simulation, the task is marked as complete.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
