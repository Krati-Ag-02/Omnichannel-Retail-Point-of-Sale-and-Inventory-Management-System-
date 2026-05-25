import React, { useContext, useState } from 'react'
import axios from '../api/axios'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Register() {
  const { login } = useContext(AuthContext)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/auth/register', form)
      await login(res.data.token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="mx-auto max-w-md rounded bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Create Account</h2>
      {error && <div className="mb-4 rounded border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div>}
      <form onSubmit={submit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} required placeholder="Name" className="w-full rounded border px-4 py-3" />
        <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="Email" className="w-full rounded border px-4 py-3" />
        <input name="password" value={form.password} onChange={handleChange} required type="password" placeholder="Password" className="w-full rounded border px-4 py-3" />
        <button className="w-full rounded bg-emerald-600 px-4 py-3 text-white hover:bg-emerald-700">Register</button>
      </form>
      <p className="mt-4 text-sm text-slate-600">Already a member? <Link to="/login" className="text-emerald-600">Log in</Link></p>
    </div>
  )
}
