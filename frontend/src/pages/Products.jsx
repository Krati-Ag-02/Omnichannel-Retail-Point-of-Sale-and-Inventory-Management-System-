import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../api/axios'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [page, setPage] = useState(1)

  const pageSize = 10

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get('/products')
        setProducts(Array.isArray(res.data) ? res.data : [])
      } catch (e) {
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/products/${id}`)
      setProducts((prev) => prev.filter((p) => p._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const categories = useMemo(() => {
    const set = new Set(
      products.map((p) => (p.category || 'General').trim())
    )
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [products])

  const filtered = useMemo(() => {
    const s = search.toLowerCase().trim()

    return products.filter((product) => {
      const matchesSearch =
        product.productName?.toLowerCase().includes(s) ||
        product.category?.toLowerCase().includes(s)

      const productCategory = (product.category || 'General').trim()

      const matchesCategory =
        category === 'all'
          ? true
          : productCategory === category

      return matchesSearch && matchesCategory
    })
  }, [products, search, category])

  useEffect(() => {
    setPage(1)
  }, [search, category])

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / pageSize)
  )

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, page])

  if (loading) {
    return (
      <div className="flex min-h-[240px] items-center justify-center p-6 text-center">
        <div className="rounded-3xl bg-white/80 px-6 py-4 text-slate-700 shadow-sm">
          Loading products...
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Products
          </h1>

          <p className="text-sm text-slate-600">
            Manage inventory, pricing, and stock.
          </p>
        </div>

        <Link
          to="/products/add"
          className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
        >
          Add Product
        </Link>
      </div>

      <div className="rounded bg-white p-6 shadow-sm">
        <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded border px-4 py-3"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded border px-4 py-3"
          >
            <option value="all">
              All categories
            </option>

            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-3 py-3">Name</th>
                <th className="px-3 py-3">Category</th>
                <th className="px-3 py-3">Price</th>
                <th className="px-3 py-3">Stock</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginated.map((product) => {
                const qty = product.quantity ?? 0
                const isLow = qty <= 5

                return (
                  <tr
                    key={product._id}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-3 py-3 font-medium">
                      {product.productName}
                    </td>

                    <td className="px-3 py-3">
                      {product.category || 'General'}
                    </td>

                    <td className="px-3 py-3">
                      ₹{Number(product.price ?? 0).toFixed(2)}
                    </td>

                    <td className="px-3 py-3 font-semibold">
                      {qty}
                    </td>

                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                          isLow
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {isLow ? 'Low' : 'OK'}
                      </span>
                    </td>

                    <td className="space-x-2 px-3 py-3">
                      <Link
                        to={`/products/edit/${product._id}`}
                        className="rounded bg-slate-800 px-3 py-2 text-xs text-white"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          deleteProduct(product._id)
                        }
                        className="rounded bg-rose-600 px-3 py-2 text-xs text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="mt-4 text-center text-slate-500">
              No products found
            </div>
          )}
        </div>

        {filtered.length > 0 && (
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-slate-600">
              Page {page} of {totalPages}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setPage((p) => Math.max(1, p - 1))
                }
                disabled={page === 1}
                className="rounded border px-3 py-2 text-sm disabled:opacity-50"
              >
                Prev
              </button>

              <div className="flex items-center gap-1">
                {Array.from(
                  { length: totalPages },
                  (_, i) => i + 1
                )
                  .slice(
                    Math.max(0, page - 3),
                    Math.min(totalPages, page + 2)
                  )
                  .map((num) => (
                    <button
                      key={num}
                      onClick={() => setPage(num)}
                      className={`rounded border px-3 py-2 text-sm ${
                        num === page
                          ? 'bg-slate-800 text-white'
                          : 'bg-white text-slate-700'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
              </div>

              <button
                onClick={() =>
                  setPage((p) =>
                    Math.min(totalPages, p + 1)
                  )
                }
                disabled={page === totalPages}
                className="rounded border px-3 py-2 text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}