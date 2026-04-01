import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="animate-fade-in py-16 px-4">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="text-5xl md:text-7xl font-display font-extrabold leading-tight mb-6 tracking-tight text-slate-800">
          Find Part-Time Jobs <br/>
          <span className=" text-sky-700 ">For University Students</span>
        </h1>
        <p className="text-xl text-black max-w-2xl mx-auto mb-10 leading-relaxed">
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

      <div className="glass-panel p-12 text-center max-w-6xl mx-auto bg-sky-700/90">
         <h2 className="text-3xl font-display font-bold mb-6">Why Choose FlashGig?</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center bg-sky-900 p-[20px] rounded-2xl transition-all duration-300 hover:-translate-y-0.5">
              
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-text-muted leading-relaxed">Tasks are completed quickly by our dedicated microworkers.</p>
            </div>
            <div className="flex flex-col items-center bg-sky-900 p-[20px] rounded-2xl transition-all duration-300 hover:-translate-y-0.5">
              
              <h3 className="text-xl font-bold mb-3">Secure Payments</h3>
              <p className="text-text-muted leading-relaxed">Verified providers and secure transaction handling.</p>
            </div>
            <div className="flex flex-col items-center bg-sky-900 p-[20px] rounded-2xl transition-all duration-300 hover:-translate-y-0.5">
              
              <h3 className="text-xl font-bold mb-3">Quality Results</h3>
              <p className="text-text-muted leading-relaxed">Get quality evidence and details for every completed task.</p>
            </div>
         </div>
         <h2 className="text-3xl font-display font-bold mb-6 mt-[50px]">Frequenty asked questions..</h2>
         <div className="bg-sky-800">
         <div className="collapse collapse-arrow bg-sky-900 ">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title font-semibold">How do I create an account?</div>
            <div className="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
          </div>
          <div className="collapse collapse-arrow bg-sky-700 ">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-semibold">I forgot my password. What should I do?</div>
            <div className="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
          </div>
          <div className="collapse collapse-arrow bg-sky-900 ">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-semibold">How do I update my profile information?</div>
            <div className="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
          </div>
         </div>
         
         
      </div>
      
      
    </div>
  );
}

export default Home;
