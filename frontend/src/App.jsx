import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import MainLayout from "./layouts/MainLayout"

import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import Orders from "./pages/Orders"
import POS from "./pages/POS"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={<Navigate to="/dashboard" />}
          />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/pos" element={<POS />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}