import React, { useEffect, useState } from 'react'
import axios from '../api/axios'

export default function Dashboard() {
  const [stats, setStats] = useState({ products: 0, sales: 0, revenue: 0, lowStock: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const [productRes, orderRes] = await Promise.all([axios.get('/products'), axios.get('/orders')])
      const products = productRes.data
      const orders = orderRes.data
      const revenue = orders.reduce((sum, order) => sum + order.totalAmount, 0)
      const lowStock = products.filter((product) => product.quantity <= 5).length
      setStats({ products: products.length, sales: orders.length, revenue, lowStock })
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div className="p-6 text-center">Loading dashboard...</div>

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded bg-white p-6 shadow-sm">
          <div className="text-sm uppercase tracking-[0.3em] text-slate-500">Total Products</div>
          <div className="mt-4 text-3xl font-bold text-slate-900">{stats.products}</div>
        </div>
        <div className="rounded bg-white p-6 shadow-sm">
          <div className="text-sm uppercase tracking-[0.3em] text-slate-500">Total Sales</div>
          <div className="mt-4 text-3xl font-bold text-slate-900">{stats.sales}</div>
        </div>
        <div className="rounded bg-white p-6 shadow-sm">
          <div className="text-sm uppercase tracking-[0.3em] text-slate-500">Revenue</div>
          <div className="mt-4 text-3xl font-bold text-slate-900">₹{stats.revenue.toFixed(2)}</div>
        </div>
        <div className="rounded bg-white p-6 shadow-sm">
          <div className="text-sm uppercase tracking-[0.3em] text-slate-500">Low Stock</div>
          <div className="mt-4 text-3xl font-bold text-rose-600">{stats.lowStock}</div>
        </div>
      </div>

      <section className="rounded bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded border border-slate-200 p-4">
            <div className="text-sm text-slate-500">Use POS</div>
            <div className="mt-2 text-lg font-semibold">Create bills instantly</div>
          </div>
          <div className="rounded border border-slate-200 p-4">
            <div className="text-sm text-slate-500">Manage Inventory</div>
            <div className="mt-2 text-lg font-semibold">Track stock and alerts</div>
          </div>
          <div className="rounded border border-slate-200 p-4">
            <div className="text-sm text-slate-500">Sales History</div>
            <div className="mt-2 text-lg font-semibold">Review order records</div>
          </div>
        </div>
      </section>
    </div>
  )
}
