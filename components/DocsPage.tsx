
import React, { useState } from 'react';
import { Search, Book, Code, Terminal, Zap, Shield, ChevronRight } from 'lucide-react';

const DocsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = [
    { id: 'getting-started', label: 'Getting Started', icon: <Zap className="w-5 h-5" /> },
    { id: 'integration', label: 'Integration Guide', icon: <Code className="w-5 h-5" /> },
    { id: 'api', label: 'API Reference', icon: <Terminal className="w-5 h-5" /> },
    { id: 'security', label: 'Security & Privacy', icon: <Shield className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar Navigation */}
          <aside className="md:w-72 space-y-2">
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search docs..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm focus:border-purple-500 outline-none transition"
              />
            </div>
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${
                  activeSection === section.id 
                    ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {section.icon}
                <span className="font-bold text-sm">{section.label}</span>
                {activeSection === section.id && <ChevronRight className="ml-auto w-4 h-4" />}
              </button>
            ))}
          </aside>

          {/* Documentation Content */}
          <main className="flex-1 max-w-4xl">
            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 backdrop-blur-sm">
              {activeSection === 'getting-started' && (
                <div className="animate-in fade-in duration-500">
                  <h1 className="text-5xl font-black mb-8">Getting Started</h1>
                  <p className="text-xl text-gray-400 mb-12">
                    Welcome to the Dora AI ecosystem by HB Tech. This guide will help you set up your first intelligent assistant in less than 5 minutes.
                  </p>
                  
                  <div className="space-y-12">
                    <section>
                      <h3 className="text-2xl font-bold mb-4 flex items-center">
                        <span className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-black font-black mr-4">1</span>
                        Create an Account
                      </h3>
                      <p className="text-gray-400 leading-relaxed pl-12">
                        Sign up for a free trial account to access the dashboard. No credit card is required to start your first deployment.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-2xl font-bold mb-4 flex items-center">
                        <span className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-black font-black mr-4">2</span>
                        Configure your Knowledge Base
                      </h3>
                      <p className="text-gray-400 leading-relaxed pl-12">
                        Upload PDFs, text files, or simply provide your website URL. Dora will crawl and index your content using Gemini-powered semantic analysis.
                      </p>
                    </section>

                    <section className="p-8 bg-black/50 border border-purple-500/20 rounded-3xl">
                      <h4 className="text-purple-400 font-bold mb-2 uppercase tracking-widest text-xs">Expert Tip</h4>
                      <p className="text-sm text-gray-300">
                        For better results, ensure your documentation is clear and structured. Gemini works best with well-defined context.
                      </p>
                    </section>
                  </div>
                </div>
              )}

              {activeSection === 'integration' && (
                <div className="animate-in fade-in duration-500">
                  <h1 className="text-5xl font-black mb-8">Integration Guide</h1>
                  <p className="text-xl text-gray-400 mb-12">
                    Dora AI is built to live anywhere. Use our lightweight JS embed or our robust REST API.
                  </p>
                  
                  <div className="bg-black p-8 rounded-3xl border border-white/10 font-mono text-sm mb-12">
                    <div className="text-gray-500 mb-4">// Script Integration</div>
                    <div className="text-purple-400">&lt;script <span className="text-blue-400">src</span>="https://cdn.dora-ai.com/v1/embed.js"&gt;&lt;/script&gt;</div>
                    <div className="text-purple-400">&lt;div <span className="text-blue-400">data-dora-key</span>="YOUR_API_KEY"&gt;&lt;/div&gt;</div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4">Supported Platforms</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                     {["React", "Next.js", "WordPress", "Webflow"].map(p => (
                       <div key={p} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center font-bold text-gray-400">{p}</div>
                     ))}
                  </div>
                </div>
              )}

              {activeSection === 'api' && (
                 <div className="animate-in fade-in duration-500 text-center py-20">
                    <Terminal className="w-20 h-20 text-purple-500 mx-auto mb-6 opacity-20" />
                    <h2 className="text-3xl font-black mb-4">API Documentation Coming Soon</h2>
                    <p className="text-gray-400">We are finalizing the v2 API reference. Stay tuned for updates.</p>
                 </div>
              )}

              {activeSection === 'security' && (
                 <div className="animate-in fade-in duration-500">
                    <h1 className="text-5xl font-black mb-8">Security & Privacy</h1>
                    <div className="grid md:grid-cols-2 gap-8">
                       <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                          <Shield className="w-10 h-10 text-green-400 mb-4" />
                          <h4 className="text-xl font-bold mb-2">SOC2 Type II</h4>
                          <p className="text-sm text-gray-400">We adhere to the highest industry standards for data management and security.</p>
                       </div>
                       <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                          <Lock className="w-10 h-10 text-blue-400 mb-4" />
                          <h4 className="text-xl font-bold mb-2">Data Isolation</h4>
                          <p className="text-sm text-gray-400">Your business data is stored in isolated vaults, never used to train global models.</p>
                       </div>
                    </div>
                 </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

const Lock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

export default DocsPage;
