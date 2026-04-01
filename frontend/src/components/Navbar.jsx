import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function Navbar() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Note: If using mock firebase this might not trigger, handled in components usually
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-[70px] flex items-center z-[100] bg-slate-900/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center w-full">
        <Link to="/" className="font-display text-2xl font-extrabold ">
          FlashGig
        </Link>
        
        <div className="flex gap-8 items-center">
          <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
          <Link to="/jobs" className={`nav-link ${isActive('/jobs')}`}>Jobs</Link>
          <Link to="/about" className={`nav-link ${isActive('/about')}`}>About</Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>Contact</Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>Dashboard</Link>
              <button 
                onClick={handleLogout} 
                className="btn-danger !px-4 !py-2 !text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-primary !px-4 !py-2 !font-medium" >
              Become a Provider
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
