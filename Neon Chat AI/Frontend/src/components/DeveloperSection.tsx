import React from 'react';
import { Download, ExternalLink, Github, Linkedin, Mail } from 'lucide-react';

const skills = [
  "PHP", "Laravel", "Vue.js", "Ruby", "Next.js", "Stable Diffusion", "NLP", "Unreal Engine", "AWS"
];

const experiences = [
  {
    period: "2024 - 2024",
    role: "Generative AI Intern + 3D Character Animator",
    company: "GRACYWOODS GAMES",
    location: "Hongkong (SAR) - Remote",
    summary: "Leveraged Generative AI Tools and optimized data pipelines for game development.",
    responsibilities: [
      "Designed a 10K parameter NLP model for text generation and integrated it into an in-game dialogue system.",
      "Created and maintained a dataset of 100+ 3D FBX animations and trained a CNN model for game development."
    ],
    skills: ["Stable Diffusion", "NLP", "Unreal Engine", "AWS"]
  },
  {
    period: "2023 - 2024",
    role: "Junior Software Developer",
    company: "HYSCALER",
    location: "Bhubaneswar, Odisha - On site",
    summary: "Enhanced web applications and led software projects, driving innovation and improving efficiency.",
    responsibilities: [
      "Mastered new technologies including Ruby, Astro, and Next.js, driving innovation.",
      "Upgraded 5 legacy systems, reducing maintenance costs by 30% and improving performance with a modern tech stack."
    ],
    skills: ["PHP", "Laravel", "Vue.js", "Ruby", "Next.js"]
  }
];

const DeveloperSection = () => {
  return (
    <section id="developer" className="py-20 relative overflow-hidden">
      <div className="blurred-dot-pattern absolute inset-0 -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Developer Profile</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Meet the talented developer behind this cutting-edge AI chat application
          </p>
        </div>
        
        <div className="glass-morphism rounded-2xl border border-white/10 shadow-glass overflow-hidden max-w-5xl mx-auto">
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white/30 shadow-neon-blue">
                  <img 
                  src="https://neelanjanchakraborty.in/thumnails/avatar.webp" 
                  alt="Neelanjan Chakraborty"
                  className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold mb-1">Neelanjan Chakraborty</h3>
                <p className="text-white/70 text-lg mb-4">Junior Full Stack Developer | ML & Data Science</p>
                <p className="text-white/60 mb-4">Kharagpur, West Bengal</p>
                
                <p className="text-white/80 mb-6 max-w-2xl">
                  Junior Full Stack Developer with a solid Computer Science background, specializing in Machine Learning and Data Science. Discover my innovative tech solutions.
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <a 
                    href="https://neelanjanchakraborty.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-hover-effect flex items-center gap-2 py-2 px-4 rounded-lg glass-morphism hover:shadow-neon-blue transition-all duration-300"
                  >
                    <ExternalLink size={16} />
                    <span>Portfolio</span>
                  </a>
                  <a 
                    href="#"
                    className="button-hover-effect flex items-center gap-2 py-2 px-4 rounded-lg glass-morphism hover:shadow-neon-purple transition-all duration-300"
                  >
                    <Linkedin size={16} />
                    <span>LinkedIn</span>
                  </a>
                  <a 
                    href="#"
                    className="button-hover-effect flex items-center gap-2 py-2 px-4 rounded-lg glass-morphism hover:shadow-neon-pink transition-all duration-300"
                  >
                    <Github size={16} />
                    <span>GitHub</span>
                  </a>
                  <a 
                    href="#"
                    className="button-hover-effect flex items-center gap-2 py-2 px-4 rounded-lg glass-morphism hover:shadow-neon-blue transition-all duration-300"
                  >
                    <Mail size={16} />
                    <span>Contact</span>
                  </a>
                  <a 
                    href="#"
                    className="button-hover-effect flex items-center gap-2 py-2 px-4 rounded-lg bg-accent hover:bg-accent/90 text-white transition-all duration-300"
                  >
                    <Download size={16} />
                    <span>Resume</span>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h4 className="text-xl font-semibold mb-4 flex items-center">
                <span className="w-4 h-4 bg-accent rounded-sm mr-2"></span>
                Experience
              </h4>
              
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div key={index} className="glass-morphism rounded-xl p-6 border border-white/10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                      <div className="mb-2 md:mb-0">
                        <span className="text-white/60 text-sm">{exp.period}</span>
                        <h5 className="text-lg font-medium">{exp.role}</h5>
                      </div>
                      <div className="text-right">
                        <div className="text-accent font-medium">{exp.company}</div>
                        <div className="text-white/60 text-sm">{exp.location}</div>
                      </div>
                    </div>
                    
                    <p className="text-white/80 mb-4">{exp.summary}</p>
                    
                    <div className="mb-4">
                      <div className="text-white/80 font-medium mb-2">Responsibilities:</div>
                      <ul className="list-disc pl-5 space-y-1 text-white/70">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, i) => (
                        <span key={i} className="text-xs bg-white/10 text-white/90 px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-12">
              <h4 className="text-xl font-semibold mb-4 flex items-center">
                <span className="w-4 h-4 bg-primary rounded-sm mr-2"></span>
                Skills
              </h4>
              
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <div 
                    key={index}
                    className="px-4 py-2 rounded-lg glass-morphism border border-white/10 hover:border-white/30 transition-all duration-300"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperSection;
