<<<<<<< HEAD
import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Icon = ({ d, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
)

const ICONS = {
  dashboard: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  pos:       "M3 3h18v4H3z M3 10h18v11H3z M8 10v11 M16 10v11",
  products:  "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10",
  inventory: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2 M9 5a2 2 0 002 2h2a2 2 0 002-2 M9 5a2 2 0 012-2h2a2 2 0 012 2 M9 12h6 M9 16h4",
  orders:    "M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2 M12 11h4 M12 16h4 M8 11h.01 M8 16h.01",
  sales:     "M12 2v20 M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
  logout:    "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
}

const NAV_ITEMS = [
  { label: 'Dashboard',  to: '/',          icon: 'dashboard', roles: ['cashier','manager','admin'] },
  { label: 'POS Terminal', to: '/pos',     icon: 'pos',       roles: ['cashier','manager','admin'] },
  { label: 'Products',   to: '/products',  icon: 'products',  roles: ['manager','admin'] },
  { label: 'Inventory',  to: '/inventory', icon: 'inventory', roles: ['manager','admin'] },
  { label: 'Orders',     to: '/orders',    icon: 'orders',    roles: ['cashier','manager','admin'] },
  { label: 'Sales',      to: '/sales',     icon: 'sales',     roles: ['manager','admin'] },
=======
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
>>>>>>> 7cb91e5b12c21805bdde6bd111d24443b84661d9
]

export default function Sidebar() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  const role = user?.role || 'cashier'

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const visibleItems = NAV_ITEMS.filter(item => item.roles.includes(role))

  return (
<<<<<<< HEAD
    <aside style={{
      width: collapsed ? 64 : 220,
      minHeight: '100vh',
      background: 'var(--surface)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      padding: '16px 12px',
      gap: 4,
      transition: 'width 0.25s ease',
      flexShrink: 0,
      position: 'sticky',
      top: 0,
      height: '100vh',
      overflowY: 'auto',
      overflowX: 'hidden',
    }}>
      {/* Logo */}
      <div style={{ padding: '8px 4px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, flexShrink: 0,
          background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 800, color: '#0a0f1e', fontFamily: 'Syne, sans-serif'
        }}>N</div>
        {!collapsed && (
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)', lineHeight: 1 }}>NexaSync</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 2 }}>POS System</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {!collapsed && (
          <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 12px', marginBottom: 4 }}>
            Menu
          </div>
        )}
        {visibleItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
            title={collapsed ? item.label : undefined}
            style={{ overflow: 'hidden' }}
          >
            <Icon d={ICONS[item.icon]} />
            {!collapsed && <span style={{ fontSize: 14 }}>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {/* User info */}
        {!collapsed && user && (
          <div style={{
            padding: '10px 12px', borderRadius: 'var(--radius-sm)',
            background: 'var(--surface-2)', marginBottom: 4
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</div>
            <div style={{ fontSize: 11, color: 'var(--accent)', textTransform: 'capitalize', marginTop: 2 }}>{user.role}</div>
          </div>
        )}
        {/* Collapse toggle */}
        <button
          className="nav-item"
          onClick={() => setCollapsed(c => !c)}
          style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
        >
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {collapsed
              ? <path d="M9 18l6-6-6-6" />
              : <path d="M15 18l-6-6 6-6" />
            }
          </svg>
          {!collapsed && <span>Collapse</span>}
        </button>
        <button className="nav-item" onClick={handleLogout} style={{ color: 'var(--danger)', justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <Icon d={ICONS.logout} />
          {!collapsed && <span>Logout</span>}
        </button>
=======
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
>>>>>>> 7cb91e5b12c21805bdde6bd111d24443b84661d9
      </div>
    </aside>
  )
}