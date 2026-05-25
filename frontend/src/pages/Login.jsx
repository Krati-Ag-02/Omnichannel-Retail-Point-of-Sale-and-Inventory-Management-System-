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
    <div className="mx-auto max-w-md rounded bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      {error && <div className="mb-4 rounded border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div>}
      <form onSubmit={submit} className="space-y-4">
        <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Email" className="w-full rounded border px-4 py-3" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="Password" className="w-full rounded border px-4 py-3" />
        <button className="w-full rounded bg-emerald-600 px-4 py-3 text-white hover:bg-emerald-700">Continue to Dashboard</button>
      </form>
      <p className="mt-4 text-sm text-slate-600">Don't have an account? <Link to="/register" className="text-emerald-600">Register</Link></p>
    </div>
  )
}
