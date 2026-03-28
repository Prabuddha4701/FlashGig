import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import toast from 'react-hot-toast';

function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
      return;
    }
    
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        toast.success("Welcome back!");
      } else {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        toast.success("Account created successfully!");
      }
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      toast.error(err.message || "An authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '4rem 0', maxWidth: '400px', margin: '0 auto' }}>
      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        <h2 className="text-center mb-1">
          {isLogin ? 'Provider Login' : 'Become a Provider'}
        </h2>
        <p className="text-center mb-4" style={{ color: 'var(--text-muted)' }}>
          {isLogin ? 'Access your dashboard' : 'Sign up to post gigs'}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="provider@example.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <div className="form-group mb-4">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>
          
          <button type="submit" className="btn-primary mb-4" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="text-center" style={{ fontSize: '0.9rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button 
            type="button" 
            style={{ color: 'var(--primary)', padding: 0 }} 
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
        
        {/* Mock user bypass button for testing without Firebase creds */}
        <div className="text-center mt-4 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
             <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>For testing (bypasses Firebase Auth):</p>
             <button className="btn-secondary mt-2" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }} onClick={() => navigate('/dashboard')}>
                 Bypass to Dashboard
             </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
