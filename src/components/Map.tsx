import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Button } from './ui/Button';
import { Navigation } from 'lucide-react';
import type { PhoneLocation } from '../types/phone';

interface MapProps {
  location: PhoneLocation;
  onNavigate?: () => void;
}

const containerStyle = {
  width: '100%',
  height: '400px'
};

export const Map: React.FC<MapProps> = ({ location, onNavigate }) => {
  const center = {
    lat: location.latitude,
    lng: location.longitude
  };

  const handleNavigateClick = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;
    window.open(url, '_blank');
    onNavigate?.();
  };

  return (
    <div className="space-y-4">
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
        >
          <Marker
            position={center}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            }}
          />
        </GoogleMap>
      </LoadScript>
      <Button
        onClick={handleNavigateClick}
        className="w-full flex items-center justify-center space-x-2"
      >
        <Navigation className="h-4 w-4" />
        <span>Navigate to Location</span>
      </Button>
    </div>
  );
};