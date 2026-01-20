
import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Shield, Globe, BarChart3, Code, Users, ArrowRight, Play, Cpu, Box, Layers, Bot } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
  onDemo: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onDemo }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="overflow-hidden bg-black">
      {/* 3D Background Decoration */}
      <div className="fixed inset-0 pointer-events-none opacity-20 overflow-hidden">
         <div 
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-purple-600/30 blur-[150px] rounded-full animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        ></div>
        <div 
          className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-pink-600/20 blur-[180px] rounded-full"
          style={{ transform: `translateY(${-scrollY * 0.05}px)` }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 md:pt-56 md:pb-48">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 mb-10 px-6 py-3 bg-purple-500/10 border border-purple-500/20 rounded-full backdrop-blur-md animate-bounce-slow">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 font-bold text-sm tracking-widest uppercase">The Future is Here</span>
          </div>

          <div className="relative group mb-12">
             <h1 className="text-6xl md:text-9xl font-black mb-8 leading-tight tracking-tighter">
              <span className="bg-gradient-to-b from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
                Experience
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                Intelligent AI
              </span>
            </h1>
            
            {/* 3D Floating Elements around Title */}
            <div className="absolute -top-10 -left-10 md:-left-20 w-32 h-32 md:w-48 md:h-48 bg-white/5 backdrop-blur-lg border border-white/10 rounded-[2rem] rotate-12 flex items-center justify-center animate-float-slow hidden md:flex">
                <Box className="w-16 h-16 text-purple-400/50" />
            </div>
            <div className="absolute top-20 -right-10 md:-right-20 w-24 h-24 md:w-36 md:h-36 bg-purple-500/10 backdrop-blur-lg border border-purple-500/20 rounded-full -rotate-12 flex items-center justify-center animate-float-delayed hidden md:flex">
                <Cpu className="w-12 h-12 text-pink-400/50" />
            </div>
          </div>

          <p className="text-xl md:text-3xl text-gray-400 mb-16 max-w-5xl mx-auto leading-relaxed font-light">
            Dora AI isn't just a chatbot. It's an autonomous <span className="text-white font-medium">customer satisfaction engine</span> 
            engineered to learn your business in real-time.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-32">
            <button 
              onClick={onStart}
              className="group relative px-12 py-6 bg-white text-black rounded-full font-black text-2xl hover:bg-purple-600 hover:text-white transition-all transform hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <span className="relative z-10 flex items-center">
                Start Growing Free
                <ArrowRight className="ml-3 w-7 h-7 group-hover:translate-x-2 transition" />
              </span>
            </button>
            <button 
              onClick={onDemo}
              className="px-12 py-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full font-black text-2xl hover:bg-white/10 transition-all flex items-center"
            >
              <Play className="mr-4 w-7 h-7 fill-current" />
              Watch Live Demo
            </button>
          </div>

          {/* Interactive 3D Perspective Grid */}
          <div className="perspective-1000 rotate-x-12 mt-20">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                {[
                  { icon: <Layers />, label: "Omnichannel Deployment", val: "Instant", col: "purple" },
                  { icon: <Cpu />, label: "Gemini 3 Pro Engine", val: "Neural", col: "pink" },
                  { icon: <Users />, label: "Human Hybrid Logic", val: "Seamless", col: "blue" }
                ].map((item, i) => (
                  <div key={i} className="group relative p-12 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-2xl border border-white/10 rounded-[3rem] hover:border-purple-500/50 transition-all transform hover:-translate-z-10 hover:shadow-[0_40px_100px_rgba(168,85,247,0.15)] overflow-hidden">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-${item.col}-500/10 rounded-full blur-3xl group-hover:opacity-100 opacity-0 transition`}></div>
                    <div className="mb-8 w-20 h-20 bg-black/50 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-110 transition">
                      {/* Explicitly casting to React.ReactElement<any> to allow dynamic className injection */}
                      {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-10 h-10 text-white" })}
                    </div>
                    <div className="text-4xl font-black mb-2">{item.val}</div>
                    <div className="text-gray-400 font-bold uppercase tracking-widest text-sm">{item.label}</div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Trust by HB Tech Banner */}
      <section className="py-20 bg-white/5 border-y border-white/5 backdrop-blur-sm overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center space-x-12 px-12">
               <span className="text-3xl font-black text-white/20">HB TECH POWERED</span>
               <Bot className="w-8 h-8 text-white/10" />
               <span className="text-3xl font-black text-white/20">REVOLUTIONARY AI</span>
               <Sparkles className="w-8 h-8 text-white/10" />
               <span className="text-3xl font-black text-white/20">DORA ECOSYSTEM</span>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Grids with 3D Interaction */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-20 mb-40">
            <div className="md:w-1/2 space-y-8">
              <h2 className="text-5xl md:text-7xl font-black leading-tight">
                Built by <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">HB Tech Experts</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                Our agency specializes in bleeding-edge AI integrations. Dora is our flagship platform designed to eliminate customer wait times and maximize conversions through emotional intelligence.
              </p>
              <ul className="space-y-4">
                {["99.9% Uptime SLA", "256-bit Document Encryption", "Custom Neural Training"].map((f, i) => (
                   <li key={i} className="flex items-center space-x-4 text-white font-bold">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                         <Zap className="w-4 h-4" />
                      </div>
                      <span>{f}</span>
                   </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 relative">
               {/* 3D Visual Representation */}
               <div className="relative w-full aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-[4rem] border border-white/10 flex items-center justify-center group overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
                  <div className="relative z-10 w-64 h-64 bg-black rounded-full border-4 border-purple-500/30 flex items-center justify-center animate-spin-slow group-hover:border-purple-500 transition-colors">
                     <Bot className="w-32 h-32 text-purple-400" />
                  </div>
                  {/* Floating particles simulated with divs */}
                  <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white rounded-full animate-float-slow"></div>
                  <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-purple-500 rounded-full animate-float-delayed"></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA with deep gradient */}
      <section className="py-48 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-black"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-6xl md:text-8xl font-black mb-12 tracking-tight">Scale your <span className="text-purple-400">Success</span></h2>
          <button 
            onClick={onStart}
            className="px-20 py-8 bg-white text-black rounded-full font-black text-3xl hover:bg-purple-500 hover:text-white transition-all transform hover:scale-110 shadow-[0_0_50px_rgba(255,255,255,0.2)]"
          >
            Launch with HB Tech
          </button>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50% { transform: translateY(-20px) rotate(15deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(-12deg); }
          50% { transform: translateY(20px) rotate(-15deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
        .animate-marquee { display: flex; animation: marquee 30s linear infinite; }
        .perspective-1000 { perspective: 1000px; }
        .rotate-x-12 { transform: rotateX(12deg); }
        .animate-bounce-slow { animation: bounce 4s infinite; }
      `}} />
    </div>
  );
};

export default LandingPage;
