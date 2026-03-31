import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api';

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    worker_name: '',
    contact_info: '',
    submission_data: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await api.get(`/jobs/${id}`);
        setJob(response.data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.worker_name || !formData.contact_info || !formData.submission_data) {
      toast.error('All fields are required.');
      return;
    }
    
    // Basic regex validation for phone numbers (e.g., 10 digits or standard formats)
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(formData.contact_info) && !formData.contact_info.includes('@')) {
      toast.error('Please enter a valid phone number or email.');
      return;
    }
    
    // Character limit check
    if (formData.submission_data.length < 20) {
      toast.error('Evidence description is too short (min 20 chars).');
      return;
    }
    
    if (formData.submission_data.length > 1000) {
      toast.error('Evidence description is too long (max 1000 chars).');
      return;
    }

    setSubmitting(true);
    try {
      await api.post(`/applications/apply/${id}`, formData);
      toast.success('Application Submitted Successfully!');
      setTimeout(() => navigate('/jobs'), 1500);
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to submit application. Did the job expire?');
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center mt-4">Loading Job Details...</div>;
  if (!job) return <div className="text-center mt-4">Job not found.</div>;

  return (
    <div className="animate-fade-in py-12 px-4 max-w-3xl mx-auto">
      <div className="glass-panel p-8 md:p-12 mb-10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -mr-16 -mt-16 rounded-full"></div>
        <span className="inline-block px-4 py-1.5 bg-indigo-500/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-6">
          {job.category}
        </span>
        <h1 className="text-4xl font-display font-extrabold mb-4 leading-tight">{job.title}</h1>
        <div className="prose prose-invert max-w-none mb-10">
          <p className="text-text-muted text-lg leading-relaxed whitespace-pre-wrap">
            {job.description}
          </p>
        </div>
        
        <div className="p-5 bg-red-500/5 border border-red-500/20 text-red-400 rounded-xl flex gap-4 items-start shadow-inner">
          <span className="text-xl">⚠️</span>
          <div className="text-sm">
            <strong className="block font-bold mb-1 text-red-300">Important Warning:</strong>
            Ensure you follow all instructions precisely. Fake submissions or low-quality evidence will be rejected and may lead to account restrictions.
          </div>
        </div>
      </div>

      <div className="glass-panel p-8 md:p-12 border-t-4 border-t-primary">
        <div className="mb-8">
          <h2 className="text-2xl font-display font-bold mb-2">Submit Evidence</h2>
          <p className="text-text-muted text-sm">Fill in the details below to complete this gig.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Full Name</label>
            <input 
              className="form-input"
              type="text" 
              placeholder="e.g. John Doe"
              value={formData.worker_name}
              onChange={e => setFormData({...formData, worker_name: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Contact Info (Phone or Email)</label>
            <input 
              className="form-input"
              type="text" 
              placeholder="e.g. johndoe@example.com or +1 234 567 8900"
              value={formData.contact_info}
              onChange={e => setFormData({...formData, contact_info: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Evidence Details / Link (20-1000 characters)</label>
            <textarea 
              className="form-input"
              rows="6" 
              placeholder="Describe what you did. If there are images, provide a Google Drive / Imgur link."
              value={formData.submission_data}
              onChange={e => setFormData({...formData, submission_data: e.target.value})}
            ></textarea>
            <div className={`text-right text-xs font-medium ${formData.submission_data.length > 1000 ? 'text-danger' : 'text-text-muted'}`}>
              <span className={formData.submission_data.length < 20 ? 'text-amber-500' : ''}>
                {formData.submission_data.length}
              </span> / 1000 characters
            </div>
          </div>
          
          <button type="submit" className="btn-primary w-full py-4 text-lg font-bold shadow-xl shadow-primary/30" disabled={submitting}>
            {submitting ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Submitting...</span>
              </div>
            ) : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default JobDetails;
