import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Phone, Clock, FileText, MapPin } from 'lucide-react';
import { formatDate, formatPhoneNumber } from '../lib/utils';
import { GeofenceMap } from '../components/GeofenceMap';
import { GeofenceForm } from '../components/GeofenceForm';
import { LiveLocation } from '../components/LiveLocation';
import { Button } from '../components/ui/Button';
import type { Geofence } from '../types/geofence';

export const PhoneDetails: React.FC = () => {
  const { id } = useParams();
  const [isCreatingGeofence, setIsCreatingGeofence] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  // TODO: Replace with actual phone data fetch
  const mockPhone = {
    id: '1',
    phoneNumber: '+1234567890',
    ownerName: 'John Doe',
    lastLocation: {
      latitude: 40.7128,
      longitude: -74.0060,
      timestamp: new Date(),
      accuracy: 10
    },
    isTracking: true,
    notes: 'Lost in Central Park area'
  };

  // TODO: Replace with actual geofences data fetch
  const mockGeofences: Geofence[] = [];

  const handleGeofenceCreate = async (data: any) => {
    // TODO: Implement geofence creation
    console.log('Creating geofence:', data);
    setIsCreatingGeofence(false);
    setSelectedLocation(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Phone Details</h1>
        <Button
          onClick={() => setIsCreatingGeofence(!isCreatingGeofence)}
          variant={isCreatingGeofence ? 'secondary' : 'primary'}
        >
          <MapPin className="mr-2 h-4 w-4" />
          {isCreatingGeofence ? 'Cancel' : 'Add Geofence'}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium">{formatPhoneNumber(mockPhone.phoneNumber)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="font-medium">
                    {formatDate(mockPhone.lastLocation.timestamp)}
                  </p>
                </div>
              </div>

              {mockPhone.notes && (
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Notes</p>
                    <p className="font-medium">{mockPhone.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {isCreatingGeofence && selectedLocation && (
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Create Geofence</h2>
              <GeofenceForm
                onSubmit={handleGeofenceCreate}
                initialLocation={selectedLocation}
              />
            </div>
          )}
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <LiveLocation />
        </div>
      </div>

      {mockGeofences.length > 0 && (
        <div className="rounded-lg border bg-white shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Active Geofences</h2>
          </div>
          <div className="divide-y">
            {mockGeofences.map((geofence) => (
              <div key={geofence.id} className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{geofence.name}</h3>
                  <p className="text-sm text-gray-500">
                    {geofence.radius}m radius • {geofence.notifications ? 'Notifications enabled' : 'Notifications disabled'}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};