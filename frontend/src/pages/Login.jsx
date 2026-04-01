import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import toast from 'react-hot-toast'

export default function Login() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    if (!formData.email || !formData.password) { toast.error('Fill in all fields.'); return }
    setLoading(true)
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password)
        toast.success('Welcome back! 👋')
      } else {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password)
        toast.success('Account created! 🎉')
      }
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.message || 'Authentication error.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100svh-64px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo + title */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 justify-center mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #5b21b6)' }}>
              UG
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: 'var(--text)' }}>UniGig</span>
          </Link>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, color: 'var(--text)', marginBottom: 6 }}>
            {isLogin ? 'Provider Sign In' : 'Create Account'}
          </h1>
          <p style={{ fontSize: 13, color: 'var(--muted)' }}>
            {isLogin ? 'Access your dashboard to manage gigs' : 'Sign up to start posting tasks'}
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border p-8" style={{ background: 'var(--surface)', borderColor: 'var(--border)', borderTop: '3px solid var(--color-brand)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label className="label">Email Address</label>
              <input className="input" type="email" placeholder="you@university.edu"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input className="input" type="password" placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <button type="submit" className="btn-primary w-full py-3 text-base mt-1" disabled={loading}>
              {loading ? <><span className="spinner" /> Processing…</> : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div className="text-center mt-5" style={{ fontSize: 13, color: 'var(--muted)' }}>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              className="font-semibold ml-1"
              style={{ color: 'var(--color-brand-light)', background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => setIsLogin(l => !l)}
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
