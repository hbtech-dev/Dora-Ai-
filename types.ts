
// Added React import to provide access to the React namespace for types like React.ReactNode
import React from 'react';

export type Page = 'landing' | 'pricing' | 'demo' | 'dashboard' | 'docs' | 'contact';

export interface User {
  name: string;
  email: string;
  plan: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  icon: string; // Key for the icon component
  color: string;
  popular?: boolean;
  features: string[];
}

export interface StatCardProps {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}
