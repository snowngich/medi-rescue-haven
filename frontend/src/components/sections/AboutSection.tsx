
import React, { useEffect, useRef } from 'react';
import { Clock, Shield, HeartPulse, MapPin } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Immediate Response Time',
    description: 'Our platform connects you to help in seconds, drastically reducing traditional emergency response delays.'
  },
  {
    icon: Shield,
    title: 'Reliable Connection',
    description: 'Advanced technology ensures you\'re never cut off from emergency services when you need them most.'
  },
  {
    icon: HeartPulse,
    title: 'AI-Powered Dispatch',
    description: 'Smart algorithms match your emergency with the nearest and most appropriate medical resources.'
  },
  {
    icon: MapPin,
    title: 'Precise Location Tracking',
    description: 'Our system accurately pinpoints your location to guide responders directly to you in an emergency.'
  }
];

const AboutSection = () => {
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
    <section id="about" className="py-20 bg-neutral-50" ref={sectionRef}>
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative reveal-animation">
            <div className="relative rounded-2xl overflow-hidden shadow-premium">
              <img
                src="https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&w=1000&q=80"
                alt="Emergency Medical Connection Platform"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-subtle p-4 max-w-xs">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <p className="font-semibold text-sm">Always Connected</p>
              </div>
              <p className="text-neutral-600 text-sm">
                Our platform ensures you're always connected to emergency help, no matter where you are
              </p>
            </div>
          </div>

          {/* Content Side */}
          <div className="stagger-animation">
            <span className="inline-block px-3 py-1 rounded-full bg-medical-100 text-medical-700 font-medium text-sm mb-5 reveal-animation">About MediRescue</span>
            <h2 className="section-title reveal-animation">Bridging The Gap Between You And Emergency Help</h2>
            <p className="text-lg text-neutral-600 mb-8 reveal-animation">
              Traditional systems often have inefficiencies that make emergency medical response slow and complicated. MediRescue was created to solve this critical problem by instantly connecting patients to the help they need when every second counts.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 reveal-animation">
              {features.map((feature, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <feature.icon className="w-6 h-6 text-medical-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                    <p className="text-neutral-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
