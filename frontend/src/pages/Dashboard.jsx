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
    <div className="animate-fade-in py-8 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b border-border-color pb-8">
        <div>
          <h1 className="text-4xl text-black font-display font-bold mb-2">Provider Dashboard</h1>
          <p className="text-slate-600">Manage your active gigs and create new opportunities.</p>
        </div>
        <div className="flex gap-4 p-1 bg-slate-800/50 rounded-xl border border-white/5 w-full md:w-auto">
          <button 
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'jobs' ? 'bg-sky-600 text-white shadow-lg shadow-primary/20' : 'text-text-muted hover:text-text-main'}`}
            onClick={() => setActiveTab('jobs')}
          >
            My Gigs
          </button>
          <button 
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'newJob' ? 'bg-sky-600 text-white shadow-lg shadow-primary/20' : 'text-text-muted hover:text-text-main'}`}
            onClick={() => setActiveTab('newJob')}
          >
            + Post a Gig
          </button>
        </div>
      </div>

      {activeTab === 'jobs' && (
        <div className=" p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Posted Gigs</h2>
            <div className="text-sm font-medium text-white px-3 py-1 bg-black/70 rounded-full border border-white/5">
              {myJobs.length} Total
            </div>
          </div>
          
          {loadingJobs ? (
              <div className="flex justify-center py-12">
                <div className="w-10 h-10 border-4 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
          ) : myJobs.length === 0 ? (
              <div className="text-center py-12 bg-slate-900/30 rounded-2xl border border-dashed border-border-color">
                <p className="text-white text-lg">You haven't posted any gigs yet.</p>
                <button onClick={() => setActiveTab('newJob')} className="mt-4 text-white font-semibold hover:underline">Create your first gig →</button>
              </div>
          ) : (
              <div className="grid gap-4">
                  {myJobs.map(job => (
                      <div key={job.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6  rounded-xl bg-sky-800/80 hover:bg-sky-800 transition-all group">
                          <div className="mb-4 sm:mb-0">
                              <h3 className="text-lg font-bold mb-1">{job.title}</h3>
                              <div className="flex items-center gap-3">
                                <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider ${job.status === 'Active' ? 'bg-white text-sky-800' : 'bg-white text-sky-800'}`}>
                                  {job.status}
                                </span>
                        
                              </div>
                          </div>
                          <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-start">
                              <div className="text-right">
                                  <p className="text-[10px] text-text-muted uppercase tracking-widest font-semibold">Check the application status</p>
                              </div>
                              <button className="btn-secondary !px-4 !py-2 !text-xs whitespace-nowrap" onClick={() => navigate(`/jobs/${job.id}/applications`)}>View Details</button>
                          </div>
                      </div>
                  ))}
              </div>
          )}
        </div>
      )}

      {activeTab === 'newJob' && (
        <div className="glass-panel bg-sky-800/80 p-8 md:p-12 max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold mb-3">Create a New Gig</h2>
            <p className="text-text-muted">Provide the details for your lightning task.</p>
          </div>
          
          <form onSubmit={handlePostJob} className="space-y-6">
              <div className="space-y-2">
                  <label className="text-sm font-bold text-text-muted uppercase text-white tracking-wider">Gig Title</label>
                  <input className="form-input" type="text" placeholder="e.g. Test my mobile app" value={jobForm.title} onChange={e => setJobForm({...jobForm, title: e.target.value})} />
              </div>
              <div className="space-y-2">
                  <label className="text-sm font-bold text-white uppercase tracking-wider">Category</label>
                  <select className="form-input" value={jobForm.category} onChange={e => setJobForm({...jobForm, category: e.target.value})}>
                      <option>General</option>
                      <option>Data Entry</option>
                      <option>Crew Handling</option>
                      <option>Household chores</option>
                      <option>Photography</option>
                  </select>
              </div>
              <div className="space-y-2">
                  <label className="text-sm text-white font-bold text-text-muted uppercase tracking-wider">Detailed Description</label>
                  <textarea className="form-input" rows="6" placeholder="Describe the task instructions accurately" value={jobForm.description} onChange={e => setJobForm({...jobForm, description: e.target.value})}></textarea>
              </div>
              
              <div className="p-6 bg-sky-900 rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-white">Required Payment</p>
                    <p className="text-2xl font-display font-black">Rs.500.00</p>
                  </div>
              </div>

              <button type="submit" className="btn-primary w-full py-4 text-lg " disabled={submittingJob}>
                  {submittingJob ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : 'Proceed to Payment & Post'}
              </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
