import React, { useEffect, useMemo, useState } from 'react'
import axios from '../api/axios'
import { useCart } from '../context/CartContext'

export default function POS() {
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart, totalAmount } = useCart()

  useEffect(() => {
    const load = async () => {
      const res = await axios.get('/products')
      setProducts(res.data)
      setLoading(false)
    }
    load()
  }, [])

  const handleAdd = (product) => {
    addToCart(product)
  }

  const handleQty = (id, delta) => {
    updateQuantity(id, delta)
  }

  const checkout = async () => {
    if (cart.length === 0) return
    await axios.post('/orders', { products: cart, totalAmount: totalAmount, paymentMethod: 'cash' })
    clearCart()
    setMessage('Order completed successfully.')
  }

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(query.toLowerCase()) ||
    product.category?.toLowerCase().includes(query.toLowerCase())
  )

  if (loading) return <div className="p-6 text-center">Loading POS products...</div>

  return (
    <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
      <section className="rounded bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">POS</h1>
            <p className="text-sm text-slate-600">Add products to cart and checkout.</p>
          </div>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products" className="rounded border px-4 py-3" />
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {filteredProducts.map((product) => (
            <div key={product._id} className="rounded border border-slate-200 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-semibold">{product.productName}</div>
                  <div className="text-sm text-slate-500">₹{product.price.toFixed(2)}</div>
                </div>
                <button onClick={() => handleAdd(product)} className="rounded bg-emerald-600 px-3 py-2 text-sm text-white hover:bg-emerald-700">Add</button>
              </div>
              <div className="mt-3 text-sm text-slate-500">Stock: {product.quantity}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Cart</h2>
        {message && <div className="my-4 rounded border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">{message}</div>}
        {cart.length === 0 ? (
          <p className="mt-4 text-slate-600">Select products to build a bill.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {cart.map((item) => (
              <div key={item.product} className="flex items-center justify-between gap-3 rounded border border-slate-200 p-3">
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-slate-500">₹{item.price.toFixed(2)} x {item.quantity}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleQty(item.product, -1)} className="rounded border px-2 py-1">-</button>
                  <button onClick={() => handleQty(item.product, 1)} className="rounded border px-2 py-1">+</button>
                  <button onClick={() => removeFromCart(item.product)} className="rounded bg-rose-600 px-2 py-1 text-white">x</button>
                </div>
              </div>
            ))}
            <div className="rounded border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between text-slate-600">
                <span>Total</span>
                <span className="text-xl font-semibold">₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>
            <button onClick={checkout} className="w-full rounded bg-emerald-600 px-4 py-3 text-white hover:bg-emerald-700">Checkout</button>
          </div>
        )}
      </section>
    </div>
  )
}
