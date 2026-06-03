import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { FiBell, FiSearch } from 'react-icons/fi'
import NetworkStatus from './NetworkStatus'


export default function Navbar() {
  const { user, logout } = useContext(AuthContext)

  return (
    <header className="bg-slate-950/95 border-b border-slate-200/10 backdrop-blur-xl shadow-sm shadow-slate-900/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-lg font-semibold text-white">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-xl shadow-lg shadow-emerald-500/20">S</span>
          <span>SmartPOS</span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-3 sm:gap-4">
          <button className="hidden rounded-2xl bg-slate-900/80 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800 sm:inline-flex">
            <FiSearch className="mr-2 h-4 w-4" /> Search
          </button>
          <button className="rounded-2xl bg-slate-900/80 p-2 text-slate-200 transition hover:bg-slate-800">
            <FiBell className="h-5 w-5" />
          </button>

          <div className="block">
            <NetworkStatus />
          </div>

          {user ? (
            <div className="flex items-center gap-3 rounded-2xl bg-slate-900/80 px-4 py-2 text-sm text-slate-200">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-sm font-semibold text-white">{user.name?.slice(0, 1).toUpperCase()}</div>
              <div className="text-left">
                <div className="font-medium text-slate-100">{user.name}</div>
                <button onClick={logout} className="text-xs text-slate-400 hover:text-white">Logout</button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="rounded-2xl px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800">Login</Link>
              <Link to="/register" className="rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-400">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
