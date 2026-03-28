import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import toast from 'react-hot-toast';
import api from '../api';

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('jobs'); // 'jobs' or 'newJob'
  
  // Dashboard state
  const [myJobs, setMyJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  
  // New Job state
  const [jobForm, setJobForm] = useState({ title: '', description: '', category: 'General' });
  const [submittingJob, setSubmittingJob] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if (!user) {
            navigate('/login');
        } else {
            fetchProviderJobs();
        }
    });
    
    return () => unsubscribe();
  }, [navigate]);

  const fetchProviderJobs = async () => {
    setLoadingJobs(true);
    try {
      if (!auth.currentUser) return;
      const token = await auth.currentUser.getIdToken();
      const response = await api.get('/jobs/provider', { headers: { Authorization: `Bearer ${token}` } });
      
      // The backend doesn't return applications count by default in job model, 
      // but we can map it or just use a placeholder for now as requested.
      const jobsWithStatus = response.data.map(job => ({
          ...job,
          status: new Date(job.expires_at) > new Date() ? 'Active' : 'Expired',
          applications_count: '?' // We can add an endpoint to fetch counts if needed later
      }));
      setMyJobs(jobsWithStatus);
      setLoadingJobs(false);
      
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch your jobs');
      setLoadingJobs(false);
    }
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    if (!jobForm.title || !jobForm.description) {
        toast.error("Title and Description are required");
        return;
    }
    
    setSubmittingJob(true);
    try {
        // Normally simulate Payment validation and send auth token here
        toast.loading("Simulating Payment Gateway...", { id: 'payment' });
        
        setTimeout(async () => {
            toast.success("Payment Verified!", { id: 'payment' });
            
            try {
                const token = await auth.currentUser.getIdToken();
                await api.post('/jobs/', jobForm, { headers: { Authorization: `Bearer ${token}` } });
                toast.success("Job posted successfully!");
                setJobForm({ title: '', description: '', category: 'General' });
                setActiveTab('jobs');
                fetchProviderJobs();
            } catch (err) {
                toast.error("Failed to post job to server.");
                console.error(err);
            }
            setSubmittingJob(false);
        }, 1500);
        
    } catch(err) {
        toast.error(err.message || "Failed to post job");
        toast.dismiss('payment');
        setSubmittingJob(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
      <div className="flex-space mb-4">
        <h1>Provider Dashboard</h1>
        <div>
          <button 
            className={`btn-primary ${activeTab === 'newJob' ? '' : 'btn-secondary'}`}
            style={activeTab === 'newJob' ? {} : { background: 'transparent', color: 'var(--text-main)', border: '1px solid var(--border-color)' }}
            onClick={() => setActiveTab('newJob')}
          >
            + Post a Gig
          </button>
          <button 
            className={`btn-primary ${activeTab === 'jobs' ? '' : 'btn-secondary'}`}
            style={{ marginLeft: '1rem', ...(activeTab === 'jobs' ? {} : { background: 'transparent', color: 'var(--text-main)', border: '1px solid var(--border-color)' }) }}
            onClick={() => setActiveTab('jobs')}
          >
            My Gigs
          </button>
        </div>
      </div>

      {activeTab === 'jobs' && (
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 className="mb-4">Posted Gigs</h2>
          {loadingJobs ? (
              <p>Loading your gigs...</p>
          ) : myJobs.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>You haven't posted any gigs yet.</p>
          ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                  {myJobs.map(job => (
                      <div key={job.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px', background: 'rgba(15,23,42,0.4)' }}>
                          <div>
                              <h3 style={{ marginBottom: '0.25rem' }}>{job.title}</h3>
                              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Status: {job.status}</p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                              <p style={{ fontSize: '0.9rem', color: 'var(--accent)', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                  {job.applications_count !== undefined ? job.applications_count : job.applications} Applications
                              </p>
                              <button className="btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }} onClick={() => navigate(`/jobs/${job.id}/applications`)}>View Applications</button>
                          </div>
                      </div>
                  ))}
              </div>
          )}
        </div>
      )}

      {activeTab === 'newJob' && (
        <div className="glass-panel" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
          <h2 className="mb-4">Create a New Gig</h2>
          <form onSubmit={handlePostJob}>
              <div className="form-group">
                  <label>Gig Title</label>
                  <input type="text" placeholder="e.g. Test my mobile app" value={jobForm.title} onChange={e => setJobForm({...jobForm, title: e.target.value})} />
              </div>
              <div className="form-group">
                  <label>Category</label>
                  <select value={jobForm.category} onChange={e => setJobForm({...jobForm, category: e.target.value})}>
                      <option>General</option>
                      <option>Data Entry</option>
                      <option>Social Media</option>
                      <option>Usability Testing</option>
                      <option>Photography</option>
                  </select>
              </div>
              <div className="form-group mb-4">
                  <label>Detailed Description</label>
                  <textarea rows="6" placeholder="Describe the task instructions accurately" value={jobForm.description} onChange={e => setJobForm({...jobForm, description: e.target.value})}></textarea>
              </div>
              
              <div style={{ padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '8px', marginBottom: '1.5rem' }}>
                  <p style={{ fontSize: '0.9rem', fontWeight: '500' }}>ℹ️ Payment Required: $5.00</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>This gig will be active for exactly 7 days.</p>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={submittingJob}>
                  {submittingJob ? 'Processing...' : 'Proceed to Payment & Post'}
              </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
