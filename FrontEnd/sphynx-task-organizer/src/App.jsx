import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import HomePage from './pages/private/HomePage'
import AboutPage from './pages/private/AboutPage'
import TasksPage from './pages/private/TasksPage'
import SettingsPage from './pages/private/SettingsPage'
import LogoutPage from './pages/public/LogoutPage'
import Callback from './pages/public/Callback'
import Landing from './pages/public/Landing'
import { ThemeContextProvider } from './context/ThemeContext'

function App() {

  return (
    <ThemeContextProvider>
      <Box sx={{ backgroundColor: (theme) => theme.palette.background.default, minHeight: '100vh' }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeContextProvider>
  )
}

export default App
