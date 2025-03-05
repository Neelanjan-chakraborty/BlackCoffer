
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { UserPlus, Users, Network, Home } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="glass-panel sticky top-4 mx-4 mt-4 mb-8 px-6 py-4 z-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-2xl font-display font-bold text-gray-900 mb-4 md:mb-0">
            <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <Network className="text-primary h-6 w-6" />
              <span>Social Network</span>
            </Link>
          </h1>
          <nav className="flex items-center space-x-6">
            <Link to="/" className={cn("nav-link flex items-center gap-2", isActive('/') && "nav-link-active")}>
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link to="/add-person" className={cn("nav-link flex items-center gap-2", isActive('/add-person') && "nav-link-active")}>
              <UserPlus className="h-4 w-4" />
              <span>Add Person</span>
            </Link>
            <Link to="/add-friendship" className={cn("nav-link flex items-center gap-2", isActive('/add-friendship') && "nav-link-active")}>
              <Users className="h-4 w-4" />
              <span>Add Friendship</span>
            </Link>
            <Link to="/visualize" className={cn("nav-link flex items-center gap-2", isActive('/visualize') && "nav-link-active")}>
              <Network className="h-4 w-4" />
              <span>Visualize</span>
            </Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 pb-16 flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;
