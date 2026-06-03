import React, { useState } from 'react'

export default function AddProduct() {
const [form, setForm] = useState({
productName: '',
category: '',
price: '',
quantity: '',
description: '',
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
      Add Product
    </h1>
  </div>

  <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
    <form className="grid gap-6 md:grid-cols-2">
      <input
        name="productName"
        placeholder="Product Name"
        value={form.productName}
        onChange={handleChange}
        className="rounded-2xl border border-slate-200 p-4"
      />

      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        className="rounded-2xl border border-slate-200 p-4"
      />

      <input
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        className="rounded-2xl border border-slate-200 p-4"
      />

      <input
        name="quantity"
        placeholder="Quantity"
        value={form.quantity}
        onChange={handleChange}
        className="rounded-2xl border border-slate-200 p-4"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        rows="5"
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
        hover:bg-orange-600
        "
      >
        Save Product
      </button>
    </form>
  </div>
</div>

)
}
