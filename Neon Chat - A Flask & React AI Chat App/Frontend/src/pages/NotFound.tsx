
import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-12 px-4 animate-page-in">
      <div className="text-center max-w-md glass-morphism p-8 rounded-xl shadow-neon-md">
        <div className="flex justify-center mb-6">
          <div className="text-8xl font-bold neon-text">404</div>
        </div>
        <h1 className="text-2xl font-bold mb-3">Page Not Found</h1>
        <p className="text-white/70 mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button
          className="bg-blue-purple-gradient hover:shadow-neon-md transition-all duration-300 button-hover-effect"
          asChild
        >
          <Link to="/">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
