export interface PhoneLocation {
  latitude: number;
  longitude: number;
  timestamp: Date;
  accuracy?: number;
}

export interface TrackedPhone {
  id: string;
  phoneNumber: string;
  lastLocation?: PhoneLocation;
  isTracking: boolean;
  ownerName?: string;
  notes?: string;
}