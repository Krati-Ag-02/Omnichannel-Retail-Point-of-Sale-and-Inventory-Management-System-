import React, { useEffect, useState } from 'react'

export default function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(() => {
    if (typeof navigator === 'undefined') return true
    return navigator.onLine
  })

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const label = isOnline ? 'Online' : 'Offline'
  const helper = isOnline ? 'Connected to server' : 'No internet connection'

  return (
    <span
      role="status"
      aria-live="polite"
      className={
        'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold transition ring-1 ' +
        (isOnline
          ? 'bg-emerald-600/15 text-emerald-700 ring-emerald-600/30'
          : 'bg-rose-600/15 text-rose-700 ring-rose-600/30')
      }
      title={helper}
      aria-label={label}
    >
      <span aria-hidden className={isOnline ? 'text-emerald-600' : 'text-rose-600'}>
        {isOnline ? '🟢' : '🔴'}
      </span>
      <span className="inline">{label}</span>
    </span>
  )
}

