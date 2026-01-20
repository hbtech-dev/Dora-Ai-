
import React from 'react';
import { Zap, Crown, Rocket } from 'lucide-react';
import { Plan } from './types';

export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$29',
    period: '/month',
    icon: 'zap',
    color: 'from-blue-500 to-cyan-500',
    features: [
      '1,000 messages/month',
      'Basic customization',
      'Email support',
      '1 chatbot',
      'Basic analytics'
    ]
  },
  {
    id: 'pro',
    name: 'Professional',
    price: '$99',
    period: '/month',
    icon: 'crown',
    color: 'from-purple-500 to-pink-500',
    popular: true,
    features: [
      '10,000 messages/month',
      'Advanced customization',
      'Priority support',
      '5 chatbots',
      'Advanced analytics',
      'Custom branding',
      'API access'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$299',
    period: '/month',
    icon: 'rocket',
    color: 'from-orange-500 to-red-500',
    features: [
      'Unlimited messages',
      'Full customization',
      '24/7 dedicated support',
      'Unlimited chatbots',
      'Custom AI training',
      'White-label solution',
      'Advanced security',
      'SLA guarantee'
    ]
  }
];

export const getIcon = (name: string) => {
  switch (name) {
    case 'zap': return <Zap className="w-6 h-6" />;
    case 'crown': return <Crown className="w-6 h-6" />;
    case 'rocket': return <Rocket className="w-6 h-6" />;
    default: return <Zap className="w-6 h-6" />;
  }
};
