import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="animate-fade-in py-16 px-4">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="text-5xl md:text-7xl font-display font-extrabold leading-tight mb-6 tracking-tight">
          Get Tasks Done <br/>
          <span className="text-primary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Fast & Reliably.</span>
        </h1>
        <p className="text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Connect with trusted workers to complete small tasks, or browse available gigs and earn money today. Simple, fast, and secure.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/jobs">
            <button className="btn-primary w-full sm:w-auto text-lg px-8 py-4">
              Find Work
            </button>
          </Link>
          <Link to="/login">
            <button className="btn-secondary w-full sm:w-auto text-lg px-8 py-4">
              Post a Gig
            </button>
          </Link>
        </div>
      </div>

      <div className="glass-panel p-12 text-center max-w-6xl mx-auto">
         <h2 className="text-3xl font-display font-bold mb-12">Why Choose FlashGig?</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <div className="text-5xl mb-6 drop-shadow-lg">⚡</div>
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-text-muted leading-relaxed">Tasks are completed quickly by our dedicated microworkers.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-5xl mb-6 drop-shadow-lg">🔒</div>
              <h3 className="text-xl font-bold mb-3">Secure Payments</h3>
              <p className="text-text-muted leading-relaxed">Verified providers and secure transaction handling.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-5xl mb-6 drop-shadow-lg">🎯</div>
              <h3 className="text-xl font-bold mb-3">Quality Results</h3>
              <p className="text-text-muted leading-relaxed">Get quality evidence and details for every completed task.</p>
            </div>
         </div>
      </div>
    </div>
  );
}

export default Home;
