
import React, { useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactSection = () => {
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

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Our Location',
      content: '123 Rescue Avenue, Medical District, CA 90210',
    },
    {
      icon: Phone,
      title: 'Phone Number',
      content: <><a href="tel:911" className="text-medical-700 font-semibold hover:underline">Emergency: 911</a><br /><a href="tel:+11234567890" className="hover:underline">Office: (123) 456-7890</a></>,
    },
    {
      icon: Mail,
      title: 'Email Address',
      content: <a href="mailto:info@medirescue.com" className="hover:underline">info@medirescue.com</a>,
    },
    {
      icon: Clock,
      title: 'Working Hours',
      content: 'Emergency Services: 24/7<br />Office Hours: Mon-Fri, 8am-6pm',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-neutral-50" ref={sectionRef}>
      <div className="section-container">
        <div className="text-center mb-16 stagger-animation">
          <span className="inline-block px-3 py-1 rounded-full bg-medical-100 text-medical-700 font-medium text-sm mb-5 reveal-animation">Contact Us</span>
          <h2 className="section-title reveal-animation">Get In Touch With Our Team</h2>
          <p className="section-subtitle mx-auto reveal-animation">
            Have questions or need more information? We're here to help you with all your emergency medical service needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <div className="reveal-animation">
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6">Send us a message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-neutral-700">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-neutral-700">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block mb-2 text-sm font-medium text-neutral-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition-all"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-neutral-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition-all"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-medical-600 text-white font-medium rounded-lg hover:bg-medical-700 transition-colors focus:outline-none focus:ring-4 focus:ring-medical-500/30"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8 reveal-animation">
            <div className="glass-card rounded-2xl overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423283.43556031643!2d-118.69192051215673!3d34.02073049448939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1692653194954!5m2!1sen!2s" 
                width="100%" 
                height="250" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="MediRescue Location"
              ></iframe>
            </div>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-medical-100 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-medical-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-neutral-600" dangerouslySetInnerHTML={{ __html: typeof item.content === 'string' ? item.content : '' }}></p>
                    {typeof item.content !== 'string' && item.content}
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

export default ContactSection;
