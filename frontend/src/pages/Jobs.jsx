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
    <div className="animate-fade-in py-8">
      <div className="flex justify-between items-center mb-8 border-b border-border-color pb-4">
        <h1 className="text-3xl font-display font-bold">Active Gigs</h1>
        <div className="text-text-muted font-medium bg-slate-800/50 px-4 py-1 rounded-full border border-white/5">
          {jobs.length} gigs available
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-6 text-text-muted font-medium">Loading active jobs...</p>
        </div>
      ) : error && jobs.length === 0 ? (
        <div className="glass-panel p-12 text-center text-danger border-danger/30">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Jobs;
