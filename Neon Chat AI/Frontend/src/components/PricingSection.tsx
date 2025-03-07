import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Basic",
    price: "$0",
    period: "Free Forever",
    description: "Perfect for individuals just getting started",
    features: [
      "1,000 messages per month",
      "Basic AI responses",
      "Standard support",
      "3 AI personas",
      "Mobile access"
    ],
    highlighted: false,
    buttonText: "Start Free"
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "Ideal for professionals and small teams",
    features: [
      "10,000 messages per month",
      "Advanced AI capabilities",
      "Priority support",
      "10 AI personas",
      "API access",
      "Custom integrations",
      "Analytics dashboard"
    ],
    highlighted: true,
    buttonText: "Get Pro"
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "tailored plans",
    description: "For organizations with advanced needs",
    features: [
      "Unlimited messages",
      "Dedicated instances",
      "24/7 premium support",
      "Unlimited AI personas",
      "Full API access",
      "Advanced security",
      "Custom training",
      "SLA guarantees"
    ],
    highlighted: false,
    buttonText: "Contact Sales"
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-accent/20 rounded-full filter blur-[120px] -z-10"></div>
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-primary/20 rounded-full filter blur-[120px] -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. No hidden fees, no surprises.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`glass-morphism rounded-2xl border transition-all duration-500 overflow-hidden ${
                plan.highlighted 
                  ? 'border-accent shadow-neon-purple relative ring-1 ring-white/20 scale-105 z-10' 
                  : 'border-white/10'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-0 right-0 text-center py-1 text-xs font-medium bg-accent text-white">
                  MOST POPULAR
                </div>
              )}
              
              <div className={`p-8 ${plan.highlighted ? 'pt-10' : ''}`}>
                <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-white/60 ml-1">{plan.period}</span>
                </div>
                
                <p className="text-white/70 mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`w-full py-3 rounded-xl font-medium transition-all duration-300 button-hover-effect ${
                    plan.highlighted 
                      ? 'bg-accent hover:bg-accent/90 text-white' 
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
