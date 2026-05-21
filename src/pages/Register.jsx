import { GoogleLogin } from '@react-oauth/google';
import { ArrowRight, Image, Lock, Mail, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { registerUser, googleLoginUser, user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'StudyNook | Register';
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const validatePassword = (pwd) => {
    if (pwd.length < 6) return 'Password must be at least 6 characters long';
    if (!/[A-Z]/.test(pwd)) return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(pwd)) return 'Password must contain at least one lowercase letter';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!name || !email || !photoUrl || !password) {
      setErrorMsg('Please fill in all fields');
      return;
    }
    const validationError = validatePassword(password);
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }
    setLoading(true);
    const success = await registerUser(name, email, photoUrl, password);
    setLoading(false);
    if (success) {
      navigate('/login');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    const idToken = credentialResponse?.credential;
    if (!idToken) {
      toast.error('Google authentication failed');
      setLoading(false);
      return;
    }
    const success = await googleLoginUser(idToken);
    setLoading(false);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-[#09090B] flex items-center justify-center p-4 font-['Space_Grotesk',_sans-serif]">
      <div className="max-w-4xl w-full flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-12">

        <div className="max-w-md w-full bg-white dark:bg-[#09090B] md:border-r border-slate-200 dark:border-[#3F3F46] p-8 space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-950 dark:text-white">
              Create Account
            </h2>
          </div>

          {errorMsg && (
            <div className="border border-red-600 text-red-600 text-xs font-bold p-4 bg-red-50 dark:bg-red-950/20">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-500 font-sans">Full name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-950 dark:text-white absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Kawsar Ahmed"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 bg-slate-50 dark:bg-[#18181B] text-sm font-medium font-sans focus:outline-none dark:text-white dark:border-[#3F3F46]"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-500 font-sans">Email address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-950 dark:text-white absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="user@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 bg-slate-50 dark:bg-[#18181B] text-sm font-medium font-sans focus:outline-none dark:text-white dark:border-[#3F3F46]"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-500 font-sans">Photo URL</label>
                <button
                  type="button"
                  onClick={() => setPhotoUrl('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80')}
                  className="text-[10px] font-bold text-[#EAB308] underline font-sans"
                >
                  Use sample
                </button>
              </div>
              <div className="relative">
                <Image className="w-4 h-4 text-slate-950 dark:text-white absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  placeholder="https://example.com/avatar.jpg"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 bg-slate-50 dark:bg-[#18181B] text-sm font-medium font-sans focus:outline-none dark:text-white dark:border-[#3F3F46]"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-500 font-sans">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-950 dark:text-white absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="••••••••••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 bg-slate-50 dark:bg-[#18181B] text-sm font-medium font-sans focus:outline-none dark:text-white dark:border-[#3F3F46]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 flex items-center justify-center gap-2 bg-[#DFE104] text-slate-950 font-black uppercase border border-slate-200 hover:bg-slate-950 hover:text-white transition-all duration-150"
            >
              <span>Register</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-[#3F3F46]"></div>
            </div>
            <span className="relative flex justify-center bg-white dark:bg-[#09090B] px-3 text-xs font-bold text-slate-500 font-sans">
              Or continue with
            </span>
          </div>

          <div className="w-full [&>div]:w-full [&>div>div]:w-full">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error('Google sign-in failed')}
              size="large"
            />
          </div>
          <p className="text-center text-xs font-bold text-slate-500 font-sans">
            Already have an account?{' '}
            <Link to="/login" className="text-[#EAB308] dark:text-[#DFE104] hover:text-slate-950 dark:hover:text-white">
              Login
            </Link>
          </p>
        </div>

        <div className="w-[280px] h-[280px] md:w-[400px] md:h-[400px] shrink-0">
          <img
            src="/register.svg"
            alt="Register Illustration"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;