import React from 'react';
import Layout from '@/components/Layout';
import { Network, Users, UserPlus, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <Layout>
      <section className="text-center max-w-4xl mx-auto">
        <h2 className="page-title">Social Network Analyzer</h2>
        <p className="subtitle">
          A Hobby Project exploring Graph Database Technologies with Neo4j
        </p>
        
        <div className="bg-blue-50 p-6 rounded-lg my-8 text-left">
          <h3 className="text-2xl font-bold mb-4">Project Overview</h3>
          <div className="space-y-4">
            <p>
              This project is a comprehensive Social Network Analyzer built to demonstrate the power of Neo4j graph databases. 
              By leveraging graph database technologies, we aim to create an intuitive platform for managing and visualizing complex social connections.
            </p>
            <div className="bg-white p-4 rounded-md border border-blue-100">
              <h4 className="font-semibold mb-2">Key Objectives:</h4>
              <ul className="list-disc list-inside">
                <li>Explore and test Neo4j graph database capabilities</li>
                <li>Create an interactive social network visualization tool</li>
                <li>Demonstrate relationship mapping and network analysis</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Link to="/add-person" className="glass-panel p-8 hover:shadow-md transition-all duration-300 group">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <UserPlus className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Add Person</h3>
              <p className="text-gray-600">Add new individuals to your social network with their details and interests.</p>
            </div>
          </Link>
          
          <Link to="/add-friendship" className="glass-panel p-8 hover:shadow-md transition-all duration-300 group">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Add Friendship</h3>
              <p className="text-gray-600">Create connections between people to establish relationships in your network.</p>
            </div>
          </Link>
          
          <Link to="/visualize" className="glass-panel p-8 hover:shadow-md transition-all duration-300 group">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Network className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Visualize Network</h3>
              <p className="text-gray-600">Explore an interactive visualization of your social network and its connections.</p>
            </div>
          </Link>
        </div>
        
        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">About the Developer</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <img 
              src="https://neelanjanchakraborty.in/thumnails/avatar.webp" 
              alt="Neelanjan Chakraborty" 
              className="w-32 h-32 rounded-full object-cover"
            />
            <div className="text-left max-w-xl">
              <h4 className="text-xl font-semibold">Neelanjan Chakraborty</h4>
              <p className="text-gray-600">
                A passionate developer interested in graph technologies, social network analysis, 
                and building innovative software solutions. This project represents an exploration 
                of graph database capabilities and interactive data visualization.
              </p>
              <div className="mt-4">
                <a 
                  href="https://neelanjanchakraborty.in/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:underline"
                >
                  View Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;