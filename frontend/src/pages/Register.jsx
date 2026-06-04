import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import { AuthContext } from '../context/AuthContext'

export default function Register() {
const [form, setForm] = useState({
name: '',
email: '',
password: '',
confirmPassword: '',
})
const navigate = useNavigate()
const { login } = useContext(AuthContext)

const [error, setError] = useState('')
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/auth/register', form)
      await login(res.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-3xl bg-white/95 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
      <div className="mb-8 space-y-2 text-center">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-500 text-xl font-semibold text-white">R</div>
        <h2 className="text-3xl font-semibold text-slate-900">Create your account</h2>
        <p className="text-sm text-slate-500">Sign up for SmartPOS and start managing sales faster.</p>
      </div>

      {error && <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}

      <form onSubmit={submit} className="space-y-5">
        <label className="block text-sm font-medium text-slate-700">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="John Doe"
          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />

        <label className="block text-sm font-medium text-slate-700">Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />

        <label className="block text-sm font-medium text-slate-700">Password</label>
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          type="password"
          placeholder="Create a password"
          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />

        <button className="w-full rounded-3xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500">Create Account</button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already a member? <Link to="/login" className="font-semibold text-cyan-600 hover:text-cyan-700">Log in</Link>
      </p>
    </div>
  )
}
