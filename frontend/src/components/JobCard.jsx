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
    <div className="job-card glass-panel group bg-sky-800/90">
      <span className="bg-white px-3 py-1 text-black rounded-full text-sm font-semibold mb-4 w-full">
        {job.category || 'General'}
      </span>
      <h3 className="text-xl font-display font-bold mb-2 text-text-main ">
        {job.title}
      </h3>
      <p className="text-white text-[0.95rem] leading-relaxed mb-6 flex-grow">
        {job.description?.length > 100 ? `${job.description.substring(0, 100)}...` : job.description}
      </p>
      
      <div className="flex justify-between items-center border-t border-border-color pt-4 mt-auto">
        <div className="font-display font-semibold text-slate-900 flex items-center gap-2">
          {timeLeft}
        </div>
        <Link to={`/jobs/${job.id}`}>
          <button className="btn-secondary !px-4 !py-2 !text-sm">
            Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default JobCard;
