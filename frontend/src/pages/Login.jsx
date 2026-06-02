import React, { useContext, useState } from 'react'
import axios from '../api/axios'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Login() {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/auth/login', { email, password })
      await login(res.data.token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-3xl bg-white/95 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
      <div className="mb-8 space-y-2 text-center">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-500 text-xl font-semibold text-white">S</div>
        <h2 className="text-3xl font-semibold text-slate-900">Welcome Back</h2>
        <p className="text-sm text-slate-500">Login to access your SmartPOS dashboard.</p>
      </div>

      {error && <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}

      <form onSubmit={submit} className="space-y-5">
        <label className="block text-sm font-medium text-slate-700">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />

        <label className="block text-sm font-medium text-slate-700">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          placeholder="Enter your password"
          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />

        <button className="w-full rounded-3xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500">Continue to Dashboard</button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Don't have an account? <Link to="/register" className="font-semibold text-emerald-600 hover:text-emerald-700">Create one</Link>
      </p>
    </div>
  )
}
