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
    <div className="animate-fade-in" style={{ padding: '2rem 0', maxWidth: '600px', margin: '0 auto' }}>
      <h1 className="mb-4 text-center">Contact Us</h1>
      
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              placeholder="Your name"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Your email address"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <div className="form-group">
            <label>Message</label>
            <textarea 
              rows="5" 
              placeholder="How can we help?"
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>
          
          <button type="submit" className="btn-primary" style={{ width: '100%' }}>Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
