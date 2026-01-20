
import React, { useState } from 'react';
import { Mail, MessageCircle, MapPin, Send, CheckCircle, Globe } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="bg-white/5 border border-purple-500/30 rounded-[3rem] p-16 text-center max-w-xl animate-in zoom-in duration-500">
          <CheckCircle className="w-24 h-24 text-green-400 mx-auto mb-8" />
          <h2 className="text-4xl font-black mb-4">Message Received!</h2>
          <p className="text-gray-400 text-lg mb-8">
            The HB Tech team has received your inquiry. One of our AI strategists will reach out within 24 hours.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-8 py-4 bg-purple-600 rounded-full font-bold hover:bg-purple-500 transition"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-40 pb-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 blur-[150px] -mr-48 -mt-48"></div>
      
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/2">
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
              Let's <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Talk</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              Have questions about custom agency solutions? HB Tech is here to help you deploy the future.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center space-x-6 group">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:border-purple-500 transition">
                  <Mail className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Email Us</div>
                  <div className="text-2xl font-bold hover:text-purple-400 transition cursor-pointer">code@hbhouse.space</div>
                </div>
              </div>

              <div className="flex items-center space-x-6 group">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:border-purple-500 transition">
                  <Globe className="w-8 h-8 text-pink-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Official Website</div>
                  <a href="https://www.hbhouse.space" target="_blank" rel="noopener noreferrer" className="text-2xl font-bold hover:text-pink-400 transition">www.hbhouse.space</a>
                </div>
              </div>

              <div className="flex items-center space-x-6 group">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:border-purple-500 transition">
                  <MapPin className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Location</div>
                  <div className="text-2xl font-bold">Manchester, United Kingdom</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 backdrop-blur-md">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-gray-500 ml-2">Name</label>
                    <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-purple-500 transition" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-gray-500 ml-2">Email</label>
                    <input required type="email" className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-purple-500 transition" placeholder="john@company.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-gray-500 ml-2">Subject</label>
                  <select className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-purple-500 transition appearance-none">
                    <option>General Inquiry</option>
                    <option>Enterprise Solutions</option>
                    <option>Agency Partnership</option>
                    <option>Technical Support</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-gray-500 ml-2">Message</label>
                  <textarea required rows={5} className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-purple-500 transition resize-none" placeholder="Tell us about your project..."></textarea>
                </div>

                <button type="submit" className="w-full py-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl font-black text-xl hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] transition transform hover:scale-[1.02] flex items-center justify-center group">
                  Send Message
                  <Send className="ml-3 w-6 h-6 group-hover:translate-x-2 transition" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
