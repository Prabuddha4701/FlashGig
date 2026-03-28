import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="animate-fade-in" style={{ padding: '4rem 0' }}>
      <div className="text-center" style={{ maxWidth: '800px', margin: '0 auto 4rem' }}>
        <h1 className="hero-title">
          Get Tasks Done <br/>
          <span style={{ color: 'var(--primary)' }}>Fast & Reliably.</span>
        </h1>
        <p className="hero-subtitle">
          Connect with trusted workers to complete small tasks, or browse available gigs and earn money today. Simple, fast, and secure.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/jobs">
            <button className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Find Work
            </button>
          </Link>
          <Link to="/login">
            <button className="btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Post a Gig
            </button>
          </Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1fr)', gap: '2rem', padding: '2rem' }} className="glass-panel text-center">
         <h2>Why Choose FlashGig?</h2>
         <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem', flexWrap: 'wrap', gap: '2rem' }}>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
              <h3>Lightning Fast</h3>
              <p style={{ color: 'var(--text-muted)' }}>Tasks are completed quickly by our dedicated microworkers.</p>
            </div>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
              <h3>Secure Payments</h3>
              <p style={{ color: 'var(--text-muted)' }}>Verified providers and secure transaction handling.</p>
            </div>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
              <h3>Quality Results</h3>
              <p style={{ color: 'var(--text-muted)' }}>Get quality evidence and details for every completed task.</p>
            </div>
         </div>
      </div>
    </div>
  );
}

export default Home;
