
import React, { useState } from 'react';
import { 
  BarChart3, MessageSquare, Users, Zap, Star, 
  Code, Settings, CreditCard, LogOut, Bot, 
  Copy, Check, TrendingUp, Clock, ChevronRight,
  User as UserIcon, Mail, Lock, Bell, Shield, FileText,
  Search, Filter, MoreHorizontal
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

const mockConversations = [
  { id: 1, user: 'visitor_123', preview: 'How do I reset my password?', time: '2 mins ago', status: 'active' },
  { id: 2, user: 'client_apple', preview: 'Pricing for enterprise plan?', time: '15 mins ago', status: 'closed' },
  { id: 3, user: 'test_user', preview: 'Integration with React', time: '1 hour ago', status: 'active' },
  { id: 4, user: 'visitor_555', preview: 'Hello, are you there?', time: '2 hours ago', status: 'bot_handled' },
];

const StatCard: React.FC<StatCardProps> = ({ label, value, change, icon }) => (
  <div className="p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] hover:border-purple-500/50 transition-all group">
    <div className="flex items-center justify-between mb-6">
      <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition">
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

const OverviewSection: React.FC<{ user: User, copied: boolean, copyCode: () => void, onUpgrade: () => void }> = ({ user, copied, copyCode, onUpgrade }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
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

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
      <StatCard label="Total Interactions" value="12,842" change="+14.2%" icon={<MessageSquare />} />
      <StatCard label="Unique Visitors" value="4,209" change="+5.8%" icon={<Users />} />
      <StatCard label="Response Speed" value="0.8s" change="-12.1%" icon={<Clock />} />
      <StatCard label="Satisfaction Rate" value="98.2%" change="+2.4%" icon={<Star />} />
    </div>

    <div className="grid lg:grid-cols-3 gap-12 mb-12">
      <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-[3rem] p-10 flex flex-col h-[500px]">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-2xl font-bold flex items-center">
              <TrendingUp className="mr-3 text-purple-400" />
              Conversation Volume
            </h3>
            <p className="text-gray-400">Activity in the last 7 days</p>
          </div>
          <select className="bg-black border border-white/20 rounded-xl px-4 py-2 text-sm text-white">
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
        </div>
      </div>
    </div>
  </div>
);

const ConversationsSection = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <header className="mb-8">
      <h2 className="text-4xl font-black mb-2">Conversations</h2>
      <p className="text-gray-400">Manage and review your chatbot interactions.</p>
    </header>

    <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden">
      <div className="p-6 border-b border-white/10 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search conversations..." 
            className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-purple-500 transition"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl flex items-center space-x-2 transition">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-xl text-white font-medium transition">
            Export
          </button>
        </div>
      </div>
      
      <div className="divide-y divide-white/5">
        {mockConversations.map((conv) => (
          <div key={conv.id} className="p-6 hover:bg-white/5 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center text-lg font-bold">
                {conv.user[0].toUpperCase()}
              </div>
              <div>
                <div className="font-bold flex items-center gap-2">
                  {conv.user}
                  <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                    conv.status === 'active' ? 'bg-green-500/20 text-green-400' :
                    conv.status === 'closed' ? 'bg-gray-500/20 text-gray-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {conv.status}
                  </span>
                </div>
                <div className="text-gray-400 text-sm mt-1">{conv.preview}</div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-gray-500">
              <span className="text-sm">{conv.time}</span>
              <ChevronRight className="w-5 h-5 group-hover:text-white transition" />
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-6 bg-black/30 border-t border-white/10 text-center text-gray-400 text-sm hover:text-white cursor-pointer transition">
        View all conversations
      </div>
    </div>
  </div>
);

const SettingsSection: React.FC<{ user: User }> = ({ user }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
    <header className="mb-8">
      <h2 className="text-4xl font-black mb-2">Settings</h2>
      <p className="text-gray-400">Manage your account preferences and configurations.</p>
    </header>

    <div className="space-y-6">
      <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <UserIcon className="w-6 h-6 mr-3 text-purple-400" />
          Profile Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Full Name</label>
            <input type="text" defaultValue={user.name} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Email Address</label>
            <input type="email" defaultValue={user.email} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition" />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="px-6 py-2 bg-white text-black rounded-xl font-bold hover:bg-purple-400 transition">Save Changes</button>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <Lock className="w-6 h-6 mr-3 text-purple-400" />
          Security
        </h3>
        <div className="flex items-center justify-between py-4 border-b border-white/5">
          <div>
            <div className="font-medium">Password</div>
            <div className="text-sm text-gray-400">Last changed 3 months ago</div>
          </div>
          <button className="text-purple-400 hover:text-white transition">Update</button>
        </div>
        <div className="flex items-center justify-between py-4">
          <div>
            <div className="font-medium">Two-Factor Authentication</div>
            <div className="text-sm text-gray-400">Add an extra layer of security</div>
          </div>
          <div className="w-12 h-6 bg-white/10 rounded-full cursor-pointer relative">
            <div className="absolute left-1 top-1 w-4 h-4 bg-gray-400 rounded-full transition-all"></div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <Bell className="w-6 h-6 mr-3 text-purple-400" />
          Notifications
        </h3>
        <div className="space-y-4">
          {['Email digest', 'New conversation alerts', 'Product updates', 'Security alerts'].map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-gray-300">{item}</span>
              <input type="checkbox" defaultChecked={i < 2} className="w-5 h-5 rounded border-gray-600 bg-black/50 text-purple-500 focus:ring-purple-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const BillingSection: React.FC<{ user: User, onUpgrade: () => void }> = ({ user, onUpgrade }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
    <header className="mb-8">
      <h2 className="text-4xl font-black mb-2">Billing & Plans</h2>
      <p className="text-gray-400">Manage your subscription and payment methods.</p>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div className="md:col-span-2 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-[2rem] p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="text-sm text-purple-400 font-bold uppercase tracking-wider mb-2">Current Plan</div>
            <h3 className="text-3xl font-black text-white">{user.plan === 'starter' ? 'Starter Plan' : 'Pro Plan'}</h3>
            <p className="text-gray-400 mt-2">Active until Mar 12, 2024</p>
          </div>
          <div className="bg-purple-500/20 p-3 rounded-xl">
            <Zap className="w-8 h-8 text-purple-400" />
          </div>
        </div>
        
        <div className="space-y-4 mb-8">
          <div className="flex justify-between text-sm">
            <span>Conversations</span>
            <span className="font-bold">8,450 / 10,000</span>
          </div>
          <div className="w-full bg-black/50 rounded-full h-2">
             <div className="bg-purple-500 h-2 rounded-full" style={{ width: '84.5%' }}></div>
          </div>
          
          <div className="flex justify-between text-sm">
            <span>Storage</span>
            <span className="font-bold">2.1GB / 5GB</span>
          </div>
          <div className="w-full bg-black/50 rounded-full h-2">
             <div className="bg-pink-500 h-2 rounded-full" style={{ width: '42%' }}></div>
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={onUpgrade} className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-bold transition">Upgrade Plan</button>
          <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition">Cancel Subscription</button>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 flex flex-col justify-center items-center text-center">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <CreditCard className="w-8 h-8 text-gray-400" />
        </div>
        <h4 className="text-xl font-bold mb-2">Payment Method</h4>
        <p className="text-gray-400 text-sm mb-6">Visa ending in 4242</p>
        <button className="w-full py-3 border border-white/20 rounded-xl hover:bg-white/5 transition">Manage Methods</button>
      </div>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden">
      <div className="p-8 border-b border-white/10">
        <h3 className="text-xl font-bold">Billing History</h3>
      </div>
      <div className="divide-y divide-white/10">
        {[
          { date: 'Feb 12, 2024', id: 'INV-2024-001', amount: '$29.00', status: 'Paid' },
          { date: 'Jan 12, 2024', id: 'INV-2023-012', amount: '$29.00', status: 'Paid' },
          { date: 'Dec 12, 2023', id: 'INV-2023-011', amount: '$29.00', status: 'Paid' },
        ].map((invoice, i) => (
          <div key={i} className="p-6 flex items-center justify-between hover:bg-white/5 transition">
            <div className="flex items-center space-x-4">
               <div className="p-3 bg-white/5 rounded-xl">
                 <FileText className="w-5 h-5 text-gray-400" />
               </div>
               <div>
                 <div className="font-bold">{invoice.date}</div>
                 <div className="text-sm text-gray-500">{invoice.id}</div>
               </div>
            </div>
            <div className="flex items-center space-x-6">
              <span className="font-bold">{invoice.amount}</span>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">{invoice.status}</span>
              <button className="p-2 hover:bg-white/10 rounded-lg transition"><ChevronRight className="w-4 h-4 text-gray-500" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
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

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return <OverviewSection user={user} copied={copied} copyCode={copyCode} onUpgrade={onUpgrade} />;
      case 'chats':
        return <ConversationsSection />;
      case 'settings':
        return <SettingsSection user={user} />;
      case 'billing':
        return <BillingSection user={user} onUpgrade={onUpgrade} />;
      default:
        return <OverviewSection user={user} copied={copied} copyCode={copyCode} onUpgrade={onUpgrade} />;
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row">
      <aside className="w-full md:w-80 bg-black border-b md:border-b-0 md:border-r border-white/10 flex flex-col p-8 z-30 sticky top-0 h-screen">
        <div className="flex items-center space-x-3 mb-16 px-2">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-900/30">
            <Bot className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Dora AI</span>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'overview', icon: <BarChart3 />, label: 'Overview' },
            { id: 'chats', icon: <MessageSquare />, label: 'Conversations' },
            { id: 'settings', icon: <Settings />, label: 'Settings' },
            { id: 'billing', icon: <CreditCard />, label: 'Billing' },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                activeTab === item.id 
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 text-white shadow-lg shadow-purple-900/20' 
                  : 'hover:bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <div className={`transition-transform duration-300 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                {React.cloneElement(item.icon as React.ReactElement<any>, { 
                  className: `w-5 h-5 ${activeTab === item.id ? 'text-purple-400' : 'text-gray-400 group-hover:text-white'}`
                })}
              </div>
              <span className="text-lg font-medium">{item.label}</span>
              {activeTab === item.id && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>
              )}
            </button>
          ))}
        </nav>

        <div className="mt-8 pt-8 border-t border-white/10">
          <button 
            onClick={onLogout}
            className="w-full flex items-center space-x-4 px-6 py-4 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all group"
          >
            <LogOut className="w-5 h-5 group-hover:translate-x-1 transition" />
            <span className="text-lg font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
