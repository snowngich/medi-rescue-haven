
import { cn } from '@/lib/utils';
import React from 'react';

interface TeamMemberProps {
  name: string;
  role: string;
  imageSrc: string;
  className?: string;
}

const TeamMember = ({
  name,
  role,
  imageSrc,
  className,
}: TeamMemberProps) => {
  return (
    <div className={cn(
      'flex flex-col items-center transition-all duration-300',
      'group hover:translate-y-[-5px]',
      className
    )}>
      <div className="relative rounded-full overflow-hidden w-40 h-40 mb-4">
        <div className="absolute inset-0 bg-gradient-to-b from-medical-500/0 to-medical-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <img 
          src={imageSrc} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <h3 className="text-xl font-semibold text-neutral-800">{name}</h3>
      <p className="text-medical-600 font-medium">{role}</p>
    </div>
  );
};

export default TeamMember;
