import React, { useCallback, useState } from 'react';
import { GoogleMap, LoadScript, Circle, Marker } from '@react-google-maps/api';
import type { Geofence } from '../types/geofence';
import type { PhoneLocation } from '../types/phone';

interface GeofenceMapProps {
  location: PhoneLocation;
  geofences: Geofence[];
  onGeofenceCreate?: (center: { latitude: number; longitude: number }) => void;
  isCreating?: boolean;
}

const containerStyle = {
  width: '100%',
  height: '400px'
};

export const GeofenceMap: React.FC<GeofenceMapProps> = ({
  location,
  geofences,
  onGeofenceCreate,
  isCreating = false,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<google.maps.LatLng | null>(null);

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (!isCreating || !e.latLng || !onGeofenceCreate) return;
    
    setSelectedLocation(e.latLng);
    onGeofenceCreate({
      latitude: e.latLng.lat(),
      longitude: e.latLng.lng(),
    });
  }, [isCreating, onGeofenceCreate]);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: location.latitude, lng: location.longitude }}
        zoom={14}
        onClick={handleMapClick}
      >
        {/* Phone location marker */}
        <Marker
          position={{ lat: location.latitude, lng: location.longitude }}
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          }}
        />

        {/* Existing geofences */}
        {geofences.map((geofence) => (
          <Circle
            key={geofence.id}
            center={{
              lat: geofence.center.latitude,
              lng: geofence.center.longitude,
            }}
            radius={geofence.radius}
            options={{
              fillColor: geofence.isActive ? '#4CAF50' : '#9E9E9E',
              fillOpacity: 0.2,
              strokeColor: geofence.isActive ? '#4CAF50' : '#9E9E9E',
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />
        ))}

        {/* Selected location for new geofence */}
        {selectedLocation && isCreating && (
          <Circle
            center={selectedLocation}
            radius={500} // Default radius
            options={{
              fillColor: '#2196F3',
              fillOpacity: 0.2,
              strokeColor: '#2196F3',
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};