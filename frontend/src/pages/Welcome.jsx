import React from 'react'
import { Link } from 'react-router-dom'

export default function Welcome() {
  return (
    <div className="flex min-h-[85vh] items-center justify-center">
      <div className="max-w-3xl text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500 text-4xl font-bold text-white">
          S
        </div>

        <h1 className="mb-4 text-5xl font-bold text-slate-900">
          SmartPOS
        </h1>

        <p className="mb-8 text-lg text-slate-600">
          Manage Products, Inventory, Orders and Sales from one powerful dashboard.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="rounded-2xl bg-cyan-600 px-6 py-3 font-semibold text-white"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-2xl bg-emerald-500 px-6 py-3 font-semibold text-white"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}