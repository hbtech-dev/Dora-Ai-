
import React, { useState, useEffect } from 'react';
import { Bot, Menu, X, Github, Twitter, Linkedin } from 'lucide-react';
import LandingPage from './components/LandingPage';
import PricingPage from './components/PricingPage';
import DemoPage from './components/DemoPage';
import Dashboard from './components/Dashboard';
import AuthModal from './components/AuthModal';
import DocsPage from './components/DocsPage';
import ContactPage from './components/ContactPage';
import { Page, User } from './types';

const NeuralCelebration = () => {
  return (
    <div className="fixed top-[40px] left-[150px] pointer-events-none z-[60]">
      {[...Array(40)].map((_, i) => {
        const angle = (i / 40) * Math.PI * 2;
        const velocity = 100 + Math.random() * 300;
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity;
        const duration = 0.5 + Math.random() * 1;
        const size = 4 + Math.random() * 8;
        const color = i % 2 === 0 ? '#A855F7' : '#EC4899'; // Purple or Pink

        return (
          <div
            key={i}
            className="absolute rounded-full animate-neural-spark"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              boxShadow: `0 0 15px ${color}`,
              '--tw-translate-x': `${x}px`,
              '--tw-translate-y': `${y}px`,
              '--spark-duration': `${duration}s`
            } as any}
          />
        );
      })}
    </div>
  );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showCelebration, setShowCelebration] = useState(false);

  const handleLogoClick = () => {
    setCurrentPage('landing');
    setShowCelebration(true);
    setTimeout(() => {
      setShowCelebration(false);
    }, 1500);
  };

  const handleAuth = (email: string, name?: string) => {
    setUser({ 
      name: name || email.split('@')[0], 
      email, 
      plan: 'starter' 
    });
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCurrentPage('landing');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    if (showAuthModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showAuthModal]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      {showCelebration && <NeuralCelebration />}
      {showAuthModal && (
        <AuthModal 
          mode={authMode} 
          onClose={() => setShowAuthModal(false)} 
          onSuccess={handleAuth}
          onToggleMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
        />
      )}
      
      {currentPage !== 'dashboard' && (
        <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={handleLogoClick}
            >
              <div className="relative preserve-3d">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-50 animate-pulse group-hover:opacity-80 transition"></div>
                <div className="relative w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  <Bot className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
                Dora
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => setCurrentPage('landing')} className={`hover:text-purple-400 transition ${currentPage === 'landing' ? 'text-purple-400' : ''}`}>Home</button>
              <button onClick={() => setCurrentPage('demo')} className={`hover:text-purple-400 transition ${currentPage === 'demo' ? 'text-purple-400' : ''}`}>Try Demo</button>
              <button onClick={() => setCurrentPage('pricing')} className={`hover:text-purple-400 transition ${currentPage === 'pricing' ? 'text-purple-400' : ''}`}>Pricing</button>
              <button onClick={() => setCurrentPage('docs')} className={`hover:text-purple-400 transition ${currentPage === 'docs' ? 'text-purple-400' : ''}`}>Docs</button>
              <button onClick={() => setCurrentPage('contact')} className={`hover:text-purple-400 transition ${currentPage === 'contact' ? 'text-purple-400' : ''}`}>Contact</button>
              {isLoggedIn ? (
                <button 
                  onClick={() => setCurrentPage('dashboard')}
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition font-medium"
                >
                  Dashboard
                </button>
              ) : (
                <button 
                  onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition font-medium"
                >
                  Login
                </button>
              )}
            </div>

            <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="md:hidden">
              {showMobileMenu ? <X /> : <Menu />}
            </button>
          </div>

          {showMobileMenu && (
            <div className="md:hidden bg-black border-b border-gray-800 p-6 space-y-4">
              <button onClick={() => { setCurrentPage('landing'); setShowMobileMenu(false); }} className="block w-full text-left text-lg py-2 hover:text-purple-400 transition">Home</button>
              <button onClick={() => { setCurrentPage('demo'); setShowMobileMenu(false); }} className="block w-full text-left text-lg py-2 hover:text-purple-400 transition">Try Demo</button>
              <button onClick={() => { setCurrentPage('pricing'); setShowMobileMenu(false); }} className="block w-full text-left text-lg py-2 hover:text-purple-400 transition">Pricing</button>
              <button onClick={() => { setCurrentPage('docs'); setShowMobileMenu(false); }} className="block w-full text-left text-lg py-2 hover:text-purple-400 transition">Docs</button>
              <button onClick={() => { setCurrentPage('contact'); setShowMobileMenu(false); }} className="block w-full text-left text-lg py-2 hover:text-purple-400 transition">Contact</button>
              <button onClick={() => { setShowAuthModal(true); setShowMobileMenu(false); }} className="block w-full text-left text-lg py-2 hover:text-purple-400 transition">Login</button>
            </div>
          )}
        </nav>
      )}

      <main>
        {currentPage === 'landing' && (
          <LandingPage 
            onStart={() => { setAuthMode('signup'); setShowAuthModal(true); }} 
            onDemo={() => setCurrentPage('demo')} 
            onPricing={() => setCurrentPage('pricing')}
          />
        )}
        {currentPage === 'pricing' && (
          <PricingPage 
            isLoggedIn={isLoggedIn} 
            onSelect={() => isLoggedIn ? setCurrentPage('dashboard') : setShowAuthModal(true)} 
          />
        )}
        {currentPage === 'demo' && <DemoPage onGetStarted={() => setCurrentPage('pricing')} />}
        {currentPage === 'docs' && <DocsPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'dashboard' && isLoggedIn && user && (
          <Dashboard 
            user={user} 
            onLogout={handleLogout} 
            onUpgrade={() => setCurrentPage('pricing')} 
          />
        )}
      </main>

      {currentPage !== 'dashboard' && (
        <footer className="bg-black border-t border-gray-800 py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-1 md:col-span-1">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Dora AI</span>
                </div>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Empowering businesses with intelligent Gemini-powered chatbots. Created by experts for growth.
                </p>
                <div className="flex space-x-4">
                  <Github className="w-6 h-6 text-gray-500 hover:text-white cursor-pointer" />
                  <Twitter className="w-6 h-6 text-gray-500 hover:text-white cursor-pointer" />
                  <Linkedin className="w-6 h-6 text-gray-500 hover:text-white cursor-pointer" />
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-6">Product</h4>
                <ul className="space-y-4 text-gray-400">
                  <li onClick={() => setCurrentPage('demo')} className="hover:text-purple-400 cursor-pointer">Live Demo</li>
                  <li onClick={() => setCurrentPage('pricing')} className="hover:text-purple-400 cursor-pointer">Pricing</li>
                  <li className="hover:text-purple-400 cursor-pointer">Releases</li>
                  <li className="hover:text-purple-400 cursor-pointer">Beta Program</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6">Resources</h4>
                <ul className="space-y-4 text-gray-400">
                  <li onClick={() => setCurrentPage('docs')} className="hover:text-purple-400 cursor-pointer">Documentation</li>
                  <li className="hover:text-purple-400 cursor-pointer">API Reference</li>
                  <li className="hover:text-purple-400 cursor-pointer">Community</li>
                  <li onClick={() => setCurrentPage('contact')} className="hover:text-purple-400 cursor-pointer">Support</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6">Company</h4>
                <ul className="space-y-4 text-gray-400">
                  <li className="hover:text-purple-400 cursor-pointer">About Us</li>
                  <li className="hover:text-purple-400 cursor-pointer">Blog</li>
                  <li className="hover:text-purple-400 cursor-pointer">Privacy</li>
                  <li className="hover:text-purple-400 cursor-pointer">Terms</li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
              <div>© {new Date().getFullYear()} Dora AI. All rights reserved.</div>
              <div className="mt-4 md:mt-0 font-medium">
                Designed & Developed by <a href="https://www.hbhouse.space" target="_blank" rel="noopener noreferrer" className="text-purple-400 font-bold hover:underline">HB Tech</a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
