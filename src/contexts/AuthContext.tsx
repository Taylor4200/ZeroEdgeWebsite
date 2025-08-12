'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  username: string
  role: 'admin' | 'user'
  permissions: string[]
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  checkAuth: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken')
    const storedUser = localStorage.getItem('adminUser')
    
    if (token && storedUser) {
      // In production, validate token with backend
      setUser({
        username: storedUser,
        role: 'admin',
        permissions: ['all']
      })
      setIsAuthenticated(true)
    } else {
      setUser(null)
      setIsAuthenticated(false)
    }
    setIsLoading(false)
  }

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Authentication with your specified credentials
      if (username === 'contact@zeroedgestudios.com' && password === 'Exporta420!') {
        const userData = {
          username,
          role: 'admin' as const,
          permissions: ['all']
        }
        
        localStorage.setItem('adminToken', 'mock-token')
        localStorage.setItem('adminUser', username)
        
        setUser(userData)
        setIsAuthenticated(true)
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    setUser(null)
    setIsAuthenticated(false)
    router.push('/admin/login')
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
