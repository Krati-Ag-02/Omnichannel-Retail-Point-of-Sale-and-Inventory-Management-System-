import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Products() {
const [search, setSearch] = useState('')

const products = [
{
id: 1,
productName: 'Wireless Mouse',
category: 'Accessories',
price: 899,
quantity: 24,
},
{
id: 2,
productName: 'Mechanical Keyboard',
category: 'Accessories',
price: 2999,
quantity: 12,
},
{
id: 3,
productName: 'Gaming Headset',
category: 'Audio',
price: 2499,
quantity: 5,
},
{
id: 4,
productName: 'USB-C Cable',
category: 'Cables',
price: 299,
quantity: 48,
},
{
id: 5,
productName: 'Laptop Stand',
category: 'Office',
price: 1499,
quantity: 8,
},
]

const filteredProducts = products.filter(
(product) =>
product.productName.toLowerCase().includes(search.toLowerCase()) ||
product.category.toLowerCase().includes(search.toLowerCase())
)

return ( <div className="space-y-8"> <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"> <div> <p className="text-sm font-medium text-orange-500">
Inventory Management </p>

      <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
        Products
      </h1>

      <p className="mt-2 text-slate-500">
        Manage inventory, pricing and stock levels.
      </p>
    </div>

    <Link
      to="/products/add"
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
      + Add Product
    </Link>
  </div>

  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <input
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="
      w-full
      rounded-2xl
      border
      border-slate-200
      px-4
      py-3
      outline-none
      transition-all
      duration-300
      focus:border-orange-400
      focus:ring-4
      focus:ring-orange-100
      "
    />
  </div>

  <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
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
              Price
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Stock
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map((product) => (
            <tr
              key={product.id}
              className="
              border-b
              border-slate-100
              transition-all
              duration-300
              hover:bg-orange-50
              "
            >
              <td className="px-6 py-5">
                <div className="font-semibold text-slate-900">
                  {product.productName}
                </div>
              </td>

              <td className="px-6 py-5 text-slate-600">
                {product.category}
              </td>

              <td className="px-6 py-5 font-medium text-slate-900">
                ₹{product.price}
              </td>

              <td className="px-6 py-5">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    product.quantity <= 10
                      ? 'bg-red-100 text-red-600'
                      : 'bg-green-100 text-green-600'
                  }`}
                >
                  {product.quantity} in stock
                </span>
              </td>

              <td className="px-6 py-5">
                <div className="flex gap-2">
                  <button
                    className="
                    rounded-xl
                    border
                    border-slate-200
                    px-4
                    py-2
                    text-sm
                    font-medium
                    transition-all
                    duration-300
                    hover:bg-slate-100
                    "
                  >
                    Edit
                  </button>

                  <button
                    className="
                    rounded-xl
                    bg-red-500
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-white
                    transition-all
                    duration-300
                    hover:bg-red-600
                    "
                  >
                    Delete
                  </button>
                </div>
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
