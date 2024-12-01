import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navigation } from './components/Navigation';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { TrackPhone } from './pages/TrackPhone';
import { PhoneDetails } from './pages/PhoneDetails';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/track"
              element={
                <ProtectedRoute>
                  <TrackPhone />
                </ProtectedRoute>
              }
            />
            <Route
              path="/phone/:id"
              element={
                <ProtectedRoute>
                  <PhoneDetails />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;