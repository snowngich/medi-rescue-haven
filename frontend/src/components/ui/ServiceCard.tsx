
import { cn } from '@/lib/utils';
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
}

const ServiceCard = ({
  title,
  description,
  icon: Icon,
  className,
  iconClassName,
}: ServiceCardProps) => {
  return (
    <div className={cn(
      'glass-card rounded-2xl p-6 group transition-all duration-300 h-full',
      'hover:translate-y-[-5px]',
      className
    )}>
      <div className={cn(
        'w-12 h-12 rounded-full flex items-center justify-center mb-5',
        'bg-medical-100 text-medical-700',
        'group-hover:bg-medical-600 group-hover:text-white',
        'transition-colors duration-300',
        iconClassName
      )}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-neutral-800 group-hover:text-medical-700 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-neutral-600">
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;
