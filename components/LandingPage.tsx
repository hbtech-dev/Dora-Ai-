
import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Zap, Shield, Globe, BarChart3, Code, Users, ArrowRight, Play, Cpu, Box, Layers, Bot, Star, Command, Hash, TrendingUp, Trophy, Check, UserPlus, Activity } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
  onDemo: () => void;
}

const FastChat3DCard = () => {
  const messages = [
    { role: 'user', text: "How fast is Dora?" },
    { role: 'bot', text: "0.4s response time." },
    { role: 'user', text: "Handle 10k users?" },
    { role: 'bot', text: "Easily. Scaling now." },
    { role: 'user', text: "Neural context?" },
    { role: 'bot', text: "Deep intent analysis." },
  ];

  return (
    <div className="group absolute top-0 left-[2%] md:left-[5%] xl:left-[10%] w-60 h-72 glass-module rounded-[2rem] p-5 -rotate-6 animate-float hidden lg:block perspective-2000 shadow-[20px_20px_50px_rgba(0,0,0,0.5)] border border-white/20 transform-gpu preserve-3d transition-transform duration-500 hover:scale-105">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Bot Logic active</span>
        </div>
        <Zap className="w-3 h-3 text-yellow-400" />
      </div>
      <div className="h-[calc(100%-3rem)] overflow-hidden relative">
        <div className="animate-chat-scroll group-hover:animate-chat-scroll-fast flex flex-col gap-3 transition-all duration-300">
          {[...messages, ...messages].map((msg, i) => (
            <div 
              key={i} 
              className={`max-w-[90%] rounded-xl px-3 py-2 text-[10px] font-medium leading-tight shadow-lg ${
                msg.role === 'user' 
                  ? 'bg-purple-600/90 text-white self-end rounded-br-none translate-z-10' 
                  : 'bg-white/10 border border-white/10 text-gray-200 self-start rounded-bl-none backdrop-blur-md'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onDemo }) => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Intersection Observer for Scroll Animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <div className="overflow-hidden bg-black min-h-screen text-white">
      {/* 3D Moving Background */}
      <div className="fixed inset-0 pointer-events-none">
         <div 
          className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] bg-purple-600/20 blur-[150px] rounded-full animate-float-slow"
          style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }}
        ></div>
        <div 
          className="absolute top-[20%] -right-[10%] w-[50vw] h-[50vw] bg-blue-600/10 blur-[130px] rounded-full animate-float-delayed"
          style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }}
        ></div>
        <div 
          className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] bg-pink-600/10 blur-[180px] rounded-full"
          style={{ transform: `translateY(${-scrollY * 0.2}px)` }}
        ></div>
      </div>

      {/* Hero Section with 3D Tilt */}
      <section 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 perspective-1000"
      >
        <div 
          className="container mx-auto text-center relative z-10 transition-transform duration-100 ease-out preserve-3d"
          style={{
            transform: `rotateX(${mousePos.y * 10}deg) rotateY(${mousePos.x * 10}deg)`
          }}
        >
          <div className="inline-flex items-center space-x-2 mb-10 px-6 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md animate-pulse-glow hover:bg-white/10 transition cursor-pointer group">
            <Sparkles className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition" />
            <span className="text-purple-300 font-bold text-sm tracking-widest uppercase bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Dora AI 2.0 is Live</span>
          </div>

          <div className="relative mb-8 lg:mb-12">
             <h1 className="text-4xl sm:text-6xl md:text-[8rem] font-black leading-none tracking-tighter mb-6 relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500 reveal">
              Chatbot
              <br />
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">Intelligence</span>
            </h1>
            
            {/* Floating 3D Icons */}
            <FastChat3DCard />
            <div className="absolute top-0 right-[12%] w-16 h-16 lg:w-20 lg:h-20 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl lg:rounded-3xl rotate-12 animate-float-low hidden md:flex items-center justify-center transform hover:scale-110 transition cursor-pointer box-shadow-glow">
                <Bot className="w-8 h-8 lg:w-10 lg:h-10 text-purple-400" />
            </div>
            <div className="absolute bottom-0 right-[15%] w-16 h-16 lg:w-20 lg:h-20 bg-white/5 backdrop-blur-md border border-white/10 rounded-full -rotate-12 animate-float-delayed hidden md:flex items-center justify-center transform hover:scale-110 transition cursor-pointer box-shadow-glow">
                <Cpu className="w-8 h-8 lg:w-10 lg:h-10 text-pink-400" />
            </div>
          </div>

          <p className="text-lg lg:text-2xl text-gray-400 mb-10 lg:mb-16 max-w-3xl mx-auto leading-relaxed font-light reveal delay-100 px-4 sm:px-0">
            Automate <span className="text-white font-medium neon-text">98% of support</span> with a neural engine that understands context, emotion, and intent.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center reveal delay-200">
            <button 
              onClick={onStart}
              className="group relative px-10 py-5 bg-white text-black rounded-full font-bold text-xl hover:bg-purple-500 hover:text-white transition-all transform hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <span className="relative z-10 flex items-center">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
              </span>
            </button>
            <button 
              onClick={onDemo}
              className="px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full font-bold text-xl hover:bg-white/10 transition-all flex items-center group"
            >
              <Play className="mr-3 w-5 h-5 fill-current group-hover:scale-110 transition" />
              Watch Demo
            </button>
          </div>

          {/* 3D Dashboard Preview */}
          <div className="mt-20 relative max-w-5xl mx-auto reveal delay-300 group">
             <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
             <div className="relative bg-[#0A0A0A] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl transform transition-transform duration-700 hover:scale-[1.02] hover:-translate-y-2">
                <div className="h-12 bg-white/5 border-b border-white/10 flex items-center px-6 gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                   <div className="ml-4 px-4 py-1 bg-black/50 rounded-full text-xs text-gray-500 font-mono">dora.ai/dashboard</div>
                </div>
                <div className="relative h-[250px] md:h-[320px] overflow-hidden">
                   <img 
                    src="/dashboard-preview.png" 
                    alt="Dora AI Dashboard Preview" 
                    className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition duration-700 block"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent"></div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Infinite Marquee */}
      <section className="py-12 bg-white/5 border-y border-white/5 backdrop-blur-sm overflow-hidden mb-12 lg:mb-32 rotate-1 scale-105">
        <div className="flex whitespace-nowrap animate-marquee-ltr">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center space-x-16 px-16 opacity-50 grayscale hover:grayscale-0 transition duration-500">
               <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">MICROSOFT</span>
               <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">GOOGLE</span>
               <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">TESLA</span>
               <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">AMAZON</span>
            </div>
          ))}
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-20 relative px-6">
         <div className="container mx-auto">
            <h2 className="text-4xl lg:text-7xl font-black mb-12 lg:mb-20 text-center reveal leading-[1.1]">
              <span className="text-gray-500">Why</span> Leaders <span className="text-purple-400">Choose Dora</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
               <div className="md:col-span-2 glass-panel rounded-[2rem] lg:rounded-[3rem] p-8 lg:p-12 relative overflow-hidden group reveal">
                  <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-30 transition transform group-hover:scale-110 duration-700 hidden sm:block">
                     <Command className="w-64 h-64 text-purple-500" />
                  </div>
                  <div className="relative z-10">
                     <div className="w-12 h-12 lg:w-16 lg:h-16 bg-purple-500/20 rounded-xl lg:rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md">
                        <Zap className="w-6 h-6 lg:w-8 lg:h-8 text-purple-400" />
                     </div>
                     <h3 className="text-2xl lg:text-4xl font-bold mb-4">Instant Neural Processing</h3>
                     <p className="text-lg lg:text-xl text-gray-400 max-w-md">Our Gemini-powered engine processes intent in &lt;100ms, faster than human perception.</p>
                  </div>
               </div>

               <div className="md:col-span-1 glass-panel rounded-[2rem] lg:rounded-[3rem] p-8 lg:p-12 flex flex-col justify-between group reveal delay-100">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-pink-500/20 rounded-xl lg:rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md">
                     <Shield className="w-6 h-6 lg:w-8 lg:h-8 text-pink-400" />
                  </div>
                  <div>
                     <h3 className="text-2xl lg:text-3xl font-bold mb-4">Enterprise Secure</h3>
                     <p className="text-gray-400">SOC2 Type II certified with end-to-end encryption for all data streams.</p>
                  </div>
               </div>

               <div className="md:col-span-1 glass-panel rounded-[2rem] lg:rounded-[3rem] p-8 lg:p-12 group reveal delay-200">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-500/20 rounded-xl lg:rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md">
                     <Globe className="w-6 h-6 lg:w-8 lg:h-8 text-blue-400" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4">Multilingual</h3>
                  <p className="text-gray-400">Native fluency in 95+ languages without external translation APIs.</p>
               </div>

               <div className="md:col-span-2 glass-panel rounded-[2rem] lg:rounded-[3rem] p-8 lg:p-12 flex items-center relative overflow-hidden group reveal delay-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative z-10 w-full">
                     <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                           <div className="w-12 h-12 lg:w-16 lg:h-16 bg-green-500/20 rounded-xl lg:rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md">
                              <BarChart3 className="w-6 h-6 lg:w-8 lg:h-8 text-green-400" />
                           </div>
                           <h3 className="text-2xl lg:text-4xl font-bold mb-4">Actionable Analytics</h3>
                           <p className="text-lg lg:text-xl text-gray-400 max-w-md">Real-time sentiment analysis and conversation drop-off heatmaps.</p>
                        </div>
                        <div className="bg-black/40 p-6 rounded-2xl border border-white/10 w-full md:w-64 backdrop-blur-sm transform md:rotate-3 group-hover:rotate-0 transition duration-500">
                           <div className="flex justify-between mb-4">
                              <span className="text-gray-400">Conversion</span>
                              <span className="text-green-400 font-bold">+142%</span>
                           </div>
                           <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                              <div className="bg-green-500 h-full w-[80%]"></div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Code Snippet Section */}
      <section className="py-20 lg:py-32 px-6">
        <div className="container mx-auto">
          <div className="glass-panel max-w-5xl mx-auto rounded-[2rem] lg:rounded-[3rem] overflow-hidden border border-white/10 reveal">
             <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 lg:p-20 flex flex-col justify-center">
                   <h2 className="text-3xl lg:text-5xl font-black mb-6">Drop-in <br /><span className="text-purple-400">Integration</span></h2>
                   <p className="text-gray-400 text-base lg:text-lg mb-8">Add Dora to your site in 30 seconds. Works with React, Vue, HTML, and more.</p>
                   <div className="flex flex-wrap items-center gap-3">
                      {['React', 'Vue', 'Next.js', 'WordPress'].map((tech) => (
                         <span key={tech} className="px-4 py-2 bg-white/5 rounded-full text-[10px] lg:text-xs font-bold text-gray-400 border border-white/5">{tech}</span>
                      ))}
                   </div>
                </div>
                <div className="bg-[#050505] p-8 lg:p-12 font-mono text-[10px] lg:text-sm overflow-hidden relative group">
                   <div className="absolute top-4 right-4 flex space-x-2">
                      <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-red-500/20"></div>
                      <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-yellow-500/20"></div>
                   </div>
                   <div className="text-gray-500 mb-2">// Initialize Dora AI</div>
                   <div className="text-purple-400">import</div> <span className="text-white">{`{ Dora }`}</span> <span className="text-purple-400">from</span> <span className="text-green-400">'@dora-ai/client'</span>;
                   <br /><br />
                   <div className="text-purple-400">const</div> <span className="text-blue-400">bot</span> = <span className="text-purple-400">new</span> <span className="text-yellow-400">Dora</span>({`{`}
                   <br />
                   &nbsp;&nbsp;<span className="text-white">apiKey:</span> <span className="text-green-400">'dk_live_5928...'</span>,
                   <br />
                   &nbsp;&nbsp;<span className="text-white">theme:</span> <span className="text-green-400">'dark'</span>,
                   <br />
                   &nbsp;&nbsp;<span className="text-white">personality:</span> <span className="text-green-400">'professional'</span>
                   <br />
                   {`}`});
                   <br /><br />
                   <div className="text-gray-500">// Start conversation</div>
                   <span className="text-blue-400">bot</span>.<span className="text-yellow-400">mount</span>(<span className="text-green-400">'#root'</span>);

                   <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] group-hover:bg-purple-500/20 transition duration-1000"></div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section - The Visual Automation Matrix */}
      <section className="relative min-h-[auto] lg:min-h-screen flex items-center justify-center overflow-hidden py-20 lg:py-40">
        {/* Background Atmosphere - Transparent to show global background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vw] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1)_0%,transparent_70%)] animate-slow-spin"></div>
          
          {/* 3D Perspective Grid with smooth fade-in */}
          <div className="absolute inset-0 opacity-[0.15] hidden lg:block" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(168, 85, 247, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.4) 1px, transparent 1px)', 
              backgroundSize: '150px 150px', 
              transform: 'perspective(1500px) rotateX(60deg) translateY(-30%)',
              maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
            }}>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10 perspective-2000 preserve-3d">
          <div className="flex flex-col items-center">
            
            {/* Enlarged 3D Automation Architecture Visual */}
            <div className="relative w-full max-w-6xl h-auto lg:h-[700px] mb-20 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0 reveal">
               
               {/* Central Energy Core - Hidden on mobile, visible on LG */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:block">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500 rounded-full blur-[80px] animate-pulse"></div>
                  <div className="w-16 h-16 bg-white rounded-full relative z-10 shadow-[0_0_50px_#fff] flex items-center justify-center">
                     <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                     <div className="absolute inset-0 bg-purple-500 rounded-full animate-pulse-ring"></div>
                  </div>
               </div>

               {/* Segment 1: Revenue Dynamics (Enlarged) */}
               <div className="relative lg:absolute lg:top-[5%] lg:left-[0%] xl:left-[10%] w-full sm:w-[500px] lg:w-96 h-auto min-h-[220px] lg:h-56 glass-module rounded-[2rem] lg:rounded-[3rem] p-6 lg:p-8 animate-float shadow-2xl z-30 group cursor-pointer hover:scale-[1.02] lg:hover:scale-105 transition-all duration-500">
                  <div className="flex justify-between items-center mb-6">
                     <span className="text-sm font-black text-white/60 uppercase tracking-widest">Revenue Alpha</span>
                     <TrendingUp className="w-6 h-6 text-green-400 group-hover:rotate-12 transition-transform" />
                  </div>
                  <div className="h-24 w-full flex items-end gap-2 px-2">
                     {[30, 60, 40, 100, 70, 90, 80, 120].map((h, i) => (
                        <div 
                          key={i} 
                          className="flex-1 bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-sm lg:rounded-t-lg transition-all duration-700" 
                          style={{ height: `${(h/120)*100}%`, opacity: 0.4 + (i * 0.08) }}
                        ></div>
                     ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between overflow-hidden">
                     <span className="text-xl lg:text-2xl font-black text-white">$142,850.00</span>
                     <div className="relative h-6 w-16 overflow-hidden">
                        <span className="absolute inset-0 text-xs text-green-400 font-black transition-all duration-500 group-hover:-translate-y-full">+22%</span>
                        <span className="absolute inset-0 text-xs text-green-400 font-black translate-y-full transition-all duration-500 group-hover:translate-y-0">+100%</span>
                     </div>
                  </div>
               </div>

               {/* Segment 2: Customer Influx (Enlarged) */}
               <div className="relative lg:absolute lg:top-[5%] lg:right-[0%] xl:right-[10%] w-full sm:w-[500px] lg:w-96 h-auto min-h-[220px] lg:h-56 glass-module rounded-[2rem] lg:rounded-[3rem] p-6 lg:p-8 animate-float [animation-delay:1s] shadow-2xl z-30 group cursor-pointer hover:scale-[1.02] lg:hover:scale-105 transition-all duration-500">
                  <div className="flex justify-between items-center mb-8">
                     <span className="text-sm font-black text-white/60 uppercase tracking-widest">Network Expansion</span>
                     <Users className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex items-center justify-center gap-4 lg:gap-6 relative overflow-hidden h-16">
                     {[...Array(4)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl border border-white/20 bg-white/10 flex items-center justify-center shrink-0 transition-all duration-700"
                          style={{ 
                            animation: `client-flow var(--flow-speed, 4s) linear infinite`, 
                            animationDelay: `${i * 0.8}s`
                          }}
                        > 
                           <UserPlus className="w-5 h-5 lg:w-6 lg:h-6 text-purple-400" />
                        </div>
                     ))}
                  </div>
                  <style dangerouslySetInnerHTML={{ __html: `.group:hover { --flow-speed: 12s; }` }} />
                  <div className="mt-6 text-center">
                     <span className="text-xs lg:text-sm font-bold text-gray-400 tracking-wide">Flowing <span className="text-white group-hover:text-purple-400 transition-colors">842</span> agents / min</span>
                  </div>
               </div>

               {/* Segment 3: Logic Stream (Enlarged) */}
               <div className="relative lg:absolute lg:bottom-[0%] lg:left-[0%] xl:left-[5%] w-full sm:w-[500px] lg:w-[450px] h-auto min-h-[192px] lg:h-48 glass-module rounded-[2rem] lg:rounded-[3rem] p-6 lg:p-8 animate-float [animation-delay:2s] shadow-2xl z-30 group cursor-pointer hover:scale-[1.02] lg:hover:scale-105 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-6">
                     <Cpu className="w-6 h-6 text-blue-400 group-hover:rotate-90 transition-transform duration-700" />
                     <span className="text-sm font-black text-white/60 uppercase tracking-widest">Neural Sync</span>
                  </div>
                  <div className="space-y-4">
                     <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-gray-500">Core Processing</span>
                        <span className="text-[10px] text-blue-400 transition-all group-hover:text-white">92%</span>
                     </div>
                     <div className="h-2 lg:h-3 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 shimmer-bg transition-all duration-1000 ease-out" style={{ width: 'var(--sync-width-1, 92%)' }}></div>
                     </div>
                     <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-gray-500">Decision Matrix</span>
                        <span className="text-[10px] text-pink-400 transition-all group-hover:text-white">74%</span>
                     </div>
                     <div className="h-2 lg:h-3 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-pink-500 shimmer-bg transition-all duration-1000 ease-out" style={{ width: 'var(--sync-width-2, 74%)' }}></div>
                     </div>
                  </div>
                  <style dangerouslySetInnerHTML={{ __html: `.group:hover { --sync-width-1: 100%; --sync-width-2: 100%; }` }} />
               </div>

               {/* Segment 4: Optimization (Enlarged) */}
               <div className="relative lg:absolute lg:bottom-[0%] lg:right-[0%] xl:right-[5%] w-full sm:w-[500px] lg:w-[450px] h-auto min-h-[192px] lg:h-48 glass-module rounded-[2rem] lg:rounded-[3rem] p-6 lg:p-8 animate-float [animation-delay:1.5s] shadow-2xl z-30 group cursor-pointer hover:scale-[1.02] lg:hover:scale-105 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-8">
                     <Zap className="w-6 h-6 text-yellow-400 group-hover:scale-125 transition-transform" />
                     <span className="text-sm font-black text-white/60 uppercase tracking-widest group-hover:text-yellow-400 transition-colors">Performance Peak</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 lg:gap-6">
                     <div className="text-center p-3 lg:p-4 rounded-2xl lg:rounded-3xl bg-white/5 border border-white/5 group-hover:border-yellow-400/30 transition-colors">
                        <div className="text-[8px] lg:text-[10px] text-gray-500 uppercase mb-1">Response</div>
                        <div className="text-lg lg:text-xl font-black text-yellow-400 transition-all group-hover:scale-110">0.4s</div>
                     </div>
                     <div className="text-center p-3 lg:p-4 rounded-2xl lg:rounded-3xl bg-white/5 border border-white/5 group-hover:border-white/30 transition-colors">
                        <div className="text-[8px] lg:text-[10px] text-gray-500 uppercase mb-1">ROI</div>
                        <div className="text-lg lg:text-xl font-black text-white transition-all group-hover:scale-110">12x</div>
                     </div>
                     <div className="text-center p-3 lg:p-4 rounded-2xl lg:rounded-3xl bg-white/5 border border-white/5 group-hover:border-green-400/30 transition-colors">
                        <div className="text-[8px] lg:text-[10px] text-gray-500 uppercase mb-1">Uptime</div>
                        <div className="text-lg lg:text-xl font-black text-green-400 transition-all group-hover:scale-110">100%</div>
                     </div>
                  </div>
               </div>

                {/* Connection Lines - Hidden on tablets and mobile */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-40 hidden lg:block" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M 50 50 L 25 25" stroke="#A855F7" strokeWidth="0.5" strokeDasharray="2 1" fill="none" className="animate-[line-flow_10s_linear_infinite]" />
                  <path d="M 50 50 L 75 25" stroke="#A855F7" strokeWidth="0.5" strokeDasharray="2 1" fill="none" className="animate-[line-flow_10s_linear_infinite] [animation-delay:2s]" />
                  <path d="M 50 50 L 20 85" stroke="#A855F7" strokeWidth="0.5" strokeDasharray="2 1" fill="none" className="animate-[line-flow_10s_linear_infinite] [animation-delay:4s]" />
                  <path d="M 50 50 L 80 85" stroke="#A855F7" strokeWidth="0.5" strokeDasharray="2 1" fill="none" className="animate-[line-flow_10s_linear_infinite] [animation-delay:1s]" />
               </svg>
            </div>

            {/* Pricing Plans Button */}
            <div className="reveal delay-500 mt-0 lg:mt-10">
               <button 
                 onClick={onStart}
                 className="px-8 lg:px-12 py-4 lg:py-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full font-bold text-lg lg:text-xl hover:bg-white/10 transition-all text-white flex items-center gap-4 group"
               >
                 <span className="relative z-10 uppercase tracking-wider">View Pricing Plans</span>
                 <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-2 transition-transform" />
               </button>
            </div>
          </div>
        </div>

        {/* Dynamic Global Particles */}
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-[0.08] pointer-events-none animate-float"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${12 + Math.random() * 12}s`
            }}
          ></div>
        ))}
      </section>
      <footer className="border-t border-white/10 bg-black py-12 text-center text-gray-600 text-sm">
         <p>© {new Date().getFullYear()} Dora AI Inc. Designed with 💜 by HB Tech.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
