import type { PhoneLocation } from './phone';

export interface Geofence {
  id: string;
  name: string;
  radius: number; // in meters
  center: {
    latitude: number;
    longitude: number;
  };
  phoneId: string;
  isActive: boolean;
  createdAt: Date;
  notifications: boolean;
}

export interface GeofenceAlert {
  id: string;
  geofenceId: string;
  phoneId: string;
  type: 'enter' | 'exit';
  timestamp: Date;
  location: PhoneLocation;
}