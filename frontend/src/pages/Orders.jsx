const fakeOrders = [
  { _id: "ORD1041", customer: "Riya Sharma", amount: 1280, status: "completed", date: "27 May 2026" },
  { _id: "ORD1040", customer: "Arjun Mehta", amount: 540, status: "completed", date: "27 May 2026" },
  { _id: "ORD1039", customer: "Priya Nair", amount: 3200, status: "refunded", date: "26 May 2026" },
  { _id: "ORD1038", customer: "Rahul Das", amount: 890, status: "completed", date: "26 May 2026" },
  { _id: "ORD1037", customer: "Sneha Gupta", amount: 2100, status: "pending", date: "25 May 2026" },
]

const statusColors = {
  completed: "text-green-400 bg-green-400/10",
  refunded: "text-red-400 bg-red-400/10",
  pending: "text-yellow-400 bg-yellow-400/10"
}

export default function Orders() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Orders</h1>
        <p className="text-slate-400 mt-1 text-sm">{fakeOrders.length} total orders</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-x-auto">
        <table className="w-full text-sm min-w-[500px]">
          <thead>
            <tr className="border-b border-white/10 text-slate-400 text-xs uppercase tracking-widest">
              <th className="text-left px-4 py-3">Order ID</th>
              <th className="text-left px-4 py-3">Customer</th>
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-left px-4 py-3">Amount</th>
              <th className="text-left px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {fakeOrders.map(order => (
              <tr key={order._id} className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="px-4 py-3 text-indigo-400 font-mono text-xs">#{order._id}</td>
                <td className="px-4 py-3 text-white">{order.customer}</td>
                <td className="px-4 py-3 text-slate-400">{order.date}</td>
                <td className="px-4 py-3 text-white font-medium">₹{order.amount.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}