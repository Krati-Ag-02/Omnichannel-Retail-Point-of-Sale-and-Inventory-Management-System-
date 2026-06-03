import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

return ( <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4"> <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"> <div className="text-center"> <h1 className="text-4xl font-bold text-slate-900">
SnapStock </h1>


      <p className="mt-2 text-slate-500">
        Smart POS & Inventory Management
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
