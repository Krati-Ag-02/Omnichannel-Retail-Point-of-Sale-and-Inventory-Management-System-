import { useState } from "react"

const fakeProducts = [
  { _id: "1", name: "Basmati Rice 5kg", price: 250, stock: 84, category: "Grocery" },
  { _id: "2", name: "Tata Salt 1kg", price: 20, stock: 200, category: "Grocery" },
  { _id: "3", name: "Amul Butter 500g", price: 230, stock: 12, category: "Dairy" },
  { _id: "4", name: "Surf Excel 2kg", price: 300, stock: 45, category: "Household" },
  { _id: "5", name: "Maggi 12-pack", price: 100, stock: 98, category: "Grocery" },
  { _id: "6", name: "Dettol Soap", price: 45, stock: 6, category: "Personal Care" },
]

export default function Products() {
  const [search, setSearch] = useState("")

  const filtered = fakeProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Products</h1>
          <p className="text-slate-400 mt-1 text-sm">{fakeProducts.length} items in catalog</p>
        </div>
        <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm text-white transition">
          + Add Product
        </button>
      </div>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full px-4 py-2 rounded-xl bg-[#081120] border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500"
      />

      <div className="rounded-2xl border border-white/10 bg-[#081120] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-slate-400 text-xs uppercase tracking-widest">
              <th className="text-left px-6 py-4">Product</th>
              <th className="text-left px-6 py-4">Category</th>
              <th className="text-left px-6 py-4">Price</th>
              <th className="text-left px-6 py-4">Stock</th>
              <th className="text-left px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(product => (
              <tr key={product._id} className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="px-6 py-4 text-white font-medium">{product.name}</td>
                <td className="px-6 py-4 text-slate-400">{product.category}</td>
                <td className="px-6 py-4 text-white">₹{product.price}</td>
                <td className="px-6 py-4 text-white">{product.stock}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    product.stock < 10
                      ? "text-red-400 bg-red-400/10"
                      : "text-green-400 bg-green-400/10"
                  }`}>
                    {product.stock < 10 ? "Low Stock" : "In Stock"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}