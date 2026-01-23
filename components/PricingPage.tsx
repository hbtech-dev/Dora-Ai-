import React, { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { PLANS, getIcon } from '../constants';
import PaymentModal from './PaymentModal';
import { Plan } from '../types';

interface PricingPageProps {
  onSelect: () => void;
  isLoggedIn: boolean;
}

const PricingPage: React.FC<PricingPageProps> = ({ onSelect }) => {
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<Plan | null>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handlePlanChoice = (plan: Plan) => {
    setSelectedPlanForPayment(plan);
  };

  const handlePaymentSuccess = () => {
    setSelectedPlanForPayment(null);
    onSelect();
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-600/10 blur-[150px] translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-purple-300">Flexible Packages</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter">
            The Right <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent italic">Plan</span> For You
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Start free, scale as you grow. Our pricing is designed to grow with your business needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {PLANS.map((plan, index) => (
            <div 
              key={plan.id}
              className={`group relative p-10 bg-white/5 backdrop-blur-xl border rounded-[3rem] transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 reveal select-none ${
                plan.popular 
                  ? 'border-purple-500/50 shadow-[0_30px_60px_rgba(168,85,247,0.15)] bg-white/[0.07]' 
                  : 'border-white/10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-black tracking-widest uppercase shadow-lg shadow-purple-500/30">
                  Most Popular
                </div>
              )}

              <div className={`w-20 h-20 bg-gradient-to-br ${plan.color} rounded-3xl flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                <div className="text-white transform group-hover:rotate-12 transition-transform">
                  {getIcon(plan.icon)}
                </div>
              </div>

              <h3 className="text-3xl font-black mb-2 text-white group-hover:text-purple-400 transition-colors">{plan.name}</h3>
              <div className="mb-10 flex items-baseline gap-1">
                <span className="text-6xl font-black text-white">{plan.price}</span>
                <span className="text-gray-500 text-xl font-medium">{plan.period}</span>
              </div>

              <div className="h-px w-full bg-white/10 mb-10"></div>

              <ul className="space-y-5 mb-12">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-gray-400 group-hover:text-gray-300 transition-colors">
                    <div className="mt-1 mr-4 w-5 h-5 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0 border border-white/10">
                      <Check className="w-3 h-3 text-purple-400" />
                    </div>
                    <span className="text-lg leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handlePlanChoice(plan)}
                className={`w-full py-5 rounded-2xl font-black text-xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 group/btn ${
                  plan.popular 
                    ? 'bg-white text-black hover:bg-purple-500 hover:text-white' 
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                Choose {plan.name}
                <Sparkles className="w-5 h-5 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedPlanForPayment && (
        <PaymentModal 
          plan={selectedPlanForPayment} 
          onClose={() => setSelectedPlanForPayment(null)} 
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default PricingPage;
