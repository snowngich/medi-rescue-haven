
import React, { useEffect, useRef } from 'react';
import TeamMember from '../ui/TeamMember';

const teamMembers = [
  {
    name: 'Dr. Sarah Johnson',
    role: 'Medical Director',
    imageSrc: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Dr. Michael Chen',
    role: 'Emergency Physician',
    imageSrc: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Emma Rodriguez',
    role: 'Head Paramedic',
    imageSrc: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'David Thompson',
    role: 'Critical Care Specialist',
    imageSrc: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80'
  }
];

const TeamSection = () => {
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
    <section id="team" className="py-20 bg-white" ref={sectionRef}>
      <div className="section-container">
        <div className="text-center mb-16 stagger-animation">
          <span className="inline-block px-3 py-1 rounded-full bg-medical-100 text-medical-700 font-medium text-sm mb-5 reveal-animation">Our Team</span>
          <h2 className="section-title reveal-animation">Meet Our Expert Medical Team</h2>
          <p className="section-subtitle mx-auto reveal-animation">
            Our highly trained professionals are dedicated to providing the best emergency medical care possible.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-12">
          {teamMembers.map((member, index) => (
            <div key={member.name} className="reveal-animation" style={{ transitionDelay: `${0.1 + index * 0.1}s` }}>
              <TeamMember
                name={member.name}
                role={member.role}
                imageSrc={member.imageSrc}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
