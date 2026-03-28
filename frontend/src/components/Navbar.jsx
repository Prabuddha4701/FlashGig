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
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="nav-logo">FlashGig</Link>
        
        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
          <Link to="/jobs" className={`nav-link ${isActive('/jobs')}`}>Jobs</Link>
          <Link to="/about" className={`nav-link ${isActive('/about')}`}>About</Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>Contact</Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>Dashboard</Link>
              <button 
                onClick={handleLogout} 
                className="btn-danger" 
                style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-primary" style={{ padding: '0.4rem 1rem', fontWeight: '500' }}>
              Become a Provider
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
