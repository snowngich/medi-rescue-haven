
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, MapPin, Users, Search, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface EmergencyRequest {
  id: string;
  user_id: string;
  latitude: number | null;
  longitude: number | null;
  status: 'pending' | 'dispatched' | 'resolved';
  responder_note: string | null;
  created_at: string;
  users: {
    name: string;
    phone_number: string;
  };
  medical_profiles?: {
    blood_type: string | null;
    conditions: string[] | null;
    allergies: string[] | null;
    medications: string[] | null;
  };
}

const ResponderDashboard = () => {
  const { userProfile, signOut } = useAuth();
  const { toast } = useToast();
  const [emergencyRequests, setEmergencyRequests] = useState<EmergencyRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<EmergencyRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmergencyRequests();
    
    // Subscribe to real-time updates
    const subscription = supabase
      .channel('emergency_requests')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'emergency_requests' },
        () => {
          fetchEmergencyRequests();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    filterRequests();
  }, [emergencyRequests, searchTerm, statusFilter]);

  const fetchEmergencyRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('emergency_requests')
        .select(`
          *,
          users (name, phone_number),
          medical_profiles (blood_type, conditions, allergies, medications)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEmergencyRequests(data || []);
    } catch (error) {
      console.error('Error fetching emergency requests:', error);
      toast({
        title: "Error",
        description: "Failed to load emergency requests",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterRequests = () => {
    let filtered = emergencyRequests;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(req => req.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(req => 
        req.users.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.users.phone_number.includes(searchTerm)
      );
    }

    setFilteredRequests(filtered);
  };

  const updateRequestStatus = async (requestId: string, status: 'pending' | 'dispatched' | 'resolved', note?: string) => {
    try {
      const { error } = await supabase
        .from('emergency_requests')
        .update({ 
          status,
          responder_note: note || null
        })
        .eq('id', requestId);

      if (error) throw error;

      toast({
        title: "Status updated",
        description: `Emergency request marked as ${status}`,
      });

      fetchEmergencyRequests();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'destructive',
      dispatched: 'default', 
      resolved: 'secondary'
    } as const;
    
    return <Badge variant={variants[status as keyof typeof variants]}>{status.toUpperCase()}</Badge>;
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const hours = Math.floor(diffInMinutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading emergency requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Responder Dashboard</h1>
              <p className="text-gray-600">Welcome, {userProfile?.name}</p>
            </div>
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                Active Emergencies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {emergencyRequests.filter(req => req.status === 'pending').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <Clock className="w-5 h-5" />
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {emergencyRequests.filter(req => req.status === 'dispatched').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-green-600">
                <Users className="w-5 h-5" />
                Total Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{emergencyRequests.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Emergency Requests</CardTitle>
            <CardDescription>Monitor and respond to emergency requests in real-time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by name or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Requests</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="dispatched">Dispatched</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Requests List */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">No emergency requests found</p>
              </CardContent>
            </Card>
          ) : (
            filteredRequests.map((request) => (
              <Card key={request.id} className={request.status === 'pending' ? 'border-red-200 bg-red-50' : ''}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        {request.users.name}
                        {getStatusBadge(request.status)}
                      </CardTitle>
                      <CardDescription>
                        Phone: {request.users.phone_number} • {formatTimeAgo(request.created_at)}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  {/* Location */}
                  {request.latitude && request.longitude && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">
                        Location: {request.latitude.toFixed(6)}, {request.longitude.toFixed(6)}
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(`https://maps.google.com?q=${request.latitude},${request.longitude}`, '_blank')}
                      >
                        View on Map
                      </Button>
                    </div>
                  )}

                  {/* Medical Info */}
                  {request.medical_profiles && (
                    <div className="bg-blue-50 p-3 rounded-md">
                      <h4 className="font-semibold text-sm mb-2">Medical Information</h4>
                      <div className="text-sm space-y-1">
                        {request.medical_profiles.blood_type && (
                          <p><strong>Blood Type:</strong> {request.medical_profiles.blood_type}</p>
                        )}
                        {request.medical_profiles.conditions && request.medical_profiles.conditions.length > 0 && (
                          <p><strong>Conditions:</strong> {request.medical_profiles.conditions.join(', ')}</p>
                        )}
                        {request.medical_profiles.allergies && request.medical_profiles.allergies.length > 0 && (
                          <p><strong>Allergies:</strong> {request.medical_profiles.allergies.join(', ')}</p>
                        )}
                        {request.medical_profiles.medications && request.medical_profiles.medications.length > 0 && (
                          <p><strong>Medications:</strong> {request.medical_profiles.medications.join(', ')}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Responder Note */}
                  {request.responder_note && (
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-semibold text-sm mb-1">Responder Note</h4>
                      <p className="text-sm">{request.responder_note}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    {request.status === 'pending' && (
                      <Button 
                        onClick={() => updateRequestStatus(request.id, 'dispatched')}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Mark as Dispatched
                      </Button>
                    )}
                    {request.status === 'dispatched' && (
                      <Button 
                        onClick={() => updateRequestStatus(request.id, 'resolved')}
                        variant="outline"
                      >
                        Mark as Resolved
                      </Button>
                    )}
                    <Button 
                      variant="outline"
                      onClick={() => {
                        const note = prompt('Add a note for this request:');
                        if (note) {
                          updateRequestStatus(request.id, request.status, note);
                        }
                      }}
                    >
                      Add Note
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ResponderDashboard;
