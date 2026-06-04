import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import Products from '../pages/Products'
import AddProduct from '../pages/AddProduct'
import EditProduct from '../pages/EditProduct'
import Inventory from '../pages/Inventory'
import POS from '../pages/POS'
import Orders from '../pages/Orders'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/add" element={<AddProduct />} />
      <Route path="/products/edit/:id" element={<EditProduct />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/pos" element={<POS />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/sales" element={<Orders />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}