import React, { useEffect, useState } from 'react'
import axios from '../api/axios'

export default function Inventory() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const res = await axios.get('/products')
      const data = res.data
      // backend kabhi-kabhi response object { success, products } bhejta hai
      // ya directly array bhejta hai
      setProducts(data?.products ? data.products : (Array.isArray(data) ? data : []))
      setLoading(false)
    }
    load()
  }, [])

  const updateStock = async (id, delta) => {
    const product = products.find((item) => item._id === id)
    if (!product) return
    const newQuantity = Math.max(0, product.quantity + delta)
    await axios.put(`/products/${id}`, { ...product, quantity: newQuantity })
    setProducts(products.map((item) => item._id === id ? { ...item, quantity: newQuantity } : item))
  }

  const safeProducts = Array.isArray(products) ? products : []
  const lowStock = safeProducts.filter((item) => item.quantity <= 5)

  if (loading) return (
    <div className="flex min-h-[240px] items-center justify-center p-6 text-center">
      <div className="rounded-3xl bg-white/80 px-6 py-4 text-slate-700 shadow-sm">
        Loading inventory...
      </div>
    </div>
  )

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <section className="rounded bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Low Stock Alerts</h2>
        {lowStock.length === 0 ? (
          <p className="mt-4 text-slate-600">All products are sufficiently stocked.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {lowStock.map((product) => (
              <li key={product._id} className="rounded border border-rose-200 bg-rose-50 p-3">
                <div className="flex items-center justify-between gap-2 text-sm">
                  <div>
                    <div className="font-semibold">{product.productName}</div>
                    <div className="text-slate-600">Stock: {product.quantity}</div>
                  </div>
                  <button onClick={() => updateStock(product._id, 10)} className="rounded bg-emerald-600 px-3 py-1 text-white">Restock +10</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Inventory Details</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-3 py-2">Product</th>
                <th className="px-3 py-2">Category</th>
                <th className="px-3 py-2">Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b border-slate-100">
                  <td className="px-3 py-3">{product.productName}</td>
                  <td className="px-3 py-3">{product.category || '-'}</td>
                  <td className={`px-3 py-3 font-semibold ${product.quantity <= 5 ? 'text-rose-600' : 'text-slate-800'}`}>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
