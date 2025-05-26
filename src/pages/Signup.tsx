
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Phone } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Signup = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: 'user' as 'user' | 'responder'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signUp(formData.email, formData.password, {
        name: `${formData.firstName} ${formData.lastName}`,
        phone_number: formData.phoneNumber,
        role: formData.role
      });
      navigate('/login');
    } catch (error) {
      // Error is handled in the useAuth hook
    } finally {
      setLoading(false);
    }
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
                <Input 
                  id="first-name" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input 
                  id="last-name" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your@email.com" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                type="tel" 
                placeholder="+1 (123) 456-7890" 
                value={formData.phoneNumber}
                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                required 
              />
            </div>

            <div className="space-y-3">
              <Label>Account Type</Label>
              <RadioGroup 
                value={formData.role} 
                onValueChange={(value: 'user' | 'responder') => setFormData({...formData, role: value})}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="user" id="user" />
                  <Label htmlFor="user">User (Need emergency help)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="responder" id="responder" />
                  <Label htmlFor="responder">Responder (Medical professional)</Label>
                </div>
              </RadioGroup>
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
            
            <Button 
              type="submit" 
              className="w-full bg-medical-600 hover:bg-medical-700"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
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
