
import React from 'react';
import { Check } from 'lucide-react';
import { PLANS, getIcon } from '../constants';

interface PricingPageProps {
  onSelect: () => void;
  isLoggedIn: boolean;
}

const PricingPage: React.FC<PricingPageProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            The Right <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Plan</span> For You
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Start free, scale as you grow. Our pricing is designed to grow with your business needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {PLANS.map((plan) => (
            <div 
              key={plan.id}
              className={`relative p-10 bg-white/5 backdrop-blur-md border rounded-[3rem] transition-all transform hover:scale-[1.02] ${
                plan.popular 
                  ? 'border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.2)]' 
                  : 'border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-sm font-bold tracking-widest uppercase">
                  Best Value
                </div>
              )}

              <div className={`w-20 h-20 bg-gradient-to-br ${plan.color} rounded-3xl flex items-center justify-center mb-8 shadow-xl`}>
                {getIcon(plan.icon)}
              </div>

              <h3 className="text-3xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-10 flex items-baseline">
                <span className="text-6xl font-black">{plan.price}</span>
                <span className="text-gray-400 ml-2 text-xl">{plan.period}</span>
              </div>

              <ul className="space-y-5 mb-12">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-gray-300">
                    <div className="mt-1 mr-4 w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-green-400" />
                    </div>
                    <span className="text-lg leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={onSelect}
                className={`w-full py-5 rounded-[2rem] font-bold text-xl transition-all shadow-lg ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-purple-500/50 hover:scale-105' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
