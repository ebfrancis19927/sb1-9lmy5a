import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from './ui/Button';
import { MapPin } from 'lucide-react';

const geofenceSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  radius: z.number().min(100, 'Radius must be at least 100 meters').max(10000, 'Radius cannot exceed 10km'),
  notifications: z.boolean(),
});

type GeofenceFormData = z.infer<typeof geofenceSchema>;

interface GeofenceFormProps {
  onSubmit: (data: GeofenceFormData & { center: { latitude: number; longitude: number } }) => void;
  initialLocation?: { latitude: number; longitude: number };
  isLoading?: boolean;
}

export const GeofenceForm: React.FC<GeofenceFormProps> = ({
  onSubmit,
  initialLocation,
  isLoading = false,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<GeofenceFormData>({
    resolver: zodResolver(geofenceSchema),
    defaultValues: {
      radius: 500,
      notifications: true,
    },
  });

  const handleFormSubmit = (data: GeofenceFormData) => {
    if (!initialLocation) return;
    onSubmit({
      ...data,
      center: initialLocation,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Geofence Name
        </label>
        <input
          {...register('name')}
          type="text"
          className="w-full rounded-md border border-gray-300 p-2"
          placeholder="Home"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="radius" className="text-sm font-medium">
          Radius (meters)
        </label>
        <input
          {...register('radius', { valueAsNumber: true })}
          type="number"
          className="w-full rounded-md border border-gray-300 p-2"
          min={100}
          max={10000}
          step={100}
        />
        {errors.radius && (
          <p className="text-sm text-red-500">{errors.radius.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <input
          {...register('notifications')}
          type="checkbox"
          id="notifications"
          className="rounded border-gray-300"
        />
        <label htmlFor="notifications" className="text-sm font-medium">
          Enable notifications
        </label>
      </div>

      <Button
        type="submit"
        className="w-full"
        isLoading={isLoading}
        disabled={!initialLocation}
      >
        <MapPin className="mr-2 h-4 w-4" />
        Create Geofence
      </Button>
    </form>
  );
};