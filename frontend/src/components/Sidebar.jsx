import React from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/products', label: 'Products' },
  { to: '/inventory', label: 'Inventory' },
  { to: '/pos', label: 'POS' },
  { to: '/sales', label: 'Sales' }
]

export default function Sidebar() {
  return (
    <aside className="w-full max-w-xs space-y-2 rounded bg-white p-4 shadow-sm lg:w-64">
      <div className="mb-4 text-xs uppercase tracking-[0.2em] text-slate-500">Navigate</div>
      {links.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `block rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-emerald-600 text-white' : 'text-slate-700 hover:bg-slate-100'}`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </aside>
  )
}
