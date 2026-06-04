import React from 'react'

export default function Sales() {
const sales = [
{
id: '#ORD001',
customer: 'Rahul Sharma',
amount: 2499,
date: '01 Jun 2026',
},
{
id: '#ORD002',
customer: 'Priya Singh',
amount: 899,
date: '01 Jun 2026',
},
{
id: '#ORD003',
customer: 'Aman Verma',
amount: 3499,
date: '31 May 2026',
},
{
id: '#ORD004',
customer: 'Sneha Gupta',
amount: 1499,
date: '31 May 2026',
},
]

return ( <div className="space-y-8"> <div> <p className="text-sm font-medium text-orange-500">
Analytics </p>


    <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
      Sales Overview
    </h1>

    <p className="mt-2 text-slate-500">
      Monitor revenue and order performance.
    </p>
  </div>

  <div className="grid gap-6 md:grid-cols-3">
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-500">
        Total Revenue
      </p>

      <h2 className="mt-3 text-4xl font-bold text-slate-900">
        ₹1.28L
      </h2>
    </div>

    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-500">
        Orders
      </p>

      <h2 className="mt-3 text-4xl font-bold text-slate-900">
        1,847
      </h2>
    </div>

    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-500">
        Avg Order Value
      </p>

      <h2 className="mt-3 text-4xl font-bold text-slate-900">
        ₹2,340
      </h2>
    </div>
  </div>

  <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
    <div className="px-6 py-5 border-b border-slate-200">
      <h2 className="text-xl font-bold text-slate-900">
        Recent Sales
      </h2>
    </div>

    <table className="w-full">
      <thead>
        <tr className="bg-slate-50 border-b border-slate-200">
          <th className="px-6 py-4 text-left">Order ID</th>
          <th className="px-6 py-4 text-left">Customer</th>
          <th className="px-6 py-4 text-left">Amount</th>
          <th className="px-6 py-4 text-left">Date</th>
        </tr>
      </thead>

      <tbody>
        {sales.map((sale) => (
          <tr
            key={sale.id}
            className="border-b border-slate-100 hover:bg-orange-50 transition-all"
          >
            <td className="px-6 py-4 font-medium">
              {sale.id}
            </td>

            <td className="px-6 py-4">
              {sale.customer}
            </td>

            <td className="px-6 py-4">
              ₹{sale.amount}
            </td>

            <td className="px-6 py-4">
              {sale.date}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

)
}
