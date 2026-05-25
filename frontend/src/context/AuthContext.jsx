import React, { createContext, useEffect, useState } from 'react'
import axios from '../api/axios'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      const storedToken = localStorage.getItem('token')
      if (!storedToken) {
        setLoading(false)
        return
      }
      try {
        axios.defaults.headers.common.Authorization = `Bearer ${storedToken}`
        const res = await axios.get('/auth/profile')
        setUser(res.data)
        setToken(storedToken)
      } catch (error) {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    loadUser()
  }, [])

  const login = async (tokenValue) => {
    localStorage.setItem('token', tokenValue)
    axios.defaults.headers.common.Authorization = `Bearer ${tokenValue}`
    setToken(tokenValue)
    const res = await axios.get('/auth/profile')
    setUser(res.data)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    delete axios.defaults.headers.common.Authorization
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
