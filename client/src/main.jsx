import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Signup from './components/pages/Signup.jsx'
import Login from './components/pages/Login.jsx'
import Profile from './components/pages/Profile.jsx'
import Navbar from './components/navigation/Navbar.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { AlertProvider } from './context/AlertContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <AlertProvider>
        <div className='flex flex-col min-h-screen'>
          <Navbar />
          <main className='flex-1 flex flex-col'>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </AlertProvider>
    </AuthProvider>
  </BrowserRouter>
)
