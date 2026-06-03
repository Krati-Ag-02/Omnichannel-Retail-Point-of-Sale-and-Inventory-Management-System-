import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
const [form, setForm] = useState({
name: '',
email: '',
password: '',
confirmPassword: '',
})

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
}
