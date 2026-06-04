import axios from 'axios'

const instance = axios.create({
  // Prefer relative /api so Vite proxy works in local dev.
  // Use VITE_API_URL only when explicitly set (e.g., Docker).
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : '/api'
})

const token = localStorage.getItem('token')
if (token) instance.defaults.headers.common.Authorization = `Bearer ${token}`

export default instance
