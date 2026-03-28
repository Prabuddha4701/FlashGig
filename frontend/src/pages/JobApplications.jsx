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
    <div className="animate-fade-in" style={{ padding: '2rem 0', maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="mb-4">Applications for Job ID: {id}</h1>
      
      {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{error}</div>}
      
      {applications.length === 0 && !error ? (
        <p style={{ color: 'var(--text-muted)' }}>No applications received yet.</p>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {applications.map(app => (
            <div key={app.id} className="glass-panel" style={{ padding: '1.5rem' }}>
              <h3 style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                {app.worker_name}
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {new Date(app.timestamp).toLocaleString()}
                </span>
              </h3>
              <p style={{ color: 'var(--accent)', fontWeight: 'bold', marginBottom: '1rem' }}>
                  Contact: {app.contact_info}
              </p>
              <div>
                <strong>Evidence / Submission:</strong>
                <p style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '4px', marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>
                  {app.submission_data}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobApplications;
