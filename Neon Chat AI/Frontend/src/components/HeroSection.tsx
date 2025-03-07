import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section className="min-h-screen pt-28 pb-20 relative overflow-hidden subtle-grid">
      {/* Background Elements */}
      <div className="absolute top-1/4 -left-40 w-80 h-80 bg-accent/30 rounded-full filter blur-[120px] animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-primary/30 rounded-full filter blur-[120px] animate-pulse-glow" style={{ animationDelay: '-2s' }}></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Hero Text */}
          <div className="flex-1 text-center lg:text-left z-10">
            <div className="inline-block px-3 py-1 rounded-full glass-morphism text-sm font-medium text-white/80 mb-6">
              <span className="mr-2 inline-block w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              AI-Powered Chat for the future
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Experience the
              <span className="bg-clip-text text-transparent bg-neon-glow animate-text-shimmer ml-3">future of AI</span>
              <br />conversation today
            </h1>
            
            <p className="text-white/70 text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0">
              Supercharge your productivity with our state-of-the-art AI chat assistant. 
              Experience intelligent conversations that adapt to your needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="button-hover-effect relative overflow-hidden bg-accent hover:bg-accent/90 text-white font-medium py-3 px-8 rounded-xl transition-all duration-300 flex items-center justify-center group">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button className="button-hover-effect bg-transparent hover:bg-white/5 text-white border border-white/20 font-medium py-3 px-8 rounded-xl transition-all duration-300">
                View Demo
              </button>
            </div>
          </div>
          
          {/* Chat Demo */}
          <div className="flex-1 w-full max-w-md mx-auto glass-morphism rounded-2xl overflow-hidden border border-white/10 shadow-glass">
            <div className="p-4 border-b border-white/10 bg-black/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-destructive/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="text-sm font-medium text-white/70">NeonChat AI Assistant</div>
              <div className="w-10"></div>
            </div>
            
            <div className="h-96 overflow-y-auto p-4 scrollbar-none">
              <div className="message-bubble received bg-cyan-blue-gradient">
                <p>Hello! I'm your NeonChat AI assistant. How can I help you today?</p>
              </div>
              
              <div className="message-bubble sent bg-purple-pink-gradient">
                <p>I need help organizing my project files.</p>
              </div>
              
              <div className="message-bubble received bg-cyan-blue-gradient">
                <p>I'd be happy to help with that! Would you like me to suggest a file structure or help with automating the organization process?</p>
              </div>
              
              <div className="message-bubble sent bg-purple-pink-gradient">
                <p>Can you suggest an efficient file structure for a React project?</p>
              </div>
              
              <div className="message-bubble received bg-cyan-blue-gradient">
                <p>Absolutely! Here's a recommended file structure for a React project:</p>
                <div className="mt-2 font-mono text-sm bg-black/20 p-2 rounded-md">
                  src/<br/>
                  ├── components/<br/>
                  ├── pages/<br/>
                  ├── hooks/<br/>
                  ├── utils/<br/>
                  ├── context/<br/>
                  ├── assets/<br/>
                  ├── styles/<br/>
                  └── App.tsx
                </div>
              </div>
              
              <div className="message-bubble sent bg-purple-pink-gradient">
                <p>That's perfect, thank you!</p>
              </div>
              
              <div className="message-bubble received bg-cyan-blue-gradient">
                <div className="flex items-center">
                  <div className="h-5 overflow-hidden whitespace-nowrap animate-typing">
                    Is there anything else I can help you with?
                  </div>
                  <div className="w-1 h-5 bg-white ml-1 animate-cursor-blink"></div>
                </div>
              </div>
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 border-t border-white/10 bg-black/20">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <button className="bg-accent hover:bg-accent/90 text-white p-2 rounded-lg transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send-horizontal"><path d="m3 3 3 9-3 9 19-9Z"/><path d="M6 12h16"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;