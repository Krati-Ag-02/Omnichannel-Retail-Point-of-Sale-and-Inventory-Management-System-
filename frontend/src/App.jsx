import React, { useContext } from 'react'
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
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <Layout />
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  )
}