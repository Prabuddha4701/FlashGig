import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { auth } from '../firebase';
import api from '../api';
import toast from 'react-hot-toast';

function JobApplications() {
  const { id } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        let headers = {};
        if (auth.currentUser) {
          const token = await auth.currentUser.getIdToken();
          headers = { Authorization: `Bearer ${token}` };
        }
        
        const response = await api.get(`/applications/job/${id}`, { headers });
        setApplications(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch applications for this job.');
      } finally {
        setLoading(false);
      }
    };

    // Need a tiny delay for firebase auth state to initialize sometimes
    const unsubscribe = auth.onAuthStateChanged(() => {
      fetchApplications();
    });
    
    return () => unsubscribe();
  }, [id]);

  if (loading) return <div className="text-center mt-4">Loading applications...</div>;

  return (
    <div className="animate-fade-in py-12 px-4 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Applications</h1>
          <p className="text-text-muted text-sm mt-1">Review submissions for Job ID: <span className="font-mono text-primary">{id.substring(0, 12)}...</span></p>
        </div>
        <div className="bg-slate-800/50 px-4 py-2 rounded-xl border border-white/5 shadow-sm text-sm font-medium">
          {applications.length} Submissions
        </div>
      </div>
      
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl mb-8 flex items-center gap-3">
          <span>❌</span> {error}
        </div>
      )}
      
      {applications.length === 0 && !error ? (
        <div className="glass-panel p-16 text-center border-dashed">
          <div className="text-5xl mb-6 opacity-30">📂</div>
          <p className="text-text-muted text-lg">No applications received yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {applications.map(app => (
            <div key={app.id} className="glass-panel p-8 border hover:border-primary/30 transition-all group">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4 border-b border-border-color pb-4">
                <div>
                  <h3 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors">
                    {app.worker_name}
                  </h3>
                  <p className="text-sm font-semibold text-accent mt-1 flex items-center gap-2">
                    <span className="opacity-70">📧</span> {app.contact_info}
                  </p>
                </div>
                <div className="text-xs font-medium text-text-muted bg-slate-900/50 px-3 py-1.5 rounded-lg border border-white/5 uppercase tracking-wider">
                    {new Date(app.timestamp).toLocaleString()}
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Submission Evidence</p>
                <div className="bg-slate-950/50 p-6 rounded-xl border border-white/5 shadow-inner leading-relaxed text-text-main/90 whitespace-pre-wrap">
                  {app.submission_data}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button className="text-xs font-bold uppercase tracking-widest text-primary hover:text-secondary transition-colors flex items-center gap-2">
                  Verify Credentials <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobApplications;
