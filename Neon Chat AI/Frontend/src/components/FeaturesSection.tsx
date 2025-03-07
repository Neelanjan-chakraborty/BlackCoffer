import React from 'react';
import { Code, BrainCircuit, Lock, Star, Zap, Share2 } from 'lucide-react';

const features = [
  {
    icon: <BrainCircuit className="w-6 h-6 text-primary" />,
    title: "Advanced AI",
    description: "Powered by state-of-the-art language models for intelligent conversations."
  },
  {
    icon: <Lock className="w-6 h-6 text-accent" />,
    title: "Secure & Private",
    description: "Your data is encrypted and never shared with third parties."
  },
  {
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    title: "Lightning Fast",
    description: "Get responses in milliseconds with our optimized infrastructure."
  },
  {
    icon: <Code className="w-6 h-6 text-green-400" />,
    title: "Developer Friendly",
    description: "Easy API integration with comprehensive documentation."
  },
  {
    icon: <Star className="w-6 h-6 text-orange-400" />,
    title: "Personalized",
    description: "Adapts to your preferences and learns from your interactions."
  },
  {
    icon: <Share2 className="w-6 h-6 text-blue-400" />,
    title: "Seamless Integrations",
    description: "Works with your favorite tools and platforms out of the box."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-radial -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Cutting-Edge Features</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Discover what makes our AI chat platform stand out from the competition
            with these powerful and innovative features.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-morphism p-6 rounded-xl border border-white/10 shadow-glass group hover:border-white/20 transition-all duration-300 backdrop-blur-lg"
            >
              <div className="w-12 h-12 rounded-lg flex items-center justify-center glass-morphism mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
