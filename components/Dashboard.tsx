
import React, { useState } from 'react';
import { 
  BarChart3, MessageSquare, Users, Zap, Star, 
  Code, Settings, CreditCard, LogOut, Bot, 
  Copy, Check, TrendingUp, Clock, ChevronRight
} from 'lucide-react';
import { User, StatCardProps } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  user: User;
  onLogout: () => void;
  onUpgrade: () => void;
}

const mockData = [
  { name: 'Mon', messages: 400 },
  { name: 'Tue', messages: 600 },
  { name: 'Wed', messages: 500 },
  { name: 'Thu', messages: 900 },
  { name: 'Fri', messages: 800 },
  { name: 'Sat', messages: 1100 },
  { name: 'Sun', messages: 1200 },
];

const StatCard: React.FC<StatCardProps> = ({ label, value, change, icon }) => (
  <div className="p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] hover:border-purple-500/50 transition-all group">
    <div className="flex items-center justify-between mb-6">
      <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition">
        {/* Explicitly casting to React.ReactElement<any> to allow dynamic className injection */}
        {React.cloneElement(icon as React.ReactElement<any>, { className: "w-7 h-7 text-purple-400" })}
      </div>
      <div className={`px-3 py-1 rounded-full text-xs font-bold ${change.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
        {change}
      </div>
    </div>
    <div className="text-4xl font-black mb-2">{value}</div>
    <div className="text-gray-400 font-medium">{label}</div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onUpgrade }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const copyCode = () => {
    const code = `<script src="https://dora-ai.com/embed.js"></script>\n<div data-dora-id="${user.email.split('@')[0]}"></div>`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-80 bg-black border-b md:border-b-0 md:border-r border-white/10 flex flex-col p-8 z-30">
        <div className="flex items-center space-x-3 mb-16">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <Bot className="w-7 h-7" />
          </div>
          <span className="text-2xl font-bold tracking-tight">Dora AI</span>
        </div>

        <nav className="flex-1 space-y-4">
          {[
            { id: 'overview', icon: <BarChart3 />, label: 'Overview' },
            { id: 'chats', icon: <MessageSquare />, label: 'Conversations' },
            { id: 'settings', icon: <Settings />, label: 'Settings' },
            { id: 'billing', icon: <CreditCard />, label: 'Billing' },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all ${
                activeTab === item.id 
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 text-white' 
                  : 'hover:bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {/* Explicitly casting to React.ReactElement<any> to allow dynamic className injection */}
              {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-6 h-6" })}
              <span className="text-lg font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-8 pt-8 border-t border-white/10">
          <button 
            onClick={onLogout}
            className="w-full flex items-center space-x-4 px-6 py-4 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all"
          >
            <LogOut className="w-6 h-6" />
            <span className="text-lg font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-black mb-3">Welcome, {user.name}!</h1>
            <p className="text-gray-400 text-lg">Your AI dashboard is looking healthy today.</p>
          </div>
          <div className="flex items-center space-x-4 bg-white/5 border border-white/10 px-6 py-3 rounded-full">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-bold uppercase tracking-widest">{user.plan} Active</span>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <StatCard label="Total Interactions" value="12,842" change="+14.2%" icon={<MessageSquare />} />
          <StatCard label="Unique Visitors" value="4,209" change="+5.8%" icon={<Users />} />
          <StatCard label="Response Speed" value="0.8s" change="-12.1%" icon={<Clock />} />
          <StatCard label="Satisfaction Rate" value="98.2%" change="+2.4%" icon={<Star />} />
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-[3rem] p-10 flex flex-col h-[500px]">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-2xl font-bold flex items-center">
                  <TrendingUp className="mr-3 text-purple-400" />
                  Conversation Volume
                </h3>
                <p className="text-gray-400">Activity in the last 7 days</p>
              </div>
              <select className="bg-black border border-white/20 rounded-xl px-4 py-2 text-sm">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
            </div>
            <div className="flex-1 min-h-0">
               <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockData}>
                  <defs>
                    <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#A855F7" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#A855F7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis dataKey="name" stroke="#555" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                  <YAxis stroke="#555" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                    itemStyle={{ color: '#A855F7' }}
                  />
                  <Area type="monotone" dataKey="messages" stroke="#A855F7" strokeWidth={4} fillOpacity={1} fill="url(#colorMessages)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Actions / Plan Info */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-[3rem] p-10">
               <h3 className="text-2xl font-bold mb-4">Current Usage</h3>
               <div className="space-y-6">
                 <div>
                   <div className="flex justify-between text-sm mb-2">
                     <span className="text-gray-300">Messages Used</span>
                     <span className="font-bold">8,450 / 10,000</span>
                   </div>
                   <div className="w-full bg-black/50 rounded-full h-3">
                     <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" style={{ width: '84.5%' }}></div>
                   </div>
                 </div>
                 <div className="pt-4 flex items-center justify-between">
                   <div>
                     <div className="text-sm text-gray-400">Next billing cycle</div>
                     <div className="font-bold">March 12, 2024</div>
                   </div>
                   <button 
                    onClick={onUpgrade}
                    className="p-3 bg-white text-black rounded-full hover:bg-purple-500 hover:text-white transition group"
                   >
                     <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition" />
                   </button>
                 </div>
               </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10">
               <h3 className="text-2xl font-bold mb-6 flex items-center">
                 <Code className="mr-3 text-purple-400" />
                 Integration
               </h3>
               <div className="relative group">
                 <div className="bg-black/50 p-6 rounded-[2rem] border border-white/10 overflow-hidden">
                   <pre className="text-xs text-purple-300 font-mono whitespace-pre-wrap break-all">
{`<script src="https://dora-ai.com/embed.js"></script>
<div data-dora-id="${user.email.split('@')[0]}"></div>`}
                   </pre>
                 </div>
                 <button 
                   onClick={copyCode}
                   className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-2xl backdrop-blur-md transition-all"
                 >
                   {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                 </button>
               </div>
               <p className="mt-4 text-xs text-gray-500 leading-relaxed">
                 Copy this snippet into your <code>&lt;body&gt;</code> to activate Dora AI on your site.
               </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
