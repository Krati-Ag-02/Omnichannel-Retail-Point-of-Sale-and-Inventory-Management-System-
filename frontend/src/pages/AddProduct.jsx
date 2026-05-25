import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'

export default function AddProduct() {
  const [form, setForm] = useState({ productName: '', category: '', price: '', quantity: '', barcode: '', description: '' })
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    await axios.post('/products', {
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity)
    })
    setSaving(false)
    navigate('/products')
  }

  return (
    <div className="space-y-4">
      <div className="rounded bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Add Product</h1>
        <form onSubmit={submit} className="mt-5 grid gap-4 md:grid-cols-2">
          <input name="productName" value={form.productName} onChange={handleChange} required placeholder="Product name" className="rounded border p-3" />
          <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="rounded border p-3" />
          <input name="price" value={form.price} onChange={handleChange} type="number" min="0" step="0.01" required placeholder="Price" className="rounded border p-3" />
          <input name="quantity" value={form.quantity} onChange={handleChange} type="number" min="0" required placeholder="Stock quantity" className="rounded border p-3" />
          <input name="barcode" value={form.barcode} onChange={handleChange} placeholder="Barcode" className="rounded border p-3 md:col-span-2" />
          <textarea name="description" value={form.description} onChange={handleChange} rows="4" placeholder="Description" className="rounded border p-3 md:col-span-2" />
          <button type="submit" disabled={saving} className="w-full rounded bg-emerald-600 px-4 py-3 text-white hover:bg-emerald-700 md:col-span-2">
            {saving ? 'Saving...' : 'Save Product'}
          </button>
        </form>
      </div>
    </div>
  )
}
