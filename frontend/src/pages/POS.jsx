import { useState } from "react"

const catalogue = [
  { _id: "1", name: "Basmati Rice 5kg", price: 250, category: "Grocery" },
  { _id: "2", name: "Tata Salt 1kg", price: 20, category: "Grocery" },
  { _id: "3", name: "Amul Butter 500g", price: 230, category: "Dairy" },
  { _id: "4", name: "Surf Excel 2kg", price: 300, category: "Household" },
  { _id: "5", name: "Maggi 12-pack", price: 100, category: "Grocery" },
  { _id: "6", name: "Dettol Soap", price: 45, category: "Personal Care" },
  { _id: "7", name: "Colgate 200g", price: 65, category: "Personal Care" },
  { _id: "8", name: "Aashirvaad Atta 5kg", price: 280, category: "Grocery" },
]

export default function POS() {
  const [cart, setCart] = useState([])
  const [search, setSearch] = useState("")
  const [orderPlaced, setOrderPlaced] = useState(false)

  const filtered = catalogue.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  function addToCart(product) {
    setCart(prev => {
      const existing = prev.find(i => i._id === product._id)
      if (existing) {
        return prev.map(i =>
          i._id === product._id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i._id !== id))
  }

  function updateQty(id, qty) {
    if (qty < 1) return removeFromCart(id)
    setCart(prev => prev.map(i => i._id === id ? { ...i, qty } : i))
  }

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0)
  const tax = Math.round(subtotal * 0.18)
  const total = subtotal + tax

  function placeOrder() {
    if (cart.length === 0) return
    setOrderPlaced(true)
    setTimeout(() => {
      setCart([])
      setOrderPlaced(false)
    }, 2000)
  }

  return (
    <div className="flex gap-6 h-[calc(100vh-8rem)]">

      {/* Left — Product Catalogue */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        <div>
          <h1 className="text-2xl font-bold text-white">Point of Sale</h1>
          <p className="text-slate-400 text-sm mt-1">Select items to add to cart</p>
        </div>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />

        <div className="grid grid-cols-2 gap-3 overflow-y-auto pb-2">
          {filtered.map(product => (
            <button
              key={product._id}
              onClick={() => addToCart(product)}
              className="text-left rounded-xl border border-white/10 bg-white/5 p-4 hover:border-indigo-500 hover:bg-indigo-500/10 transition group"
            >
              <p className="text-white text-sm font-medium leading-snug">{product.name}</p>
              <p className="text-slate-400 text-xs mt-1">{product.category}</p>
              <p className="text-indigo-400 font-bold mt-2">₹{product.price}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Right — Cart */}
      <div className="w-80 shrink-0 flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5 gap-4">
        <h2 className="text-base font-semibold text-white">Current Cart</h2>

        {cart.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-slate-500 text-sm text-center">No items yet.<br/>Click a product to add.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-3">
            {cart.map(item => (
              <div key={item._id} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">{item.name}</p>
                  <p className="text-slate-400 text-xs">₹{item.price} each</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => updateQty(item._id, item.qty - 1)}
                    className="w-6 h-6 rounded-md bg-white/10 text-white text-sm hover:bg-white/20 transition"
                  >−</button>
                  <span className="w-6 text-center text-white text-sm">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item._id, item.qty + 1)}
                    className="w-6 h-6 rounded-md bg-white/10 text-white text-sm hover:bg-white/20 transition"
                  >+</button>
                </div>
                <p className="text-white text-sm font-medium w-16 text-right shrink-0">
                  ₹{(item.price * item.qty).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Totals */}
        <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
          <div className="flex justify-between text-slate-400">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>GST (18%)</span>
            <span>₹{tax.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between text-white font-bold text-base pt-1">
            <span>Total</span>
            <span>₹{total.toLocaleString("en-IN")}</span>
          </div>
        </div>

        <button
          onClick={placeOrder}
          disabled={cart.length === 0}
          className={`w-full py-3 rounded-xl font-semibold text-sm transition ${
            orderPlaced
              ? "bg-green-600 text-white"
              : cart.length === 0
              ? "bg-white/5 text-slate-500 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-500 text-white"
          }`}
        >
          {orderPlaced ? "✓ Order Placed!" : "Place Order"}
        </button>
      </div>
    </div>
  )
}