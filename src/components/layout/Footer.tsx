
import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-50 pt-16 pb-8 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <h3 className="text-xl font-bold text-neutral-800 mb-4">MediRescue</h3>
            <p className="text-neutral-600 mb-4 max-w-xs">
              Professional medical emergency services available 24/7 to provide immediate assistance when you need it most.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-600 hover:text-medical-600 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-600 hover:text-medical-600 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-neutral-600 hover:text-medical-600 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-neutral-600 hover:text-medical-600 transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Team', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-neutral-600 hover:text-medical-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Our Services</h3>
            <ul className="space-y-2">
              {[
                'Emergency Response', 
                'Medical Transport', 
                'Critical Care', 
                'First Aid Training', 
                'Home Care'
              ].map((item) => (
                <li key={item}>
                  <a href="#services" className="text-neutral-600 hover:text-medical-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-medical-600 mr-2 mt-0.5" />
                <span className="text-neutral-600">
                  123 Rescue Avenue<br />Medical District, CA 90210
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-medical-600 mr-2" />
                <a href="tel:911" className="text-neutral-600 hover:text-medical-600 transition-colors">
                  Emergency: 911
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-medical-600 mr-2" />
                <a href="tel:+11234567890" className="text-neutral-600 hover:text-medical-600 transition-colors">
                  Office: (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-medical-600 mr-2" />
                <a href="mailto:info@medirescue.com" className="text-neutral-600 hover:text-medical-600 transition-colors">
                  info@medirescue.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-200 pt-8 text-center text-neutral-500">
          <p>&copy; {new Date().getFullYear()} MediRescue. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
