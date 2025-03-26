
import React from 'react';
import { cn } from '@/lib/utils';
import { Phone } from 'lucide-react';

interface EmergencyButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  phoneNumber?: string;
  size?: 'sm' | 'md' | 'lg';
}

const EmergencyButton = ({
  className,
  phoneNumber = "911",
  size = 'md',
  ...props
}: EmergencyButtonProps) => {
  // Map size to appropriate classes
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-5 py-2.5',
    lg: 'text-lg px-7 py-3.5'
  };

  return (
    <a 
      href={`tel:${phoneNumber}`}
      className={cn(
        'group flex items-center justify-center gap-2 rounded-full bg-medical-500 text-white font-medium transition-all',
        'hover:bg-medical-600 focus:outline-none focus:ring-4 focus:ring-medical-300',
        'shadow-elevated animate-pulse-emergency',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
      <span>Emergency Call</span>
    </a>
  );
};

export default EmergencyButton;
