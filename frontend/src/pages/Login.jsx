import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

return ( <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4"> <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"> <div className="text-center"> <h1 className="text-4xl font-bold text-slate-900">
SnapStock </h1>

<<<<<<< HEAD

      <p className="mt-2 text-slate-500">
        Smart POS & Inventory Management
=======
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
>>>>>>> 7cb91e5b12c21805bdde6bd111d24443b84661d9
      </p>
    </div>

    <form className="mt-8 space-y-4">
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-2xl border border-slate-200 p-4"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-2xl border border-slate-200 p-4"
      />

      <button
        className="
        w-full
        rounded-2xl
        bg-orange-500
        py-4
        font-semibold
        text-white
        transition-all
        hover:bg-orange-600
        "
      >
        Sign In
      </button>
    </form>

    <p className="mt-6 text-center text-slate-500">
      Don't have an account?{' '}
      <Link
        to="/register"
        className="font-medium text-orange-500"
      >
        Register
      </Link>
    </p>
  </div>
</div>

)
}
