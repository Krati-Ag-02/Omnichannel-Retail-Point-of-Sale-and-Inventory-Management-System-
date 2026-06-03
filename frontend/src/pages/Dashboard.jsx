import React from 'react'

export default function Dashboard() {
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
          </div>
        </div>
      </div>
    ))}
  </section>

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
