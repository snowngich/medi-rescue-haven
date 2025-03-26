
import React, { useEffect, useRef } from 'react';
import { CheckCircle2, Clock, HeartPulse, Shield } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Our emergency response teams are available around the clock to provide immediate assistance.'
  },
  {
    icon: Shield,
    title: 'Certified Professionals',
    description: 'All our medical staff are certified professionals with extensive emergency response training.'
  },
  {
    icon: HeartPulse,
    title: 'Advanced Equipment',
    description: 'We utilize state-of-the-art medical equipment to provide the best possible care during emergencies.'
  },
  {
    icon: CheckCircle2,
    title: 'Rapid Response',
    description: 'Our teams are strategically positioned to ensure the quickest possible response times.'
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
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80"
                alt="Medical Emergency Team in Action"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-subtle p-4 max-w-xs">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <p className="font-semibold text-sm">Always Ready to Respond</p>
              </div>
              <p className="text-neutral-600 text-sm">
                Our emergency teams maintain a constant state of readiness to respond within minutes
              </p>
            </div>
          </div>

          {/* Content Side */}
          <div className="stagger-animation">
            <span className="inline-block px-3 py-1 rounded-full bg-medical-100 text-medical-700 font-medium text-sm mb-5 reveal-animation">About MediRescue</span>
            <h2 className="section-title reveal-animation">We're Committed to Saving Lives</h2>
            <p className="text-lg text-neutral-600 mb-8 reveal-animation">
              MediRescue was founded with a clear mission: to provide fast, reliable, and professional emergency medical services when they're needed most. With decades of combined experience, our team is dedicated to delivering exceptional care in critical situations.
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
