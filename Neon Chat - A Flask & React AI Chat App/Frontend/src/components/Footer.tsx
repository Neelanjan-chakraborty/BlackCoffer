import React from 'react';
import { ArrowRight, Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="pt-20 relative overflow-hidden">
      <div className="subtle-grid absolute inset-0 -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="glass-morphism rounded-t-3xl border-t border-x border-white/10 p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-bold neon-text">
                  NeonChat<span className="font-normal text-white">AI</span>
                </span>
              </div>
              <p className="text-white/70 mb-6">
                Experience the future of AI conversation with our state-of-the-art chat platform.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-8 h-8 rounded-full glass-morphism flex items-center justify-center text-white/80 hover:text-white hover:shadow-neon-purple transition-all duration-300">
                  <Twitter size={16} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full glass-morphism flex items-center justify-center text-white/80 hover:text-white hover:shadow-neon-blue transition-all duration-300">
                  <Github size={16} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full glass-morphism flex items-center justify-center text-white/80 hover:text-white hover:shadow-neon-pink transition-all duration-300">
                  <Linkedin size={16} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full glass-morphism flex items-center justify-center text-white/80 hover:text-white hover:shadow-neon-blue transition-all duration-300">
                  <Mail size={16} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'Features', 'Pricing', 'About Us', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white/70 hover:text-white transition-colors duration-300 flex items-center group">
                      <span>{item}</span>
                      <ArrowRight className="ml-1 w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                {['Documentation', 'API Reference', 'Tutorials', 'Blog', 'Status'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white/70 hover:text-white transition-colors duration-300 flex items-center group">
                      <span>{item}</span>
                      <ArrowRight className="ml-1 w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">Subscribe</h4>
              <p className="text-white/70 mb-4">Stay updated with our latest features and releases</p>
              
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <button className="absolute right-1 top-1 bg-accent hover:bg-accent/90 text-white p-1 rounded transition-all duration-300">
                  <ArrowRight size={16} />
                </button>
              </div>
              
              <p className="text-white/50 text-xs mt-2">
                By subscribing, you agree to our Privacy Policy.
              </p>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
            <div className="text-white/50 text-sm mb-4 md:mb-0">
              © 2024 NeonChatAI. All rights reserved.
            </div>
            
            <div className="flex space-x-6">
              {['Privacy Policy', 'Terms of Service', 'Cookies', 'Security'].map((item) => (
                <a key={item} href="#" className="text-white/50 text-sm hover:text-white/80 transition-colors duration-300">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
