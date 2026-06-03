<<<<<<< HEAD
import React from 'react'
=======
import React, { useEffect, useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import axios from '../api/axios'
>>>>>>> 7cb91e5b12c21805bdde6bd111d24443b84661d9

const formatINR = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`

const buildChartData = (orders) => {
  const dateMap = {}
  const ordered = (orders || [])
    .map((order) => ({
      date: new Date(order.createdAt || Date.now()),
      revenue: order.totalAmount || 0
    }))
    .sort((a, b) => a.date - b.date)

  ordered.forEach((order) => {
    const key = order.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    dateMap[key] = (dateMap[key] || 0) + order.revenue
  })

  return Object.entries(dateMap)
    .slice(-7)
    .map(([date, revenue]) => ({ date, revenue }))
}

const buildInventoryDistribution = (products) => {
  const safe = Array.isArray(products) ? products : []
  const buckets = {
    inStock: 0,
    lowStock: 0,
    outOfStock: 0
  }

  safe.forEach((p) => {
    const q = Number(p.quantity ?? 0)
    if (q <= 0) buckets.outOfStock += 1
    else if (q < 5) buckets.lowStock += 1
    else buckets.inStock += 1
  })

  return [
    { name: 'In Stock', value: buckets.inStock, key: 'inStock' },
    { name: 'Low Stock', value: buckets.lowStock, key: 'lowStock' },
    { name: 'Out of Stock', value: buckets.outOfStock, key: 'outOfStock' }
  ].filter((x) => x.value > 0)
}

export default function Dashboard() {
<<<<<<< HEAD
const stats = [
{
title: 'Total Products',
value: '248',
change: '+12%',
icon: '📦',
},
{
title: 'Orders',
value: '1,847',
change: '+8%',
icon: '🛒',
},
{
title: 'Revenue',
value: '₹1.28L',
change: '+18%',
icon: '💰',
},
{
title: 'Low Stock',
value: '12',
change: '-3%',
icon: '⚠️',
},
]

return ( <div className="space-y-8 bg-slate-50 min-h-screen">
{/* Header */}

```
  <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div>
      <p className="text-sm font-medium text-orange-500">
        Dashboard
      </p>

      <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
        Welcome back 👋
      </h1>

      <p className="mt-2 text-slate-500">
        Here's what's happening in your store today.
      </p>
    </div>

    <button
      className="
      rounded-2xl
      bg-orange-500
      px-5
      py-3
      font-medium
      text-white
      transition-all
      duration-300
      hover:-translate-y-1
      hover:bg-orange-600
      hover:shadow-lg
      "
    >
      Generate Report
    </button>
  </section>

  {/* KPI Cards */}

  <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
    {stats.map((item) => (
      <div
        key={item.title}
        className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        "
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-500">
              {item.title}
            </p>

            <h2 className="mt-3 text-4xl font-bold text-slate-900">
              {item.value}
            </h2>

            <span className="mt-3 inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
              {item.change}
            </span>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-2xl">
            {item.icon}
=======
  const dummyStats = useMemo(
    () => ({
      totalProducts: 120,
      lowStock: 8,
      totalSales: 45,
      revenue: 25000,
      inStock: 95,
      outOfStock: 2
    }),
    []
  )

  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    totalSales: 0,
    revenue: 0,
    inStock: 0,
    outOfStock: 0
  })
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)



  useEffect(() => {
    const load = async () => {
      try {
        const [productRes, orderRes] = await Promise.all([axios.get('/products'), axios.get('/orders')])
        const products = Array.isArray(productRes.data) ? productRes.data : []
        const ordersData = Array.isArray(orderRes.data) ? orderRes.data : []

        const revenue = ordersData.reduce((sum, order) => sum + (order.totalAmount || 0), 0)
        const lowStock = products.filter((product) => (product.quantity ?? 0) <= 5).length

        setStats({
          totalProducts: products.length,
          lowStock,
          totalSales: ordersData.length,
          revenue
        })
        setOrders(ordersData)
      } catch (e) {
        // Backend not available => keep dashboard usable with dummy data
        setStats(dummyStats)
        setOrders([])
      } finally {
        // If backend returned empty arrays, still show safe dummy-looking UI
        setStats((prev) => (prev.totalProducts === 0 && prev.totalSales === 0 && prev.revenue === 0 ? dummyStats : prev))

        setOrders((prev) => (prev.length === 0 ? [] : prev))


        setLoading(false)
      }
    }

    load()
  }, [dummyStats])

  const chartData = useMemo(() => buildChartData(orders), [orders])

  const recentOrders = useMemo(() => orders.slice(-4).reverse(), [orders])

  if (loading) {
    return (
      <div className="space-y-6 p-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-600 via-cyan-500 to-sky-500 p-6 text-white shadow-xl shadow-slate-300/15">
          <div className="h-6 w-48 animate-pulse rounded bg-white/20" />
          <div className="mt-4 h-10 w-72 animate-pulse rounded bg-white/20" />
          <div className="mt-3 h-4 w-full max-w-2xl animate-pulse rounded bg-white/20" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-3xl bg-white p-4 shadow-xl shadow-slate-300/10">
              <div className="h-3 w-28 animate-pulse rounded bg-slate-200" />
              <div className="mt-3 h-10 w-20 animate-pulse rounded bg-slate-200" />
            </div>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-300/10">
            <div className="h-5 w-40 animate-pulse rounded bg-slate-200" />
            <div className="mt-6 h-64 animate-pulse rounded bg-slate-100" />
          </div>
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-300/10">
              <div className="h-5 w-52 animate-pulse rounded bg-slate-200" />
              <div className="mt-6 h-40 animate-pulse rounded bg-slate-100" />
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-300/10">
              <div className="h-5 w-48 animate-pulse rounded bg-slate-200" />
              <div className="mt-6 space-y-3">
                {Array.from({ length: 3 }).map((__, j) => (
                  <div key={j} className="h-14 animate-pulse rounded bg-slate-100" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-r from-emerald-600 via-cyan-500 to-sky-500 p-6 text-white shadow-xl shadow-slate-300/15">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-200/80">Business Overview</p>
            <h1 className="mt-4 text-3xl font-semibold">Smart POS Analytics</h1>
            <p className="mt-2 max-w-2xl text-slate-100/90">Keep track of stock, revenue, and sales performance in one beautiful dashboard.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl bg-white/10 p-4">
              <div className="text-xs uppercase tracking-[0.3em] text-slate-100/80">Total Products</div>
              <div className="mt-2 text-3xl font-semibold">{stats.totalProducts}</div>
            </div>
            <div className="rounded-3xl bg-white/10 p-4">
              <div className="text-xs uppercase tracking-[0.3em] text-slate-100/80">Total Sales</div>
              <div className="mt-2 text-3xl font-semibold">{stats.totalSales}</div>
            </div>
            <div className="rounded-3xl bg-white/10 p-4">
              <div className="text-xs uppercase tracking-[0.3em] text-slate-100/80">Revenue</div>
              <div className="mt-2 text-3xl font-semibold">₹{stats.revenue.toFixed(0)}</div>
            </div>
            <div className="rounded-3xl bg-white/10 p-4">
              <div className="text-xs uppercase tracking-[0.3em] text-slate-100/80">Low Stock</div>
              <div className="mt-2 text-3xl font-semibold text-rose-200">{stats.lowStock}</div>
            </div>
>>>>>>> 7cb91e5b12c21805bdde6bd111d24443b84661d9
          </div>
        </div>
      </div>
    ))}
  </section>

<<<<<<< HEAD
  {/* Main Layout */}

  <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
    {/* Activity */}

    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">
          Recent Activity
        </h2>

        <button className="text-sm text-orange-500 hover:text-orange-600">
          View all
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {[
          'New order received',
          'Inventory updated',
          'Product added',
          'Sales report generated',
        ].map((item, index) => (
          <div
            key={index}
            className="
            flex
            items-center
            justify-between
            rounded-2xl
            bg-slate-50
            p-4
            transition-all
            duration-300
            hover:bg-orange-50
            "
          >
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-orange-400" />
              <span className="font-medium text-slate-700">
                {item}
              </span>
            </div>

            <span className="text-sm text-slate-400">
              2h ago
            </span>
          </div>
        ))}
      </div>
=======
      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-300/10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Revenue trend</h2>
              <p className="mt-1 text-sm text-slate-500">Last 7 days performance</p>
            </div>
            <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">Live</span>
          </div>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: '#475569', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(value) => `₹${value}`} tick={{ fill: '#475569', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} contentStyle={{ borderRadius: 16, borderColor: '#cbd5e1' }} />
                <Area type="monotone" dataKey="revenue" stroke="#14b8a6" strokeWidth={3} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-300/10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Inventory distribution</h2>
                <p className="mt-1 text-sm text-slate-500">In / Low / Out of stock</p>
              </div>
              <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">Auto</span>
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr] items-start">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip formatter={(v, name) => [`${v}`, name]} />
                    <Pie
                      data={buildInventoryDistribution(products).length ? buildInventoryDistribution(products) : [
                        { name: 'In Stock', value: stats.inStock || stats.totalProducts - stats.lowStock, key: 'inStock' },
                        { name: 'Low Stock', value: stats.lowStock || 0, key: 'lowStock' },
                        { name: 'Out of Stock', value: stats.outOfStock || 0, key: 'outOfStock' }
                      ]}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={50}
                      outerRadius={90}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                <div className="rounded-3xl bg-slate-950/5 p-4">
                  <div className="text-sm text-slate-500">In stock</div>
                  <div className="mt-2 text-3xl font-semibold text-emerald-600">{stats.inStock}</div>
                </div>
                <div className="rounded-3xl bg-slate-950/5 p-4">
                  <div className="text-sm text-slate-500">Low stock</div>
                  <div className="mt-2 text-3xl font-semibold text-rose-600">{stats.lowStock}</div>
                </div>
                <div className="rounded-3xl bg-slate-950/5 p-4">
                  <div className="text-sm text-slate-500">Out of stock</div>
                  <div className="mt-2 text-3xl font-semibold text-slate-900">{stats.outOfStock}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-300/10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Low stock overview</h2>
                <p className="mt-1 text-sm text-slate-500">Quick view of low items</p>
              </div>
            </div>
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={(buildInventoryDistribution(products).length
                    ? buildInventoryDistribution(products)
                    : [
                        { name: 'In Stock', value: stats.inStock || 0 },
                        { name: 'Low Stock', value: stats.lowStock || 0 },
                        { name: 'Out of Stock', value: stats.outOfStock || 0 }
                      ])}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#475569', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(v) => [String(v), 'Items']} />
                  <Bar dataKey="value" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-300/10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Recent Activity</h2>
                <p className="mt-1 text-sm text-slate-500">Recent changes in POS / Inventory</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {[
                { label: '✔ Product Added', ts: 'Just now' },
                { label: '✔ Stock Updated', ts: '2 mins ago' },
                { label: '✔ Order Completed', ts: '15 mins ago' },
                { label: '✔ Inventory Synced', ts: '1 hr ago' }
              ].map((a, idx) => (
                <div key={idx} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
                    <div className="font-medium">{a.label}</div>
                    <div className="text-slate-500">{a.ts}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
>>>>>>> 7cb91e5b12c21805bdde6bd111d24443b84661d9
    </div>

    {/* Quick Actions */}

    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">
        Quick Actions
      </h2>

      <div className="mt-6 space-y-4">
        {[
          'Create New Order',
          'Add Product',
          'Manage Inventory',
          'View Sales',
        ].map((action, index) => (
          <button
            key={index}
            className="
            w-full
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-4
            text-left
            font-medium
            text-slate-700
            transition-all
            duration-300
            hover:border-orange-300
            hover:bg-orange-50
            "
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  </section>
</div>


)
}
