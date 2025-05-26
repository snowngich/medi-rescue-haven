
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, LogIn, User } from 'lucide-react';
import EmergencyButton from '../ui/EmergencyButton';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled 
        ? 'backdrop-blur-md bg-white/80 shadow-subtle py-3' 
        : 'bg-transparent py-5'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-medical-700">MediRescue</span>
          </Link>

          {/* Desktop Navigation - Simplified */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-neutral-700 font-medium hover:text-medical-600 transition-colors duration-200 link-underline"
            >
              Home
            </Link>
          </nav>

          {/* Auth & Emergency Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="sm" className="flex items-center gap-1 border-medical-200">
                <User className="w-4 h-4" />
                <span>Sign Up</span>
              </Button>
            </Link>
            <EmergencyButton size="sm" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-neutral-700" />
            ) : (
              <Menu className="w-6 h-6 text-neutral-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden absolute w-full bg-white shadow-md transition-all duration-300 ease-in-out',
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
          <Link
            to="/"
            className="block py-2 text-neutral-700 font-medium hover:text-medical-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link to="/login" className="block" onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-center">Login</Button>
            </Link>
            <Link to="/signup" className="block" onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-center">Sign Up</Button>
            </Link>
          </div>
          <div className="pt-2">
            <EmergencyButton className="w-full justify-center" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
