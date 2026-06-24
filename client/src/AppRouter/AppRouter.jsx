import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CitizenLandingPage from '../citizen/pages/CitizenLandingPage'
import VerifyOtp from '../auth/VerifyOtp'
import MyProfile from '../citizen/pages/MyProfile'
import MyComplaints from '../citizen/pages/MyComplaints'

export default function AppRouter() {
  return (
    //User Routes
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CitizenLandingPage />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-complaints" element={<MyComplaints />} />
      </Routes>
    </BrowserRouter>
  )
}
