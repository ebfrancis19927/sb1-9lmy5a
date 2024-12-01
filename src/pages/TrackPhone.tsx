import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../components/ui/Button';
import { Phone } from 'lucide-react';

const trackPhoneSchema = z.object({
  phoneNumber: z.string().min(10, 'Please enter a valid phone number'),
  ownerName: z.string().min(2, 'Owner name must be at least 2 characters'),
  notes: z.string().optional(),
});

type TrackPhoneFormData = z.infer<typeof trackPhoneSchema>;

export const TrackPhone: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TrackPhoneFormData>({
    resolver: zodResolver(trackPhoneSchema),
  });

  const onSubmit = async (data: TrackPhoneFormData) => {
    // TODO: Implement phone tracking logic
    console.log(data);
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <div className="flex justify-center">
          <Phone className="h-12 w-12 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold">Track a Phone</h1>
        <p className="text-gray-500">Enter the details of the phone you want to track</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="phoneNumber" className="text-sm font-medium">
            Phone Number
          </label>
          <input
            {...register('phoneNumber')}
            type="tel"
            className="w-full rounded-md border border-gray-300 p-2"
            placeholder="+1 (555) 000-0000"
          />
          {errors.phoneNumber && (
            <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="ownerName" className="text-sm font-medium">
            Owner Name
          </label>
          <input
            {...register('ownerName')}
            type="text"
            className="w-full rounded-md border border-gray-300 p-2"
            placeholder="John Doe"
          />
          {errors.ownerName && (
            <p className="text-sm text-red-500">{errors.ownerName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="notes" className="text-sm font-medium">
            Notes (Optional)
          </label>
          <textarea
            {...register('notes')}
            className="w-full rounded-md border border-gray-300 p-2"
            rows={3}
            placeholder="Add any additional information..."
          />
          {errors.notes && (
            <p className="text-sm text-red-500">{errors.notes.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Start Tracking
        </Button>
      </form>
    </div>
  );
};