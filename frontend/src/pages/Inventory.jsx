import React, { useEffect, useMemo, useState } from 'react'
import axios from '../api/axios'

const CATEGORY_OPTIONS = ['All', 'Electronics', 'Grocery', 'Accessories', 'Clothing']

function StatCard({
  title,
  value,
  tone = 'slate',
  icon = null,
  trend = null // { text: '+12%', dir: 'up'|'down' }
}) {
  const toneClasses =
    tone === 'rose'
      ? 'bg-rose-50 text-rose-800 border-rose-200'
      : tone === 'emerald'
      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
      : 'bg-slate-50 text-slate-800 border-slate-200'

  const trendClasses =
    trend?.dir === 'up'
      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
      : trend?.dir === 'down'
      ? 'bg-rose-100 text-rose-800 border-rose-200'
      : 'bg-slate-100 text-slate-800 border-slate-200'

  return (
    <div
      className={`group rounded border p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md ${toneClasses}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm text-slate-600">{title}</div>
          <div className="mt-1 flex items-center gap-2">
            {icon}
            <div className="text-2xl font-semibold">{value}</div>
          </div>
        </div>

        {trend && (
          <div
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${trendClasses}`}
            title="Trend vs previous period"
          >
            {trend.text}
          </div>
        )}
      </div>
    </div>
  )
}


function StockBadge({ qty }) {
  const q = Number(qty ?? 0)

  if (q <= 0) {
    return (
      <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-800">
        Out of Stock
      </span>
    )
  }

  if (q < 5) {
    return (
      <span className="inline-flex items-center rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-800">
        Low Stock
      </span>
    )
  }

  return (
    <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
      In Stock
    </span>
  )
}


export default function Inventory() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sort, setSort] = useState({ key: 'name', dir: 'asc' })


  useEffect(() => {
    const load = async () => {
      // Development fallback products (only used when API returns empty)
      const demoProducts = [
        { productName: 'Laptop', category: 'Electronics', price: 50000, quantity: 10 },
        { productName: 'Wireless Mouse', category: 'Accessories', price: 800, quantity: 25 },
        { productName: 'Keyboard', category: 'Accessories', price: 1200, quantity: 15 },
        { productName: 'Printer', category: 'Electronics', price: 8500, quantity: 3 }
      ]

      try {
        const res = await axios.get('/products')
        const data = res.data

        // backend kabhi-kabhi response object { success, products } bhejta hai
        // ya directly array bhejta hai
        const apiProducts = data?.products ? data.products : data

        if (Array.isArray(apiProducts) && apiProducts.length > 0) {
          setProducts(apiProducts)
        } else {
          // Prevent duplicates by productName within demo set
          const uniqueByName = new Map()
          for (const p of demoProducts) uniqueByName.set(p.productName, p)

          const normalized = Array.from(uniqueByName.values()).map((p, idx) => ({
            _id: `demo-${idx}-${p.productName}`,
            ...p
          }))

          setProducts(normalized)
        }
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])


  const updateStock = async (id, delta) => {
    const current = Array.isArray(products) ? products : []
    const product = current.find((item) => item._id === id)
    if (!product) return

    const currentQty = Number(product.quantity ?? 0)
    const newQuantity = Math.max(0, currentQty + delta)

    await axios.put(`/products/${id}`, { ...product, quantity: newQuantity })
    setProducts(current.map((item) => (item._id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const safeProducts = Array.isArray(products) ? products : []
  const lowStock = safeProducts.filter((item) => Number(item.quantity ?? 0) < 5)

  const totalProducts = safeProducts.length
  const totalLowStock = lowStock.length
  const totalCategories = new Set(
    safeProducts
      .map((p) => (p.category || '').trim())
      .filter(Boolean)
  ).size

  const filteredProducts = useMemo(() => {
    const s = search.toLowerCase().trim()

    return safeProducts.filter((p) => {
      const matchesSearch =
        (p.productName || '').toLowerCase().includes(s) ||
        (p.category || '').toLowerCase().includes(s)

      const productCategory = (p.category || '').trim()
      const matchesCategory =
        selectedCategory === 'All' ? true : productCategory === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [safeProducts, search, selectedCategory])

  const lowStockInFiltered = filteredProducts.filter((p) => Number(p.quantity ?? 0) < 5)

  if (loading) {
    return (
      <div className="flex min-h-[240px] items-center justify-center p-6 text-center">
        <div className="rounded-3xl bg-white/80 px-6 py-4 text-slate-700 shadow-sm">
          Loading inventory...
        </div>
      </div>
    )
  }

  return (
  <div className="space-y-6">
    <div className="grid gap-4 sm:grid-cols-4">
      <StatCard
        title="Total Products"
        value={totalProducts}
        tone="slate"
        icon={<span aria-hidden className="text-slate-500">📦</span>}
        trend={{ text: '+12%', dir: 'up' }}
      />

      <StatCard
        title="Low Stock"
        value={totalLowStock}
        tone="rose"
        icon={<span aria-hidden className="text-rose-500">⚠️</span>}
        trend={{ text: '-5%', dir: 'down' }}
      />

      <StatCard
        title="Categories"
        value={totalCategories}
        tone="emerald"
        icon={<span aria-hidden className="text-emerald-500">🏷️</span>}
        trend={{ text: '+8%', dir: 'up' }}
      />

      <StatCard
        title="Inventory Value"
        value={`₹${safeProducts
          .reduce((sum, p) => sum + Number(p.price ?? 0) * Number(p.quantity ?? 0), 0)
          .toFixed(0)}`}
        tone="emerald"
        icon={<span aria-hidden className="text-emerald-500">💰</span>}
        trend={{ text: '+4%', dir: 'up' }}
      />
    </div>

    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <section className="rounded bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Low Stock Alerts</h2>

        {lowStock.length === 0 ? (
          <p className="mt-4 text-slate-600">
            All products are sufficiently stocked.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {lowStock.map((product) => (
              <li
                key={product._id}
                className="rounded border border-rose-200 bg-rose-50 p-3"
              >
                <div className="flex items-center justify-between gap-2 text-sm">
                  <div>
                    <div className="font-semibold">
                      {product.productName}
                    </div>
                    <div className="text-slate-600">
                      Stock: {product.quantity}
                    </div>
                  </div>

                  <button
                    onClick={() => updateStock(product._id, 10)}
                    className="rounded bg-emerald-600 px-3 py-1 text-white hover:bg-emerald-700"
                  >
                    Restock +10
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-semibold">Inventory Details</h2>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded border px-4 py-3 sm:w-[260px]"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded border px-4 py-3 sm:w-[240px]"
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <div className="max-h-[520px] overflow-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="sticky top-0 z-10 bg-white">
                <tr className="border-b border-slate-200">
                  <th className="px-3 py-2">
                    <button
                      onClick={() =>
                        setSort((prev) => ({
                          key: 'name',
                          dir:
                            prev.key === 'name'
                              ? prev.dir === 'asc'
                                ? 'desc'
                                : 'asc'
                              : 'asc'
                        }))
                      }
                    >
                      Sort: Name
                    </button>
                  </th>

                  <th className="px-3 py-2">Category</th>

                  <th className="px-3 py-2">
                    <button
                      onClick={() =>
                        setSort((prev) => ({
                          key: 'price',
                          dir:
                            prev.key === 'price'
                              ? prev.dir === 'asc'
                                ? 'desc'
                                : 'asc'
                              : 'asc'
                        }))
                      }
                    >
                      Sort: Price
                    </button>
                  </th>

                  <th className="px-3 py-2">
                    <button
                      onClick={() =>
                        setSort((prev) => ({
                          key: 'stock',
                          dir:
                            prev.key === 'stock'
                              ? prev.dir === 'asc'
                                ? 'desc'
                                : 'asc'
                              : 'asc'
                        }))
                      }
                    >
                      Sort: Stock
                    </button>
                  </th>

                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts
                  .slice()
                  .sort((a, b) => {
                    const dir = sort.dir === 'asc' ? 1 : -1

                    if (sort.key === 'name') {
                      return (
                        (a.productName || '').localeCompare(
                          b.productName || ''
                        ) * dir
                      )
                    }

                    if (sort.key === 'price') {
                      return (
                        (Number(a.price ?? 0) -
                          Number(b.price ?? 0)) * dir
                      )
                    }

                    if (sort.key === 'stock') {
                      return (
                        (Number(a.quantity ?? 0) -
                          Number(b.quantity ?? 0)) * dir
                      )
                    }

                    return 0
                  })
                  .map((product, idx) => {
                    const qty = Number(product.quantity ?? 0)
                    const isLow = qty < 5

                    return (
                      <tr
                        key={product._id}
                        className={`border-b border-slate-100 ${
                          idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                        } ${isLow ? 'bg-rose-50/70' : ''} hover:bg-slate-100`}
                      >
                        <td className="px-3 py-3 font-medium">
                          {product.productName}
                        </td>

                        <td className="px-3 py-3">
                          {product.category || '-'}
                        </td>

                        <td className="px-3 py-3 font-semibold">
                          ₹{Number(product.price ?? 0).toFixed(0)}
                        </td>

                        <td
                          className={`px-3 py-3 font-semibold ${
                            isLow
                              ? 'text-rose-700'
                              : 'text-slate-800'
                          }`}
                        >
                          {qty}
                        </td>

                        <td className="px-3 py-3">
                          <StockBadge qty={qty} />
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>

            {filteredProducts.length === 0 && (
              <div className="mt-4 text-center text-slate-500">
                No products found
              </div>
            )}

            {filteredProducts.length > 0 &&
              lowStockInFiltered.length > 0 && (
                <div className="mt-3 text-xs text-rose-700">
                  {lowStockInFiltered.length} product(s) are below
                  the low stock threshold.
                </div>
              )}
          </div>
        </div>
      </section>
    </div>
  </div>
)
}