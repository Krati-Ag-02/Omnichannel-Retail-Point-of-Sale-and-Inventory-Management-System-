import React, { useContext } from 'react'
import { AuthProvider, AuthContext } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AppRoutes from './routes/AppRoutes'

function AppContent() {
  const { user } = useContext(AuthContext)

  if (!user) {
    return <AppRoutes />
  }

  return (
    <>
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <Sidebar />

          <div className="space-y-6">
            <AppRoutes />
          </div>
        </div>
      </div>
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-slate-950/5">
          <AppContent />
        </div>
      </CartProvider>
    </AuthProvider>
  )
}