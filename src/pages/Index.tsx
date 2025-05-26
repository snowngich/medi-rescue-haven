
import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import UserDashboard from './UserDashboard';
import ResponderDashboard from './ResponderDashboard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import PartnersSection from '@/components/sections/PartnersSection';
import ContactSection from '@/components/sections/ContactSection';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { user, userProfile, loading } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    // Animation observer for scroll animations
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    // Get all elements that need to be animated
    const animatedElements = document.querySelectorAll('.reveal-animation');
    animatedElements.forEach(el => animationObserver.observe(el));

    // Show welcome toast only for non-authenticated users
    if (!user && !loading) {
      toast({
        title: "Welcome to MediRescue",
        description: "Help is just a tap away. Need assistance? Try our AI chat in the bottom right.",
        duration: 6000,
      });
    }

    // Clean up
    return () => animationObserver.disconnect();
  }, [toast, user, loading]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated, show role-based dashboard
  if (user && userProfile) {
    if (userProfile.role === 'responder') {
      return <ResponderDashboard />;
    } else {
      return <UserDashboard />;
    }
  }

  // If not authenticated, show the marketing homepage
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <PartnersSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
