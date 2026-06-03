import React, { useContext } from 'react'
<<<<<<< HEAD
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './context/ToastContext'
import { AuthContext } from './context/AuthContext'
import Sidebar from './components/Sidebar'
import AppRoutes from './routes/AppRoutes'

function Layout() {
  const { user, loading } = useContext(AuthContext)

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 40,
              height: 40,
              border: '2px solid var(--line)',
              borderTopColor: 'var(--green)',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
              margin: '0 auto 16px',
            }}
          />
          <p style={{ color: 'var(--t2)', fontSize: 14 }}>
            Loading SmartPOS...
          </p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'var(--bg)',
          padding: '40px 20px',
        }}
      >
        <AppRoutes />
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'var(--bg)',
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: '28px 32px',
          overflowY: 'auto',
        }}
      >
        <AppRoutes />
      </main>
=======
import { AuthProvider, AuthContext } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AppRoutes from './routes/AppRoutes'

function AppContent() {
  const { user } = useContext(AuthContext)

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {user ? (
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <Sidebar />
          <div className="space-y-6">
            <AppRoutes />
          </div>
        </div>
      ) : (
        <AppRoutes />
      )}
>>>>>>> 7cb91e5b12c21805bdde6bd111d24443b84661d9
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
<<<<<<< HEAD
        <ToastProvider>
          <Layout />
        </ToastProvider>
=======
        <div className="min-h-screen bg-slate-950/5">
          <Navbar />
          <AppContent />
        </div>
>>>>>>> 7cb91e5b12c21805bdde6bd111d24443b84661d9
      </CartProvider>
    </AuthProvider>
  )
}