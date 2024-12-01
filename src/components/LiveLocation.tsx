import React from 'react';
import { useGeolocation } from '../hooks/useGeolocation';
import { Map } from './Map';
import { Button } from './ui/Button';
import { MapPin, AlertCircle } from 'lucide-react';
import { formatDate } from '../lib/utils';

export const LiveLocation: React.FC = () => {
  const { location, error, isTracking, startTracking, stopTracking } = useGeolocation();

  if (error) {
    return (
      <div className="rounded-lg border border-red-100 bg-red-50 p-4">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Location Error
            </h3>
            <p className="mt-1 text-sm text-red-700">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Live Location</h2>
          {location && (
            <p className="text-sm text-gray-500">
              Last updated: {formatDate(location.timestamp)}
            </p>
          )}
        </div>
        <Button
          onClick={isTracking ? stopTracking : startTracking}
          variant={isTracking ? 'secondary' : 'primary'}
        >
          <MapPin className="mr-2 h-4 w-4" />
          {isTracking ? 'Stop Tracking' : 'Start Tracking'}
        </Button>
      </div>

      {location ? (
        <Map location={location} />
      ) : (
        <div className="rounded-lg border-2 border-dashed border-gray-200 p-8">
          <div className="text-center">
            <MapPin className="mx-auto h-8 w-8 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">
              {isTracking
                ? 'Waiting for location data...'
                : 'Click "Start Tracking" to begin tracking your location'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};