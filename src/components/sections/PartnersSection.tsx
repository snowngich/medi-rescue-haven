
import React, { useEffect, useRef } from 'react';
import TeamMember from '../ui/TeamMember';

const partnerOrganizations = [
  {
    name: 'Nairobi Hospital',
    role: 'Premier Healthcare Provider',
    imageSrc: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Kenyatta National Hospital',
    role: 'Leading Public Medical Center',
    imageSrc: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Aga Khan University Hospital',
    role: 'Advanced Medical Services',
    imageSrc: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Nairobi Ambulance Services',
    role: 'Emergency Medical Transport',
    imageSrc: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=800&q=80'
  }
];

const PartnersSection = () => {
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
    <section id="partners" className="py-20 bg-white" ref={sectionRef}>
      <div className="section-container">
        <div className="text-center mb-16 stagger-animation">
          <span className="inline-block px-3 py-1 rounded-full bg-medical-100 text-medical-700 font-medium text-sm mb-5 reveal-animation">Our Partners</span>
          <h2 className="section-title reveal-animation">We Work With Leading Medical Facilities</h2>
          <p className="section-subtitle mx-auto reveal-animation">
            MediRescue connects you with Kenya's top hospitals and medical service providers for the best emergency care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-12">
          {partnerOrganizations.map((partner, index) => (
            <div key={partner.name} className="reveal-animation" style={{ transitionDelay: `${0.1 + index * 0.1}s` }}>
              <TeamMember
                name={partner.name}
                role={partner.role}
                imageSrc={partner.imageSrc}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
