import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
const [form, setForm] = useState({
name: '',
email: '',
password: '',
confirmPassword: '',
})

<<<<<<< HEAD
const handleChange = (e) => {
setForm({
...form,
[e.target.name]: e.target.value,
})
}

return ( <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4"> <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"> <div className="text-center"> <h1 className="text-4xl font-bold text-slate-900">
SnapStock </h1>


      <p className="mt-2 text-slate-500">
        Create your account
      </p>
    </div>

    <form className="mt-8 space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        className="w-full rounded-2xl border border-slate-200 p-4"
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={form.email}
        onChange={handleChange}
        className="w-full rounded-2xl border border-slate-200 p-4"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full rounded-2xl border border-slate-200 p-4"
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={handleChange}
        className="w-full rounded-2xl border border-slate-200 p-4"
      />

      <button className="w-full rounded-2xl bg-orange-500 py-4 font-semibold text-white hover:bg-orange-600">
        Create Account
      </button>
    </form>

    <p className="mt-6 text-center text-slate-500">
      Already have an account?{' '}
      <Link to="/login" className="text-orange-500 font-medium">
        Login
      </Link>
    </p>
  </div>
</div>

)
=======
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
>>>>>>> 7cb91e5b12c21805bdde6bd111d24443b84661d9
}
