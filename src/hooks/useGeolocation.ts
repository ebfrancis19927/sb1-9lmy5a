import { useState, useEffect } from 'react';
import type { PhoneLocation } from '../types/phone';

interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  maximumAge?: number;
  timeout?: number;
}

interface UseGeolocationReturn {
  location: PhoneLocation | null;
  error: GeolocationError | null;
  isTracking: boolean;
  startTracking: () => void;
  stopTracking: () => void;
}

type GeolocationError = {
  code: number;
  message: string;
};

export function useGeolocation(options: GeolocationOptions = {}): UseGeolocationReturn {
  const [location, setLocation] = useState<PhoneLocation | null>(null);
  const [error, setError] = useState<GeolocationError | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [watchId, setWatchId] = useState<number | null>(null);

  const handleSuccess = (position: GeolocationPosition) => {
    setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      timestamp: new Date(position.timestamp),
    });
    setError(null);
  };

  const handleError = (error: GeolocationPositionError) => {
    setError({
      code: error.code,
      message: error.message,
    });
  };

  const startTracking = () => {
    if (!navigator.geolocation) {
      setError({
        code: 0,
        message: 'Geolocation is not supported by your browser',
      });
      return;
    }

    setIsTracking(true);
    const id = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
        ...options,
      }
    );
    setWatchId(id);
  };

  const stopTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    setIsTracking(false);
  };

  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  return {
    location,
    error,
    isTracking,
    startTracking,
    stopTracking,
  };
}