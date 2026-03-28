import { useState, useEffect } from 'react';
import api from '../api';
import JobCard from '../components/JobCard';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/jobs/');
        setJobs(response.data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load active jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
      <div className="flex-space mb-4">
        <h1>Active Gigs</h1>
        <div style={{ color: 'var(--text-muted)' }}>{jobs.length} gigs available</div>
      </div>

      {loading ? (
        <div className="text-center" style={{ padding: '4rem 0' }}>
          <div style={{ fontSize: '2rem', animation: 'spin 1s linear infinite' }}>⏳</div>
          <p className="mt-4">Loading active jobs...</p>
        </div>
      ) : error && jobs.length === 0 ? (
        <div className="glass-panel text-center" style={{ padding: '3rem', color: 'var(--danger)' }}>
          {error}
        </div>
      ) : (
        <div className="job-grid">
          {jobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Jobs;
