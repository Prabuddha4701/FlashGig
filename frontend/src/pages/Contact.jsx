import { useState } from 'react';
import toast from 'react-hot-toast';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
        toast.error('Please fill all fields');
        return;
    }
    // Simulate sending message
    setTimeout(() => {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <div className="animate-fade-in py-16 px-4 max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl text-slate-600 font-display font-bold mb-3 tracking-tight">Contact Us</h1>
        <p className="text-slate-500">Have questions? We're here to help you 24/7.</p>
      </div>
      
      <div className="glass-panel bg-sky-800/80 p-8 md:p-12 shadow-2xl relative">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/10 blur-3xl rounded-full"></div>
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-muted uppercase text-white tracking-widest px-1">Full Name</label>
            <input 
              className="form-input"
              type="text" 
              placeholder="Your name"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-white text-text-muted uppercase tracking-widest px-1">Email Address</label>
            <input 
              className="form-input"
              type="email" 
              placeholder="Your email address"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-white text-text-muted uppercase tracking-widest px-1">Message</label>
            <textarea 
              className="form-input"
              rows="6" 
              placeholder="How can we help?"
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>
          
          <button type="submit" className="btn-primary w-full py-4 text-lg font-bold shadow-xl ">
            Send Message
          </button>
        </form>
      </div>

     
    </div>
  );
}

export default Contact;
