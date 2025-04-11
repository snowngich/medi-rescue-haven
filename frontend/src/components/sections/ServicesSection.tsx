
import React, { useEffect, useRef } from 'react';
import ServiceCard from '../ui/ServiceCard';
import { Ambulance, Heart, HeartPulse, UserRound, FileText, MapPin, Phone, Clock, Shield } from 'lucide-react';

const services = [
  {
    title: 'Digital Health Briefing',
    description: 'Secure access to your medical history for informed treatment during emergencies.',
    icon: FileText
  },
  {
    title: 'Live Emergency Dispatch',
    description: 'Immediate connection to medical teams, hospitals, and ambulance services when you need them.',
    icon: Ambulance
  },
  {
    title: 'Smart Location Detection',
    description: 'AI-powered location tracking pinpoints the closest available responders, cutting down critical delays.',
    icon: MapPin
  },
  {
    title: 'Emergency Responder Network',
    description: 'Connect with nearby medical professionals instantly through our extensive professional network.',
    icon: UserRound
  },
  {
    title: 'Multi-Channel Communication',
    description: 'Seamless coordination through calls, SMS, and in-app alerts keeps everyone informed and response quick.',
    icon: Phone
  },
  {
    title: 'One-Tap Emergency Request',
    description: 'Summon help effortlessly with just a single tap when every second counts in a medical emergency.',
    icon: Clock
  }
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.reveal-animation');
      elements.forEach(el => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-20 bg-white" ref={sectionRef}>
      <div className="section-container">
        <div className="text-center mb-16 stagger-animation">
          <span className="inline-block px-3 py-1 rounded-full bg-medical-100 text-medical-700 font-medium text-sm mb-5 reveal-animation">Our Services</span>
          <h2 className="section-title reveal-animation">Revolutionizing Emergency Medical Response</h2>
          <p className="section-subtitle mx-auto reveal-animation">
            When medical responses are delayed, it can lead to serious health complications. MediRescue provides faster, more reliable access to emergency assistance when every second counts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={service.title} className="reveal-animation" style={{ transitionDelay: `${0.1 + index * 0.1}s` }}>
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
