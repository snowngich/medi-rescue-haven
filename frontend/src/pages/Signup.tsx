
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Phone } from 'lucide-react';

const Signup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup success
    toast({
      title: "Account created successfully",
      description: "Welcome to MediRescue! Your profile has been set up.",
    });
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center w-full px-4 sm:px-6 lg:px-8 lg:w-1/2 xl:w-2/5">
        <div className="w-full max-w-sm mx-auto space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="text-neutral-500">Enter your information to get started</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+1 (123) 456-7890" required />
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox id="terms" className="mt-1" />
              <Label htmlFor="terms" className="text-sm font-normal">
                I agree to the{' '}
                <Link to="/terms" className="text-medical-600 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-medical-600 hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>
            
            <Button type="submit" className="w-full bg-medical-600 hover:bg-medical-700">
              Create Account
            </Button>
          </form>
          
          <div className="mt-4 text-center text-sm">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-medical-600 hover:underline">
                Log in
              </Link>
            </p>
          </div>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-neutral-50 text-neutral-500">Or continue with</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">
              Google
            </Button>
            <Button variant="outline" className="w-full">
              Apple
            </Button>
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/" className="text-medical-600 hover:underline flex items-center justify-center gap-2">
              <Phone size={16} />
              <span>Emergency? Skip signup</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 xl:w-3/5 bg-medical-100">
        <div className="h-full w-full relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80" 
            alt="Medical Emergency Response" 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-medical-600/30 to-medical-800/50"></div>
          <div className="absolute inset-0 flex flex-col justify-center p-12 text-white">
            <h2 className="text-4xl font-bold mb-4">Be prepared for emergencies</h2>
            <p className="text-xl max-w-lg">
              Creating an account allows us to store your medical information and emergency contacts, ensuring faster and more effective help when you need it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
