import React, { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product === product._id)
      if (existing) {
        return prevCart.map((item) =>
          item.product === product._id
            ? { ...item, quantity: Math.min(product.quantity, item.quantity + 1), stock: product.quantity }
            : item
        )
      }

      // POS UI uses `item.name`
      return [...prevCart, {
        product: product._id,
        name: product.productName,
        price: product.price,
        quantity: 1,
        stock: product.quantity
      }]
    })
  }

  const updateQuantity = (productId, delta) => {
    setCart((prevCart) => {
      const nextCart = prevCart.map((item) => {
        if (item.product !== productId) return item
        const rawQty = item.quantity + delta
        if (rawQty <= 0) return null
        const nextQty = Math.min(item.stock, rawQty)
        return { ...item, quantity: nextQty }
      })

      // remove items when qty hits 0
      return nextCart.filter(Boolean)
    })
  }

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product !== productId))
  }


  const clearCart = () => setCart([])

  const totalAmount = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  )

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  )

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, totalAmount, totalItems }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
