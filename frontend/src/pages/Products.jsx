import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../api/axios'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const load = async () => {
      const res = await axios.get('/products')
      setProducts(res.data)
      setLoading(false)
    }
    load()
  }, [])

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return
    await axios.delete(`/products/${id}`)
    setProducts(products.filter((item) => item._id !== id))
  }

  const filtered = products.filter((product) =>
    product.productName.toLowerCase().includes(search.toLowerCase()) ||
    product.category?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <div className="p-6 text-center">Loading products...</div>

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-sm text-slate-600">Manage inventory, pricing, and stock.</p>
        </div>
        <Link to="/products/add" className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">Add Product</Link>
      </div>

      <div className="rounded bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="w-full rounded border px-4 py-3 sm:w-1/2" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-3 py-3">Name</th>
                <th className="px-3 py-3">Category</th>
                <th className="px-3 py-3">Price</th>
                <th className="px-3 py-3">Stock</th>
                <th className="px-3 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product._id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-3 py-3 font-medium">{product.productName}</td>
                  <td className="px-3 py-3">{product.category || 'General'}</td>
                  <td className="px-3 py-3">₹{product.price.toFixed(2)}</td>
                  <td className={`px-3 py-3 font-semibold ${product.quantity <= 5 ? 'text-rose-600' : 'text-slate-800'}`}>{product.quantity}</td>
                  <td className="px-3 py-3 space-x-2">
                    <Link to={`/products/edit/${product._id}`} className="rounded bg-slate-800 px-3 py-2 text-xs text-white">Edit</Link>
                    <button onClick={() => deleteProduct(product._id)} className="rounded bg-rose-600 px-3 py-2 text-xs text-white">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="mt-4 text-center text-slate-500">No products match your search.</div>}
        </div>
      </div>
    </div>
  )
}
