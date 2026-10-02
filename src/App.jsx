import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import CampaignsPage from './pages/CampaignsPage'
import EcosystemPage from './pages/EcosystemPage'
import './App.css'

function AppContent() {
  const navigate = useNavigate()
  const location = useLocation()

  const pageMap = {
    '/': 'home',
    '/dashboard': 'dashboard',
    '/campaigns': 'campaigns',
    '/ecosystem': 'ecosystem',
  }

  const currentPage = pageMap[location.pathname] || 'home'

  const handleNavigate = (page) => {
    const routeMap = {
      home: '/',
      dashboard: '/dashboard',
      campaigns: '/campaigns',
      ecosystem: '/ecosystem',
    }
    navigate(routeMap[page] || '/')
  }

  return (
    <>
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage onNavigate={handleNavigate} />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/ecosystem" element={<EcosystemPage />} />
        </Routes>
      </main>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
