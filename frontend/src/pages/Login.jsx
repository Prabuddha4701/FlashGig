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
    <div className="animate-fade-in py-20 px-4 max-w-md mx-auto">
      <div className="glass-panel bg-sky-800/80 p-10 ">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold mb-2 tracking-tight">
            {isLogin ? 'Provider Login' : 'Become a Provider'}
          </h2>
          <p className="text-text-muted text-sm">
            {isLogin ? 'Access your dashboard' : 'Sign up to post gigs'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-muted uppercase tracking-widest text-white">Email Address</label>
            <input 
              className="form-input"
              type="email" 
              placeholder="provider@example.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <div className="space-y-2 mb-8">
            <label className="text-xs font-bold text-text-muted uppercase tracking-widest text-white">Password</label>
            <input 
              className="form-input"
              type="password" 
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>
          
          <button type="submit" className="btn-primary w-full py-4 text-lg font-bold " disabled={loading}>
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="text-center mt-8 text-sm">
          <span className="text-text-muted">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button 
            type="button" 
            className=" font-semibold hover:underline ml-1"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
        
        {/* Mock user bypass button for testing */}
        <div className="text-center mt-10 pt-8 border-t border-border-color">
             <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-muted mb-4 opacity-70">Internal Testing Tools</p>
             <button 
                className="btn-secondary !px-6 !py-2.5 !text-xs !bg-slate-900 shadow-sm border-white/10 hover:border-primary/50 transition-all flex items-center gap-2 mx-auto" 
                onClick={() => navigate('/dashboard')}
              >
                  <span>⚡</span> Bypass to Dashboard
              </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
