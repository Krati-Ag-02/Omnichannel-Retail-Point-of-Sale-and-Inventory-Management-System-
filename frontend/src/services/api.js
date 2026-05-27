const BASE_URL = "http://localhost:5000/api"

function getToken() {
  return localStorage.getItem("token")
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`
  }
}

async function request(method, path, body = null) {
  const options = {
    method,
    headers: authHeaders()
  }
  if (body) options.body = JSON.stringify(body)

  const res = await fetch(`${BASE_URL}${path}`, options)
  const data = await res.json()

  if (!res.ok) throw new Error(data.message || "Something went wrong")
  return data
}

export const authService = {
  login: (email, password) =>
    request("POST", "/auth/login", { email, password }),

  register: (name, email, password) =>
    request("POST", "/auth/register", { name, email, password }),

  getProfile: () =>
    request("GET", "/auth/profile")
}

export const orderService = {
  getAll: () => request("GET", "/orders"),
  getOne: (id) => request("GET", `/orders/${id}`),
  create: (orderData) => request("POST", "/orders", orderData)
}

export const productService = {
  getAll: () => request("GET", "/products"),
  getOne: (id) => request("GET", `/products/${id}`),
  create: (data) => request("POST", "/products", data),
  update: (id, data) => request("PUT", `/products/${id}`, data),
  delete: (id) => request("DELETE", `/products/${id}`)
}