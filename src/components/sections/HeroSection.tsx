
import React, { useEffect, useRef } from 'react';
import EmergencyButton from '../ui/EmergencyButton';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    if (heroRef.current) {
      const elements = heroRef.current.querySelectorAll('.reveal-animation');
      elements.forEach(el => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="min-h-screen relative flex items-center bg-gradient-to-b from-medical-100 to-white pt-20">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=3506&q=80')] bg-cover bg-center opacity-[0.03] z-0"></div>
      
      <div className="section-container relative z-10" ref={heroRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="stagger-animation">
            <span className="inline-block px-3 py-1 rounded-full bg-medical-100 text-medical-700 font-medium text-sm mb-5 reveal-animation">24/7 Emergency Medical Response</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 reveal-animation">
              Rapid Medical <span className="text-medical-600">Emergency</span> Response
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-xl reveal-animation">
              Professional medical rescue services with state-of-the-art equipment and highly trained personnel available around the clock.
            </p>
            <div className="flex flex-wrap gap-4 reveal-animation">
              <EmergencyButton size="lg" />
              <a 
                href="#services" 
                className="inline-flex items-center justify-center rounded-full bg-white border border-neutral-200 px-7 py-3.5 text-lg font-medium text-neutral-800 hover:bg-neutral-50 transition-colors shadow-subtle"
              >
                Our Services
              </a>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative reveal-animation">
            <div className="absolute inset-0 bg-gradient-radial from-medical-100/50 to-transparent rounded-2xl -m-6"></div>
            <div className="glass-card rounded-2xl overflow-hidden shadow-premium relative">
              <img 
                src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1000&q=80" 
                alt="Medical Emergency Team" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="font-medium">Our response teams are equipped with advanced life support technology</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
