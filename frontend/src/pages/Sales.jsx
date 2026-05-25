import React, { useEffect, useMemo, useState } from 'react'
import axios from '../api/axios'

export default function Sales() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const res = await axios.get('/orders')
      setOrders(res.data)
      setLoading(false)
    }
    load()
  }, [])

  const summary = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10)
    const daily = orders.filter((order) => order.createdAt?.slice(0, 10) === today)
    return {
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0),
      todayRevenue: daily.reduce((sum, order) => sum + order.totalAmount, 0),
      todayCount: daily.length
    }
  }, [orders])

  if (loading) return <div className="p-6 text-center">Loading sales history...</div>

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded bg-white p-6 shadow-sm">
          <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Total Orders</div>
          <div className="mt-3 text-3xl font-bold text-slate-900">{summary.totalOrders}</div>
        </div>
        <div className="rounded bg-white p-6 shadow-sm">
          <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Total Revenue</div>
          <div className="mt-3 text-3xl font-bold text-slate-900">₹{summary.totalRevenue.toFixed(2)}</div>
        </div>
        <div className="rounded bg-white p-6 shadow-sm">
          <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Today&apos;s Revenue</div>
          <div className="mt-3 text-3xl font-bold text-slate-900">₹{summary.todayRevenue.toFixed(2)}</div>
        </div>
        <div className="rounded bg-white p-6 shadow-sm">
          <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Today&apos;s Orders</div>
          <div className="mt-3 text-3xl font-bold text-slate-900">{summary.todayCount}</div>
        </div>
      </section>

      <section className="rounded bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Sales History</h1>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-3 py-3">Order</th>
                <th className="px-3 py-3">Items</th>
                <th className="px-3 py-3">Total</th>
                <th className="px-3 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-3 py-3">{order._id.slice(-6)}</td>
                  <td className="px-3 py-3">{order.products.length}</td>
                  <td className="px-3 py-3">₹{order.totalAmount.toFixed(2)}</td>
                  <td className="px-3 py-3">{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
