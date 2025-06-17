import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
<<<<<<< HEAD
import BookingPage from './pages/Booking/BookingPage'
=======
import BookingPage from './pages/BookingPage'
>>>>>>> b9e534f (Initial commit after local changes)
import VideoConsultation from './pages/VideoConsultation'
import ProtectedRoute from './components/common/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<LandingPage />} />
=======
          <Route path="/" element={<VideoConsultation />} />
>>>>>>> b9e534f (Initial commit after local changes)
          <Route path="/login" element={<Login />} />
          <Route 
            path="/booking" 
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/consultation" 
            element={
              <ProtectedRoute>
                <VideoConsultation />
              </ProtectedRoute>
            } 
          />
<<<<<<< HEAD
          <Route path="*" element={<Navigate to="/" replace />} />
=======
          <Route path="*" element={<Navigate to="/\" replace />} />
>>>>>>> b9e534f (Initial commit after local changes)
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App