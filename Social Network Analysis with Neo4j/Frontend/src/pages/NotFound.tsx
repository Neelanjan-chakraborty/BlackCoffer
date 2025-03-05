
import React from 'react';
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center glass-panel p-12 max-w-md animate-fade-in">
        <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <Link to="/" className="btn-primary inline-block">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
