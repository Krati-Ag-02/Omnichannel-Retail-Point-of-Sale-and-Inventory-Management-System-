import React from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineDashboard } from 'react-icons/ai'
import { FiBox } from 'react-icons/fi'
import { BsGraphUp } from 'react-icons/bs'
import { MdInventory2 } from 'react-icons/md'
import { HiOutlineShoppingCart } from 'react-icons/hi'

const links = [
  { to: '/', label: 'Dashboard', icon: <AiOutlineDashboard className="h-5 w-5" /> },
  { to: '/products', label: 'Products', icon: <FiBox className="h-5 w-5" /> },
  { to: '/inventory', label: 'Inventory', icon: <MdInventory2 className="h-5 w-5" /> },
  { to: '/pos', label: 'POS', icon: <HiOutlineShoppingCart className="h-5 w-5" /> },
  { to: '/sales', label: 'Sales', icon: <BsGraphUp className="h-5 w-5" /> }
]

export default function Sidebar() {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-6 space-y-4 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-slate-300/10">
        <div className="mb-5 px-1">
          <div className="text-xs uppercase tracking-[0.3em] text-slate-500">Workspace</div>
          <div className="mt-3 text-lg font-semibold text-slate-900">Navigation</div>
        </div>
        <div className="space-y-2">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${
                  isActive ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/10' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="rounded-3xl bg-slate-950/5 p-4 text-sm text-slate-600">
          <div className="font-semibold text-slate-900">Pro tips</div>
          <p className="mt-2 text-slate-500">Use inventory alerts to avoid stock-outs and keep revenue growing.</p>
        </div>
      </div>
    </aside>
  )
}
