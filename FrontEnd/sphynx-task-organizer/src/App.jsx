import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/private/HomePage'
import AboutPage from './pages/private/AboutPage'
import TasksPage from './pages/private/TasksPage'
import SettingsPage from './pages/private/SettingsPage'
import { ThemeContextProvider } from './context/ThemeContext'

function App() {

  return (
    <ThemeContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeContextProvider>
  )
}

export default App
