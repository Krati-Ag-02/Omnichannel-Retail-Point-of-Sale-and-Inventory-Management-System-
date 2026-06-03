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
}
