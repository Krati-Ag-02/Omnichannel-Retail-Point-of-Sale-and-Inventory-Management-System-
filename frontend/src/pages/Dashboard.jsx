import { useState, useEffect } from "react"

const stats = [
  {
    label: "Total Revenue",
    value: "₹1,24,500",
    change: "+12.5%",
    positive: true,
    icon: "💰",
    sub: "Today"
  },
  {
    label: "Orders",
    value: "348",
    change: "+8.2%",
    positive: true,
    icon: "🧾",
    sub: "Today"
  },
  {
    label: "Low Stock Items",
    value: "12",
    change: "-3",
    positive: false,
    icon: "📦",
    sub: "Needs reorder"
  },
  {
    label: "Active Cashiers",
    value: "5",
    change: "Online now",
    positive: true,
    icon: "👤",
    sub: "Across stores"
  }
]

const recentOrders = [
  { id: "ORD-1041", customer: "Riya Sharma", amount: "₹1,280", status: "Completed", time: "2 min ago" },
  { id: "ORD-1040", customer: "Arjun Mehta", amount: "₹540", status: "Completed", time: "5 min ago" },
  { id: "ORD-1039", customer: "Priya Nair", amount: "₹3,200", status: "Refunded", time: "12 min ago" },
  { id: "ORD-1038", customer: "Rahul Das", amount: "₹890", status: "Completed", time: "18 min ago" },
  { id: "ORD-1037", customer: "Sneha Gupta", amount: "₹2,100", status: "Pending", time: "25 min ago" },
]

const topProducts = [
  { name: "Basmati Rice 5kg", sold: 84, revenue: "₹21,000" },
  { name: "Tata Salt 1kg", sold: 120, revenue: "₹6,000" },
  { name: "Amul Butter 500g", sold: 67, revenue: "₹15,410" },
  { name: "Surf Excel 2kg", sold: 45, revenue: "₹13,500" },
  { name: "Maggi 12-pack", sold: 98, revenue: "₹9,800" },
]

const statusColors = {
  Completed: "text-green-400 bg-green-400/10",
  Refunded: "text-red-400 bg-red-400/10",
  Pending: "text-yellow-400 bg-yellow-400/10"
}

export default function Dashboard() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1 text-sm">
            {time.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            {" · "}
            <span className="text-slate-300 font-mono">
              {time.toLocaleTimeString("en-IN")}
            </span>
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-slate-300 hover:bg-white/10 transition">
            Export Report
          </button>
          <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm text-white transition">
            + New Order
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/10 bg-[#081120] p-5 flex flex-col gap-3 hover:border-white/20 transition"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 uppercase tracking-widest">{stat.label}</span>
              <span className="text-xl">{stat.icon}</span>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.sub}</p>
            </div>
            <div className={`text-xs font-medium ${stat.positive ? "text-green-400" : "text-red-400"}`}>
              {stat.change} from yesterday
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 xl:grid-cols-3">

        {/* Recent Orders */}
        <div className="xl:col-span-2 rounded-2xl border border-white/10 bg-[#081120] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white">Recent Orders</h2>
            <a href="/orders" className="text-xs text-indigo-400 hover:text-indigo-300 transition">
              View all →
            </a>
          </div>
          <div className="space-y-1">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-white/5 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 text-xs font-bold">
                    {order.customer.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">{order.customer}</p>
                    <p className="text-xs text-slate-500">{order.id} · {order.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-white">{order.amount}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="rounded-2xl border border-white/10 bg-[#081120] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white">Top Products</h2>
            <a href="/products" className="text-xs text-indigo-400 hover:text-indigo-300 transition">
              View all →
            </a>
          </div>
          <div className="space-y-3">
            {topProducts.map((product, i) => (
              <div key={product.name} className="flex items-center gap-3">
                <span className="text-xs text-slate-500 w-4">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{product.name}</p>
                  <div className="mt-1 h-1.5 rounded-full bg-white/5">
                    <div
                      className="h-1.5 rounded-full bg-indigo-500"
                      style={{ width: `${(product.sold / 120) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-white font-medium">{product.revenue}</p>
                  <p className="text-xs text-slate-500">{product.sold} sold</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}