import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, MessageSquare, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-8",
        isScrolled ? "glass-morphism backdrop-blur-lg" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold neon-text">NeonChat</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 items-center">
          {!isAuthenticated && (
            <>
              {['Features', 'Developer', 'Pricing'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative text-white/80 hover:text-white transition-colors duration-300 overflow-hidden group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-glow group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </>
          )}

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
              {/* <NavLink to="/login">Login</NavLink> */}
              <Link to="/signup">
                <Button
                  className="bg-gradient-to-r from-purple-600 to-purple-900 text-white 
                  hover:shadow-[0_0_15px_rgba(147,51,234,0.5)] 
                  hover:scale-105
                  active:scale-95
                  transition-all duration-300
                  transform"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="block md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden"
        >
          <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4">
            {isAuthenticated ? (
              <>
                <MobileNavLink to="/profile" onClick={closeMobileMenu}>
                  <User className="w-5 h-5 mr-2" />
                  Profile
                </MobileNavLink>
                <MobileNavLink to="/chat" onClick={closeMobileMenu}>
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Chat
                </MobileNavLink>
                <Button
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  variant="ghost"
                  className="flex items-center w-full justify-center button-hover-effect"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                {['Home', 'Features', 'Developer', 'Pricing'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-white/80 hover:text-white text-xl transition-colors duration-300 w-full text-center py-2"
                    onClick={closeMobileMenu}
                  >
                    {item}
                  </a>
                ))}
                <MobileNavLink to="/login" onClick={closeMobileMenu}>
                  Login
                </MobileNavLink>
                <Link to="/signup">
                  <Button
                    onClick={closeMobileMenu}
                    className="bg-blue-purple-gradient hover:shadow-neon-md transition-all duration-300 w-full"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

// Helper Components
const NavLink = ({ to, children }) => {
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

const MobileNavLink = ({ to, onClick, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center text-sm font-medium p-2 rounded-lg transition-all duration-300 w-full text-center ${
        isActive
          ? 'bg-white/10 text-white'
          : 'text-white/70 hover:bg-white/5 hover:text-white'
      }`}
    >
      {children}
    </Link>
  );
};

export default Header;