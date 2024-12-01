import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Smartphone, LogOut } from 'lucide-react';
import { Button } from './ui/Button';

export const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = false; // TODO: Replace with actual auth state

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Smartphone className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">PhoneTracer</span>
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/track"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Track Phone
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2"
                  onClick={() => {
                    // TODO: Implement logout
                    navigate('/login');
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};