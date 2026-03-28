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
    <div className="animate-fade-in" style={{ padding: '2rem 0', maxWidth: '800px', margin: '0 auto' }}>
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <span className="job-category">{job.category}</span>
        <h1 className="mb-2">{job.title}</h1>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '2rem' }}>
          {job.description}
        </p>
        <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderRadius: '8px', display: 'inline-block' }}>
          <strong>⚠️ Warning:</strong> Ensure you follow all instructions. Fake submissions will be rejected.
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h2 className="mb-4">Submit Evidence</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              placeholder="e.g. John Doe"
              value={formData.worker_name}
              onChange={e => setFormData({...formData, worker_name: e.target.value})}
            />
          </div>
          
          <div className="form-group">
            <label>Contact Info (Phone or Email)</label>
            <input 
              type="text" 
              placeholder="e.g. +1 234 567 8900"
              value={formData.contact_info}
              onChange={e => setFormData({...formData, contact_info: e.target.value})}
            />
          </div>
          
          <div className="form-group">
            <label>Evidence Details / Link (20-1000 characters)</label>
            <textarea 
              rows="5" 
              placeholder="Describe what you did. If there are images, provide a Google Drive / Imgur link."
              value={formData.submission_data}
              onChange={e => setFormData({...formData, submission_data: e.target.value})}
            ></textarea>
            <div style={{ textAlign: 'right', fontSize: '0.8rem', color: formData.submission_data.length > 1000 ? 'var(--danger)' : 'var(--text-muted)' }}>
              {formData.submission_data.length} / 1000
            </div>
          </div>
          
          <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default JobDetails;
