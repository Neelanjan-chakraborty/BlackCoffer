
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { MessageSquare, User, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        isScrolled
          ? 'glass-morphism shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold neon-text">NeonChat</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <NavLink to="/profile">
                <User className="w-5 h-5 mr-1" />
                Profile
              </NavLink>
              <NavLink to="/chat">
                <MessageSquare className="w-5 h-5 mr-1" />
                Chat
              </NavLink>
              <Button
                onClick={logout}
                variant="ghost"
                className="button-hover-effect text-white flex items-center gap-1"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">
                <Button className="bg-blue-purple-gradient hover:shadow-neon-md transition-all duration-300">
                  Sign Up
                </Button>
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden container mx-auto mt-4 pb-4 animate-fade-in">
          <div className="flex flex-col gap-4 glass-morphism p-4 rounded-xl">
            {isAuthenticated ? (
              <>
                <MobileNavLink to="/profile" onClick={toggleMenu}>
                  <User className="w-5 h-5 mr-2" />
                  Profile
                </MobileNavLink>
                <MobileNavLink to="/chat" onClick={toggleMenu}>
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Chat
                </MobileNavLink>
                <Button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  variant="ghost"
                  className="flex items-center justify-center button-hover-effect w-full"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <MobileNavLink to="/login" onClick={toggleMenu}>
                  Login
                </MobileNavLink>
                <MobileNavLink to="/signup" onClick={toggleMenu}>
                  <span className="bg-blue-purple-gradient px-4 py-2 rounded-lg w-full text-center">
                    Sign Up
                  </span>
                </MobileNavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

// Helper Components for NavLinks
const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center text-sm font-medium transition-all duration-300 ${
        isActive
          ? 'text-white'
          : 'text-white/70 hover:text-white'
      }`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({
  to,
  onClick,
  children,
}: {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center text-sm font-medium p-2 rounded-lg transition-all duration-300 ${
        isActive
          ? 'bg-white/10 text-white'
          : 'text-white/70 hover:bg-white/5 hover:text-white'
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;
