'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/admin/ProtectedRoute'
import { AuthProvider } from '@/contexts/AuthContext'
import { 
  LayoutDashboard, 
  Gamepad2, 
  Newspaper, 
  MessageSquare, 
  Settings, 
  Upload,
  LogOut,
  Menu,
  X,
  Home,
  Users,
  Shield
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Games', href: '/admin/games', icon: Gamepad2 },
  { name: 'News', href: '/admin/news', icon: Newspaper },
  { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { name: 'Assets', href: '/admin/assets', icon: Upload },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  // Don't show sidebar for login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-900 pt-16">
        {/* Mobile sidebar */}
        <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
          <div className="fixed inset-0 bg-black/80" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-slate-800 border-r border-slate-700" style={{ top: '64px' }}>
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">ZE</span>
                </div>
                <h1 className="text-xl font-bold text-white">Admin Panel</h1>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* User Info */}
            <div className="p-4 border-b border-slate-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Shield size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">{user?.username}</p>
                  <p className="text-slate-400 text-sm capitalize">{user?.role}</p>
                </div>
              </div>
            </div>

            <nav className="p-4 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <item.icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
              <div className="pt-4 border-t border-slate-700">
                <Link
                  href="/"
                  className="flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 hover:text-white rounded-lg transition-colors"
                >
                  <Home size={20} />
                  <span>Back to Site</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col" style={{ top: '64px' }}>
          <div className="flex flex-col flex-grow bg-slate-800 border-r border-slate-700">
            <div className="flex items-center h-16 px-4 border-b border-slate-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">ZE</span>
                </div>
                <h1 className="text-xl font-bold text-white">Admin Panel</h1>
              </div>
            </div>

            {/* User Info */}
            <div className="p-4 border-b border-slate-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Shield size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">{user?.username}</p>
                  <p className="text-slate-400 text-sm capitalize">{user?.role}</p>
                </div>
              </div>
            </div>

            <nav className="flex-1 p-4 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <item.icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
              <div className="pt-4 border-t border-slate-700">
                <Link
                  href="/"
                  className="flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 hover:text-white rounded-lg transition-colors"
                >
                  <Home size={20} />
                  <span>Back to Site</span>
                </Link>
              </div>
            </nav>
            <div className="p-4 border-t border-slate-700">
              <button 
                onClick={logout}
                className="flex items-center space-x-3 w-full px-3 py-2 text-slate-300 hover:bg-slate-700 hover:text-white rounded-lg transition-colors"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64">
          {/* Mobile header */}
          <div className="sticky top-16 z-40 flex items-center h-16 px-4 bg-slate-800 border-b border-slate-700 lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-slate-400 hover:text-white"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center space-x-3 ml-4">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">ZE</span>
              </div>
              <h1 className="text-lg font-semibold text-white">Admin Panel</h1>
            </div>
          </div>

          {/* Page content */}
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  )
}
