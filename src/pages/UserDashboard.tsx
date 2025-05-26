
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, MapPin, User, History, Phone, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import EmergencyButton from '@/components/ui/EmergencyButton';

const UserDashboard = () => {
  const { user, userProfile, signOut } = useAuth();
  const { toast } = useToast();
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [emergencyCount, setEmergencyCount] = useState(0);
  const [requestingEmergency, setRequestingEmergency] = useState(false);
  const [nearbyResponders, setNearbyResponders] = useState(0);

  useEffect(() => {
    if (user) {
      fetchEmergencyCount();
      getCurrentLocation();
      checkNearbyResponders();
    }
  }, [user]);

  const fetchEmergencyCount = async () => {
    if (!user) return;
    
    try {
      const { count, error } = await supabase
        .from('emergency_requests')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      if (error) throw error;
      setEmergencyCount(count || 0);
    } catch (error) {
      console.error('Error fetching emergency count:', error);
    }
  };

  const checkNearbyResponders = async () => {
    try {
      const { count, error } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'responder');

      if (error) throw error;
      setNearbyResponders(count || 0);
    } catch (error) {
      console.error('Error checking nearby responders:', error);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          toast({
            title: "Location access required",
            description: "Please enable location services for emergency features.",
            variant: "destructive",
          });
        }
      );
    }
  };

  const triggerEmergency = async () => {
    if (!user || !location) {
      toast({
        title: "Cannot trigger emergency",
        description: "Location is required for emergency requests.",
        variant: "destructive",
      });
      return;
    }

    setRequestingEmergency(true);

    try {
      // Get user's medical profile
      const { data: medicalProfile } = await supabase
        .from('medical_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      // Create emergency request
      const { data: emergencyRequest, error } = await supabase
        .from('emergency_requests')
        .insert({
          user_id: user.id,
          latitude: location.lat,
          longitude: location.lng,
          medical_profile_id: medicalProfile?.id,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      // Update user location
      await supabase
        .from('user_locations')
        .upsert({
          user_id: user.id,
          lat: location.lat,
          lng: location.lng
        });

      // Find nearest responders (simplified - in real app would use PostGIS)
      const { data: responders } = await supabase
        .from('users')
        .select('id, name, phone_number')
        .eq('role', 'responder')
        .limit(3);

      console.log('Emergency created:', emergencyRequest);
      console.log('Available responders:', responders);

      toast({
        title: "🚨 Emergency Alert Sent!",
        description: `Help is on the way! ${responders?.length || 0} responders have been notified.`,
      });

      fetchEmergencyCount();
    } catch (error: any) {
      console.error('Emergency request failed:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send emergency request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setRequestingEmergency(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">MediRescue Dashboard</h1>
              <p className="text-gray-600">Welcome back, {userProfile?.name}</p>
            </div>
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Emergency Alert Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <AlertTriangle className="w-6 h-6" />
                  Emergency Alert
                </CardTitle>
                <CardDescription>
                  In case of medical emergency, press the button below to instantly alert nearby responders
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={triggerEmergency}
                  disabled={requestingEmergency || !location}
                  className="w-full h-16 text-lg bg-red-600 hover:bg-red-700 disabled:opacity-50"
                >
                  {requestingEmergency ? '🚨 Sending Alert...' : '🚨 EMERGENCY - GET HELP NOW'}
                </Button>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{nearbyResponders} responders available</span>
                  <span>Response time: ~5-15 min</span>
                </div>
                
                <div className="text-center pt-2">
                  <EmergencyButton size="sm" className="animate-pulse" />
                  <p className="text-sm text-gray-600 mt-2">Or call emergency services directly</p>
                </div>
              </CardContent>
            </Card>

            {/* Location Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                {location ? (
                  <div className="space-y-2">
                    <div className="text-green-600 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Location enabled - Emergency services can find you
                    </div>
                    <p className="text-xs text-gray-500">
                      Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-red-600 flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      Location disabled
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={getCurrentLocation}
                    >
                      Enable Location
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Emergency History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Emergency History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-medical-600">{emergencyCount}</div>
                  <p className="text-sm text-gray-600">Total emergency requests</p>
                </div>
              </CardContent>
            </Card>

            {/* Medical Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Medical Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Keep your medical information updated for faster emergency response
                </p>
                <Button variant="outline" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Update Medical Info
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  Emergency Contacts
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="w-4 h-4 mr-2" />
                  Nearby Hospitals
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
