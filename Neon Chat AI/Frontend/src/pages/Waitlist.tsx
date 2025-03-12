

import React from 'react';
import { Sparkles, Zap, Star } from 'lucide-react';

const Waitlist = () => {
  return (
    <div className="min-h-screen w-full pt-12 pb-12 px-4 bg-gradient-radial">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[150px]"></div>
        <div className="absolute top-2/3 right-1/3 w-48 h-48 bg-pink-500/20 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto max-w-4xl relative z-10 animate-page-in pt-12">
        <div className="text-center mb-16">
          <div className="inline-block py-1 px-3 mb-4 rounded-full bg-white/10 glass-morphism">
            <span className="text-sm font-medium flex items-center text-white/90">
              <Sparkles className="w-4 h-4 mr-2 text-neon-cyan" />
              Coming Soon
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 neon-text">
            Join the NeonChat Waitlist
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Be the first to experience our revolutionary real-time messaging platform
            with enhanced neon aesthetics and secure communication.
          </p>
        </div>

        <div className="glass-morphism rounded-2xl p-8 md:p-12 shadow-neon-md max-w-4xl mx-auto">
          <div className="flex justify-center w-full">
            <iframe 
              width="100%" 
              height="480px" 
              src="https://forms.office.com/Pages/ResponsePage.aspx?id=uPbi5dNB_062EopTyaO7D210LCJVx3NKg8po64WoIydUOEhZOUtFQUNQNFZVOE1ZV1EwSEtUR1RLNC4u&embed=true" 
              frameBorder="0" 
              style={{
                border: 'none',
                maxWidth: '100%',
                maxHeight: '100vh'
              }}
              allowFullScreen
            ></iframe>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<Sparkles className="w-6 h-6 text-neon-purple" />}
            title="Early Access"
            description="Be among the first to test NeonChat's features"
          />
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-neon-blue" />}
            title="Premium Features"
            description="Waitlist members get exclusive features"
          />
          <FeatureCard 
            icon={<Star className="w-6 h-6 text-neon-cyan" />}
            title="VIP Support"
            description="Priority assistance when you need help"
          />
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
    return (
      <div className="glass-morphism p-6 rounded-xl hover:shadow-neon-sm transition-all duration-300">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-white/5">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-white/70">{description}</p>
      </div>
    );
  };
  
export default Waitlist;