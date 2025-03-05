import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';

const Visualize = () => {
  const [visualizationHtml, setVisualizationHtml] = useState('');

  useEffect(() => {
    // Fetch visualization HTML from Flask backend
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/visualize`)
      .then((response) => response.text())
      .then((html) => {
        setVisualizationHtml(html);
      })
      .catch((error) => console.error('Error fetching visualization:', error));
  }, []);

  return (
    <Layout>
      <section className="text-center max-w-5xl mx-auto">
        <h2 className="page-title">Network Visualization</h2>
        <p className="subtitle">
          Explore the connections between people in your social network with this interactive visualization.
        </p>
        
        <div className="glass-panel p-6 animate-fade-in mt-8">
          {visualizationHtml ? (
            <iframe
              srcDoc={visualizationHtml}
              width="100%"
              height="600px"
              title="Network Visualization"
            />
          ) : (
            <p className="text-gray-500">Loading visualization...</p>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Visualize;