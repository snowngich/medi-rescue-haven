
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import TeamSection from '@/components/sections/TeamSection';
import ContactSection from '@/components/sections/ContactSection';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
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

    // Show welcome toast
    toast({
      title: "Welcome to MediRescue",
      description: "Help is just a tap away. Explore how we connect patients to emergency assistance.",
      duration: 5000,
    });

    // Clean up
    return () => animationObserver.disconnect();
  }, [toast]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <TeamSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
