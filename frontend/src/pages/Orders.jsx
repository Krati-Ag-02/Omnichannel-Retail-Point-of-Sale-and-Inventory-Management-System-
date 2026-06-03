import React from 'react'

export default function Orders() {
const orders = [
{ id: '#ORD001', customer: 'Rahul Sharma', total: 2499, status: 'Completed' },
{ id: '#ORD002', customer: 'Priya Singh', total: 899, status: 'Pending' },
{ id: '#ORD003', customer: 'Aman Verma', total: 3499, status: 'Completed' },
{ id: '#ORD004', customer: 'Sneha Gupta', total: 1499, status: 'Processing' },
]

return ( <div className="space-y-8"> <div> <p className="text-sm font-medium text-orange-500">
Order Management </p>


    <h1 className="mt-2 text-4xl font-bold text-slate-900">
      Orders
    </h1>

    <p className="mt-2 text-slate-500">
      Manage customer orders and order status.
    </p>
  </div>

  <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
    <table className="w-full">
      <thead>
        <tr className="bg-slate-50 border-b border-slate-200">
          <th className="px-6 py-4 text-left">Order ID</th>
          <th className="px-6 py-4 text-left">Customer</th>
          <th className="px-6 py-4 text-left">Amount</th>
          <th className="px-6 py-4 text-left">Status</th>
        </tr>
      </thead>

      <tbody>
        {orders.map((order) => (
          <tr key={order.id} className="border-b border-slate-100 hover:bg-orange-50">
            <td className="px-6 py-4 font-medium">{order.id}</td>
            <td className="px-6 py-4">{order.customer}</td>
            <td className="px-6 py-4">₹{order.total}</td>
            <td className="px-6 py-4">
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
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
