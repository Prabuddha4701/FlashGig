import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function JobCard({ job }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calcTimeLeft = () => {
      // Handle the ISO string from backend
      const endDate = new Date(job.expires_at || new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
      const now = new Date();
      const difference = endDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        
        if (days > 0) {
            setTimeLeft(`${days} day${days > 1 ? 's' : ''} left`);
        } else {
            setTimeLeft(`${hours} hr${hours !== 1 ? 's' : ''} left`);
        }
      } else {
        setTimeLeft('Expired');
      }
    };

    calcTimeLeft();
    const timer = setInterval(calcTimeLeft, 60000); // Update every minute
    return () => clearInterval(timer);
  }, [job]);

  return (
    <div className="job-card glass-panel">
      <span className="job-category">{job.category || 'General'}</span>
      <h3 className="job-title">{job.title}</h3>
      <p className="job-desc">
        {job.description?.length > 100 ? `${job.description.substring(0, 100)}...` : job.description}
      </p>
      
      <div className="job-footer">
        <div className="countdown">
          <span>⏱️</span> {timeLeft}
        </div>
        <Link to={`/jobs/${job.id}`}>
          <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
            Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default JobCard;
