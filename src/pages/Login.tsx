import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Welcome back, " + data.user.username);
        // Store user info in the browser so we remember them
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/'); // Go to home page
      } else {
        alert("Login failed: " + data.error);
      }
    } catch (error) {
      alert("Backend server is not responding.");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 md:p-0">
      <div className="max-w-5xl w-full grid md:grid-cols-2 bg-[#0f172a] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5">
        
        {/* LEFT SIDE: VISUAL (Keep your existing image code here) */}

        {/* RIGHT SIDE: FORM */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">Login</h1>
            <p className="text-slate-400 text-sm">Enter your credentials to access your fleet.</p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-[#1e293b] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Password</label>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#1e293b] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all"
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-600/20">
              Sign In
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-slate-400">
            Don't have an account? {' '}
            <Link to="/signup" className="text-blue-500 font-bold hover:underline">Register now</Link>
          </p>
        </div>
      </div>
    </div>
  );
}