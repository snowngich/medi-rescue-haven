
import React, { useEffect, useRef, useState } from 'react';
import EmergencyButton from '../ui/EmergencyButton';
import { Card, CardContent } from '../ui/card';
import { MapPin, Clock, Shield, Phone, FileText } from 'lucide-react';

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
    <section className="min-h-screen relative flex items-center bg-gradient-to-b from-medical-100 to-white pt-20 overflow-hidden">
      {/* Background overlay with medical emergency scene */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587351021759-3e566b3db3f7?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-[0.15] z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-medical-900/30 to-white/80 z-0"></div>
      
      <div className="section-container relative z-10" ref={heroRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="stagger-animation">
            <span className="inline-block px-3 py-1 rounded-full bg-medical-100 text-medical-700 font-medium text-sm mb-5 reveal-animation">When Every Second Counts</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 reveal-animation">
              Connecting You To <span className="text-medical-600">Emergency</span> Help Instantly
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-xl reveal-animation">
              MediRescue revolutionizes emergency medical response by connecting those in need with help—instantly, ensuring swift assistance when it matters most.
            </p>
            <div className="flex flex-wrap gap-4 reveal-animation">
              <EmergencyButton size="lg" />
              <a 
                href="#services" 
                className="inline-flex items-center justify-center rounded-full bg-white border border-neutral-200 px-7 py-3.5 text-lg font-medium text-neutral-800 hover:bg-neutral-50 transition-colors shadow-subtle"
              >
                How It Works
              </a>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative reveal-animation">
            <div className="absolute inset-0 bg-gradient-radial from-medical-100/50 to-transparent rounded-2xl -m-6"></div>
            <div className="glass-card rounded-2xl overflow-hidden shadow-premium relative">
              <img 
                src="https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?auto=format&fit=crop&w=1000&q=80" 
                alt="Emergency Medical App Interface" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="font-medium">Instant one-tap emergency alerts connect you to help when you need it most</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features Grid */}
        <div className="mt-16 reveal-animation">
          <h2 className="text-2xl font-bold mb-6 text-center">What MediRescue Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FeatureCard 
              icon={Phone}
              title="Omni-Channel Response"
              description="Simultaneous alerts via voice call, text message, and push notification"
            />
            <FeatureCard 
              icon={MapPin}
              title="Smart Location Detection"
              description="Automatic GPS and AI tracking to locate nearest responders"
            />
            <FeatureCard 
              icon={Clock}
              title="Instant Alert Activation"
              description="Single-button emergency triggering for rapid response"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  const [imgLoaded, setImgLoaded] = useState(true);

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-medical-200">
      <div className="p-6">
        <div className="mb-4 w-12 h-12 rounded-full bg-medical-100 flex items-center justify-center text-medical-600 group-hover:bg-medical-600 group-hover:text-white transition-colors duration-300">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-neutral-600">{description}</p>
      </div>
    </Card>
  );
};

export default HeroSection;
