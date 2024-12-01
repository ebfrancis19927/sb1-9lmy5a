import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phoneNumber: z.string().optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    // TODO: Implement registration logic
    console.log(data);
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-gray-500">Enter your information to get started</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Full Name
          </label>
          <input
            {...register('name')}
            type="text"
            className="w-full rounded-md border border-gray-300 p-2"
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            {...register('email')}
            type="email"
            className="w-full rounded-md border border-gray-300 p-2"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            {...register('password')}
            type="password"
            className="w-full rounded-md border border-gray-300 p-2"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="phoneNumber" className="text-sm font-medium">
            Phone Number (Optional)
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

        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Sign Up
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-blue-600 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};