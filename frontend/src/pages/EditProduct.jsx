import React, { useState } from 'react'

export default function EditProduct() {
const [form, setForm] = useState({
productName: 'Wireless Mouse',
category: 'Accessories',
price: '899',
quantity: '24',
description: 'Premium wireless mouse',
})

const handleChange = (e) => {
setForm({
...form,
[e.target.name]: e.target.value,
})
}

return ( <div className="space-y-8"> <div> <p className="text-sm font-medium text-orange-500">
Product Management </p>

    <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
      Edit Product
    </h1>
  </div>

  <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
    <form className="grid gap-6 md:grid-cols-2">
      <input
        name="productName"
        value={form.productName}
        onChange={handleChange}
        className="rounded-2xl border border-slate-200 p-4"
      />

      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        className="rounded-2xl border border-slate-200 p-4"
      />

      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        className="rounded-2xl border border-slate-200 p-4"
      />

      <input
        name="quantity"
        value={form.quantity}
        onChange={handleChange}
        className="rounded-2xl border border-slate-200 p-4"
      />

      <textarea
        rows="5"
        name="description"
        value={form.description}
        onChange={handleChange}
        className="rounded-2xl border border-slate-200 p-4 md:col-span-2"
      />

      <button
        className="
        md:col-span-2
        rounded-2xl
        bg-orange-500
        py-4
        font-semibold
        text-white
        transition-all
        duration-300
        hover:bg-orange-600
        hover:shadow-lg
        "
      >
        Update Product
      </button>
    </form>
  </div>
</div>


)
}
