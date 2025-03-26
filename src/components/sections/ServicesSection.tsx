
import React, { useEffect, useRef } from 'react';
import ServiceCard from '../ui/ServiceCard';
import { Ambulance, Heart, HeartPulse, UserRound, BookOpen, Home } from 'lucide-react';

const services = [
  {
    title: 'Emergency Response',
    description: 'Immediate medical attention from our expert teams with fully equipped ambulances available 24/7.',
    icon: Ambulance
  },
  {
    title: 'Critical Care',
    description: 'Specialized care for life-threatening emergencies with advanced medical equipment and trained professionals.',
    icon: HeartPulse
  },
  {
    title: 'Medical Transport',
    description: 'Safe and comfortable transportation for patients requiring medical attention while in transit.',
    icon: Heart
  },
  {
    title: 'Emergency Doctors',
    description: 'Access to experienced emergency physicians for immediate medical consultation and treatment.',
    icon: UserRound
  },
  {
    title: 'First Aid Training',
    description: 'Comprehensive training programs to equip individuals with essential life-saving skills and knowledge.',
    icon: BookOpen
  },
  {
    title: 'Home Care Services',
    description: 'Professional medical assistance in the comfort of your home for recovery and ongoing treatment.',
    icon: Home
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
          <h2 className="section-title reveal-animation">Comprehensive Emergency Medical Services</h2>
          <p className="section-subtitle mx-auto reveal-animation">
            We provide a range of professional medical emergency services with state-of-the-art equipment and highly trained personnel.
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
