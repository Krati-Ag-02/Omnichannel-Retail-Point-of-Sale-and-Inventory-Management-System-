import React, { useState } from 'react'

export default function Inventory() {
const [products] = useState([
{
id: 1,
name: 'Wireless Mouse',
category: 'Accessories',
stock: 24,
},
{
id: 2,
name: 'Mechanical Keyboard',
category: 'Accessories',
stock: 12,
},
{
id: 3,
name: 'Gaming Headset',
category: 'Audio',
stock: 5,
},
{
id: 4,
name: 'USB-C Cable',
category: 'Cables',
stock: 48,
},
{
id: 5,
name: 'Laptop Stand',
category: 'Office',
stock: 8,
},
])

const lowStock = products.filter((item) => item.stock <= 10)

return ( <div className="space-y-8"> <div> <p className="text-sm font-medium text-orange-500">
Stock Management </p>


    <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
      Inventory
    </h1>

    <p className="mt-2 text-slate-500">
      Monitor inventory levels and stock alerts.
    </p>
  </div>

  <div className="grid gap-6 md:grid-cols-3">
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <p className="text-sm text-slate-500">
        Total Products
      </p>

      <h2 className="mt-3 text-4xl font-bold text-slate-900">
        {products.length}
      </h2>
    </div>

    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <p className="text-sm text-slate-500">
        Low Stock Items
      </p>

      <h2 className="mt-3 text-4xl font-bold text-red-500">
        {lowStock.length}
      </h2>
    </div>

    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <p className="text-sm text-slate-500">
        Inventory Health
      </p>

      <h2 className="mt-3 text-4xl font-bold text-green-500">
        92%
      </h2>
    </div>
  </div>

  <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
    <h2 className="text-lg font-semibold text-red-600">
      Low Stock Alerts
    </h2>

    <div className="mt-4 space-y-3">
      {lowStock.map((product) => (
        <div
          key={product.id}
          className="flex items-center justify-between rounded-2xl bg-white p-4"
        >
          <div>
            <p className="font-semibold text-slate-900">
              {product.name}
            </p>

            <p className="text-sm text-slate-500">
              {product.category}
            </p>
          </div>

          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
            {product.stock} Left
          </span>
        </div>
      ))}
    </div>
  </div>

  <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
    <div className="px-6 py-5 border-b border-slate-200">
      <h2 className="text-xl font-bold text-slate-900">
        Inventory Overview
      </h2>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Product
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Category
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Stock
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b border-slate-100 transition-all duration-300 hover:bg-orange-50"
            >
              <td className="px-6 py-5 font-semibold text-slate-900">
                {product.name}
              </td>

              <td className="px-6 py-5 text-slate-600">
                {product.category}
              </td>

              <td className="px-6 py-5 text-slate-900">
                {product.stock}
              </td>

              <td className="px-6 py-5">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    product.stock <= 10
                      ? 'bg-red-100 text-red-600'
                      : 'bg-green-100 text-green-600'
                  }`}
                >
                  {product.stock <= 10
                    ? 'Low Stock'
                    : 'In Stock'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>


)
}
