<<<<<<< HEAD
import React, { useState } from 'react'

export default function POS() {
const [cart, setCart] = useState([])

const products = [
{ id: 1, name: 'Wireless Mouse', price: 899 },
{ id: 2, name: 'Mechanical Keyboard', price: 2999 },
{ id: 3, name: 'Gaming Headset', price: 2499 },
{ id: 4, name: 'USB-C Cable', price: 299 },
{ id: 5, name: 'Laptop Stand', price: 1499 },
{ id: 6, name: 'Webcam', price: 3499 },
]

const addToCart = (product) => {
setCart((prev) => [...prev, product])
}

const total = cart.reduce(
(sum, item) => sum + item.price,
0
)

return ( <div className="space-y-8"> <div> <p className="text-sm font-medium text-orange-500">
Point Of Sale </p>


    <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
      POS Terminal
    </h1>

    <p className="mt-2 text-slate-500">
      Create bills and manage customer orders.
    </p>
  </div>

  <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">
        Products
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="
            rounded-2xl
            border
            border-slate-200
            p-5
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-orange-300
            hover:shadow-lg
            "
          >
            <h3 className="font-semibold text-slate-900">
              {product.name}
            </h3>

            <p className="mt-2 text-slate-500">
              ₹{product.price}
            </p>

            <button
              onClick={() => addToCart(product)}
              className="
              mt-4
              w-full
              rounded-xl
              bg-orange-500
              px-4
              py-2
              font-medium
              text-white
              transition-all
              duration-300
              hover:bg-orange-600
              "
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>

    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">
        Cart
      </h2>

      <div className="mt-6 space-y-3">
        {cart.length === 0 ? (
          <p className="text-slate-500">
            No items added yet.
          </p>
        ) : (
          cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl bg-slate-50 p-3"
            >
              <span>{item.name}</span>

              <span>₹{item.price}</span>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 border-t border-slate-200 pt-6">
        <div className="flex items-center justify-between">
          <span className="font-medium text-slate-600">
            Total
          </span>

          <span className="text-2xl font-bold text-slate-900">
            ₹{total}
          </span>
        </div>

        <button
          className="
          mt-6
          w-full
          rounded-2xl
          bg-orange-500
          py-3
          font-semibold
          text-white
          transition-all
          duration-300
          hover:bg-orange-600
          hover:shadow-lg
          "
        >
          Checkout
        </button>
      </div>
    </div>
  </div>
</div>


)
=======
import React, { useEffect, useMemo, useRef, useState } from 'react'
import axios from '../api/axios'
import { useCart } from '../context/CartContext'

export default function POS() {
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const searchInputRef = useRef(null)

  const { cart, addToCart, updateQuantity, removeFromCart, clearCart, totalAmount } = useCart()

  // POS pricing breakdown (front-end only). Backend APIs remain unchanged.
  const DISCOUNT_RATE = 0.05 // 5%
  const TAX_RATE = 0.18 // 18%



  useEffect(() => {
    const load = async () => {
      const demoProducts = [
        { productName: 'Laptop', category: 'Electronics', price: 50000, quantity: 10 },
        { productName: 'Wireless Mouse', category: 'Accessories', price: 800, quantity: 25 },
        { productName: 'Keyboard', category: 'Accessories', price: 1200, quantity: 15 },
        { productName: 'Printer', category: 'Electronics', price: 8500, quantity: 3 }
      ]

      const res = await axios.get('/products')
      const data = res.data

      // Some backends may respond as { success, products }
      const apiProducts = data?.products ? data.products : data

      // Only use demos when API returns no products.
      if (Array.isArray(apiProducts) && apiProducts.length > 0) {
        setProducts(apiProducts)
      } else {
        // Prevent duplicates: ensure unique by productName within demo set.
        const uniqueByName = new Map()
        for (const p of demoProducts) uniqueByName.set(p.productName, p)
        const normalized = Array.from(uniqueByName.values()).map((p, idx) => ({
          // POS expects `_id`.
          _id: `demo-${idx}-${p.productName}`,
          ...p
        }))
        setProducts(normalized)
      }

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

  const safeProducts = Array.isArray(products) ? products : []

  const filteredProducts = safeProducts.filter((product) =>
    product.productName?.toLowerCase().includes(query.toLowerCase()) ||
    product.category?.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    // Keep highlighted index within bounds when filtering changes
    if (!filteredProducts.length) {
      setHighlightedIndex(0)
      return
    }
    setHighlightedIndex((prev) => Math.min(Math.max(prev, 0), filteredProducts.length - 1))
  }, [query, filteredProducts.length])

  useEffect(() => {
    const onKeyDown = (e) => {
      const target = e.target
      const tagName = target?.tagName?.toLowerCase?.() || ''

      const isCtrlK = e.ctrlKey && (e.key === 'k' || e.key === 'K')
      const isEsc = e.key === 'Escape'
      const isEnter = e.key === 'Enter'

      if (isCtrlK) {
        e.preventDefault()
        searchInputRef.current?.focus()
        return
      }

      // Esc: clear search (regardless of focus)
      if (isEsc) {
        e.preventDefault()
        setQuery('')
        setHighlightedIndex(0)
        return
      }

      if (isEnter) {
        // If the user is typing in a different input, don't add to cart.
        // (We allow Enter while focused on our search input.)
        const activeEl = document.activeElement
        const isOnSearchInput = activeEl === searchInputRef.current
        const isOtherInput = tagName === 'input' || tagName === 'textarea'
        if (isOtherInput && !isOnSearchInput) return

        const product = filteredProducts[highlightedIndex]
        if (product) {
          e.preventDefault()
          addToCart(product)
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [addToCart, filteredProducts, highlightedIndex])


  if (loading) return (

    <div className="flex min-h-[240px] items-center justify-center p-6 text-center">
      <div className="rounded-3xl bg-white/80 px-6 py-4 text-slate-700 shadow-sm">
        Loading POS products...
      </div>
    </div>
  )

  return (
    <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
      <section className="rounded bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">POS</h1>
            <p className="text-sm text-slate-600">Add products to cart and checkout.</p>
          </div>
          <div className="w-full sm:max-w-[360px]">
            <input
              ref={searchInputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products"
              className="w-full rounded border px-4 py-3"
            />
            <div className="mt-2 text-xs text-slate-500">Ctrl+K Search &nbsp;|&nbsp; Esc Clear &nbsp;|&nbsp; Enter Add Product</div>

          </div>

        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {filteredProducts.map((product, index) => (
            <div
              key={product._id}
              onClick={() => setHighlightedIndex(index)}
              className={
                `rounded border p-4 cursor-pointer transition ` +
                (index === highlightedIndex
                  ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-300'
                  : 'border-slate-200 bg-white')
              }
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-semibold">{product.productName}</div>
                  <div className="text-sm text-slate-500">₹{product.price.toFixed(2)}</div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setHighlightedIndex(index)
                    handleAdd(product)
                  }}
                  className="rounded bg-emerald-600 px-3 py-2 text-sm text-white hover:bg-emerald-700"
                >
                  Add
                </button>
              </div>
              <div className="mt-3 text-sm text-slate-500">Stock: {product.quantity}</div>
            </div>
          ))}

        </div>
      </section>

      <section className="rounded bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Cart</h2>
        {message && (
          <div className="my-4 rounded border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
            {message}
          </div>
        )}

        {cart.length === 0 ? (
          <div className="mt-4 space-y-4">
            <p className="text-center text-slate-600">Cart is empty</p>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs text-slate-600">Total Items</div>
                <div className="mt-1 text-lg font-semibold">0</div>
              </div>
              <div className="rounded border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs text-slate-600">Total Quantity</div>
                <div className="mt-1 text-lg font-semibold">0</div>
              </div>
              <div className="rounded border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs text-slate-600">Total Amount</div>
                <div className="mt-1 text-lg font-semibold">₹0.00</div>
              </div>
            </div>

            <button
              disabled
              className="w-full cursor-not-allowed rounded bg-emerald-600/50 px-4 py-3 text-white"
            >
              Checkout
            </button>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {/* Cart summary */}
            {(() => {
              const totalItems = cart.length
              const totalQty = cart.reduce((acc, item) => acc + (Number(item.quantity ?? 0) || 0), 0)
              const totalAmt = Number(totalAmount ?? 0) || 0

              return (
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded border border-slate-200 bg-slate-50 p-3">
                    <div className="text-xs text-slate-600">Total Items</div>
                    <div className="mt-1 text-lg font-semibold">{totalItems}</div>
                  </div>
                  <div className="rounded border border-slate-200 bg-slate-50 p-3">
                    <div className="text-xs text-slate-600">Total Quantity</div>
                    <div className="mt-1 text-lg font-semibold">{totalQty}</div>
                  </div>
                  <div className="rounded border border-slate-200 bg-slate-50 p-3">
                    <div className="text-xs text-slate-600">Total Amount</div>
                    <div className="mt-1 text-lg font-semibold">₹{totalAmt.toFixed(2)}</div>
                  </div>
                </div>
              )
            })()}

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

            {(() => {
              const subtotal = Number(totalAmount ?? 0) || 0
              const discount = subtotal * DISCOUNT_RATE
              const taxedBase = Math.max(0, subtotal - discount)
              const tax = taxedBase * TAX_RATE
              const grandTotal = taxedBase + tax

              return (
                <>
                  <div className="rounded border border-slate-200 bg-slate-50 p-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Subtotal</span>
                        <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Discount</span>
                        <span className="font-medium">-₹{discount.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Tax</span>
                        <span className="font-medium">₹{tax.toFixed(2)}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-slate-700">Grand Total</span>
                        <span className="text-xl font-semibold">₹{grandTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={checkout}
                    className="w-full rounded bg-emerald-600 px-4 py-3 text-white hover:bg-emerald-700"
                  >
                    Checkout (₹{grandTotal.toFixed(2)})
                  </button>
                </>
              )
            })()}

          </div>
        )}
      </section>
    </div>
  )
>>>>>>> 7cb91e5b12c21805bdde6bd111d24443b84661d9
}
