import React from 'react';
import { Phone, MapPin, Bell } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Dashboard: React.FC = () => {
  const trackedPhones = []; // TODO: Replace with actual tracked phones data

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <Button onClick={() => window.location.href = '/track'}>
          Track New Phone
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Active Traces</h2>
          </div>
          <p className="mt-2 text-3xl font-bold">{trackedPhones.length}</p>
        </div>

        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-green-600" />
            <h2 className="text-lg font-semibold">Last Located</h2>
          </div>
          <p className="mt-2 text-sm text-gray-600">No recent locations</p>
        </div>

        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-orange-600" />
            <h2 className="text-lg font-semibold">Active Alerts</h2>
          </div>
          <p className="mt-2 text-sm text-gray-600">No active alerts</p>
        </div>
      </div>

      <div className="rounded-lg border bg-white shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Tracked Phones</h2>
        </div>
        {trackedPhones.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-600">No phones are currently being tracked.</p>
            <Button 
              variant="secondary" 
              className="mt-4"
              onClick={() => window.location.href = '/track'}
            >
              Start Tracking
            </Button>
          </div>
        ) : (
          <div className="divide-y">
            {/* Phone list will go here */}
          </div>
        )}
      </div>
    </div>
  );
};