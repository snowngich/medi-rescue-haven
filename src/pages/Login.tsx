
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Phone } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      navigate('/');
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
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-neutral-500">Enter your credentials to access your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-medical-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm font-normal">Remember me</Label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-medical-600 hover:bg-medical-700"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          
          <div className="mt-4 text-center text-sm">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="text-medical-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/" className="text-medical-600 hover:underline flex items-center justify-center gap-2">
              <Phone size={16} />
              <span>Emergency? Skip login</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 xl:w-3/5 bg-medical-100">
        <div className="h-full w-full relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80" 
            alt="Medical Emergency Response" 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-medical-600/30 to-medical-800/50"></div>
          <div className="absolute inset-0 flex flex-col justify-center p-12 text-white">
            <h2 className="text-4xl font-bold mb-4">Every second counts in an emergency</h2>
            <p className="text-xl max-w-lg">
              MediRescue connects you to emergency medical services instantly, because when it matters most, you shouldn't have to wait.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
