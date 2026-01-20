
import React, { useState } from 'react';
import { X, Mail, Lock, User, Bot, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  mode: 'login' | 'signup';
  onClose: () => void;
  onSuccess: (email: string, name?: string) => void;
  onToggleMode: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onSuccess, onToggleMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onSuccess(email, name);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative bg-[#0A0A0A] border border-purple-500/20 rounded-[3rem] p-12 max-w-lg w-full shadow-2xl overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-3 hover:bg-white/5 rounded-2xl transition"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl transform rotate-3">
            <Bot className="w-10 h-10" />
          </div>
          <h2 className="text-4xl font-black mb-3">
            {mode === 'login' ? 'Welcome Back' : 'Join Dora'}
          </h2>
          <p className="text-gray-400 text-lg">
            {mode === 'login' ? 'Continue your AI journey' : 'Start building your future today'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'signup' && (
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-gray-500 ml-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-3xl pl-16 pr-8 py-5 text-lg focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-gray-500 ml-2">Work Email</label>
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-white/5 border border-white/10 rounded-3xl pl-16 pr-8 py-5 text-lg focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-gray-500 ml-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-3xl pl-16 pr-8 py-5 text-lg focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl font-black text-xl hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center group"
          >
            {mode === 'login' ? 'Launch Dashboard' : 'Create My Account'}
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition" />
          </button>
        </form>

        <div className="mt-10 text-center">
          <button 
            onClick={onToggleMode}
            className="text-gray-400 hover:text-purple-400 transition font-bold text-lg"
          >
            {mode === 'login' 
              ? "New here? Create an account →" 
              : "Already have an account? Login →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
