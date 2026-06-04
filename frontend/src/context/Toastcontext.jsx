import React, { createContext, useCallback, useContext, useState } from 'react'

const ToastContext = createContext()

const ICONS = {
  success: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="#6ee7b7" strokeWidth="1.5"/>
      <path d="M5 8l2 2 4-4" stroke="#6ee7b7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="#f87171" strokeWidth="1.5"/>
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  info: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="#818cf8" strokeWidth="1.5"/>
      <path d="M8 7v4M8 5.5v.5" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const show = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts(t => [...t, { id, message, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500)
  }, [])

  const remove = useCallback((id) => setToasts(t => t.filter(x => x.id !== id)), [])

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {toasts.map(t => (
          <div
            key={t.id}
            className="toast"
            style={{ borderLeft: `3px solid ${t.type === 'success' ? 'var(--accent)' : t.type === 'error' ? 'var(--danger)' : 'var(--accent-2)'}` }}
            onClick={() => remove(t.id)}
          >
            {ICONS[t.type]}
            <span style={{ color: 'var(--text-primary)', fontSize: 14 }}>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}