function About() {
  return (
    <div className="animate-fade-in py-12 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-display font-bold mb-10 text-center">About FlashGig</h1>
      <div className="glass-panel p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl -mr-32 -mt-32 rounded-full"></div>
        
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-text-muted text-lg leading-relaxed mb-12">
            FlashGig was created to bridge the gap between people who need small tasks done quickly and workers looking for flexible earning opportunities. 
            We believe in creating a fair, transparent, and efficient marketplace for microwork.
          </p>

          <h2 className="text-2xl font-bold mb-8">How It Works</h2>
          <div className="space-y-10 mt-6">
            <div className="flex gap-6 items-start group">
              <div className="bg-primary/20 text-primary w-12 h-12 rounded-full flex items-center justify-center font-black text-lg flex-shrink-0 border border-primary/30 group-hover:bg-primary group-hover:text-white transition-all duration-300">1</div>
              <div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Providers Post Gigs</h3>
                <p className="text-text-muted leading-relaxed">Anyone can become a provider by signing up. Post a task, select a category, and provide detailed instructions for your target workers.</p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start group">
              <div className="bg-primary/20 text-primary w-12 h-12 rounded-full flex items-center justify-center font-black text-lg flex-shrink-0 border border-primary/30 group-hover:bg-primary group-hover:text-white transition-all duration-300">2</div>
              <div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Workers Apply</h3>
                <p className="text-text-muted leading-relaxed">Workers browse active jobs, complete the required task, and submit evidence via our streamlined interface—no account required for workers!</p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start group">
              <div className="bg-primary/20 text-primary w-12 h-12 rounded-full flex items-center justify-center font-black text-lg flex-shrink-0 border border-primary/30 group-hover:bg-primary group-hover:text-white transition-all duration-300">3</div>
              <div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Verification & Payment</h3>
                <p className="text-text-muted leading-relaxed">Providers review submissions accurately on their dashboard. Once verified via our secure simulation, the task is marked as successfully completed.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
