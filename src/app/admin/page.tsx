'use client'

import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { 
  Gamepad2, 
  Newspaper, 
  MessageSquare, 
  Upload, 
  TrendingUp, 
  Users,
  Eye,
  Calendar
} from 'lucide-react'

export default function AdminDashboard() {
  const { user } = useAuth()

  const stats = [
    {
      name: 'Total Games',
      value: '12',
      change: '+2',
      changeType: 'positive',
      icon: Gamepad2
    },
    {
      name: 'News Articles',
      value: '8',
      change: '+1',
      changeType: 'positive',
      icon: Newspaper
    },
    {
      name: 'Messages',
      value: '24',
      change: '+5',
      changeType: 'positive',
      icon: MessageSquare
    },
    {
      name: 'Assets',
      value: '156',
      change: '+12',
      changeType: 'positive',
      icon: Upload
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'game',
      action: 'New game added',
      item: 'Mysterious Night',
      time: '2 hours ago',
      icon: Gamepad2
    },
    {
      id: 2,
      type: 'news',
      action: 'Article published',
      item: 'Stake Engine Now Live',
      time: '1 day ago',
      icon: Newspaper
    },
    {
      id: 3,
      type: 'message',
      action: 'New contact message',
      item: 'From: john@example.com',
      time: '2 days ago',
      icon: MessageSquare
    },
    {
      id: 4,
      type: 'asset',
      action: 'Asset uploaded',
      item: 'game-screenshot.png',
      time: '3 days ago',
      icon: Upload
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.username}! 👋
          </h1>
          <p className="text-blue-100 text-lg">
            Here's what's happening with your ZeroEdge Studios admin panel
          </p>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-800 rounded-lg p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">{stat.name}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.change}
              </span>
              <span className="text-slate-400 text-sm ml-2">from last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-800 rounded-lg p-6 border border-slate-700"
        >
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg text-center transition-colors">
              <Gamepad2 className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Add Game</span>
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg text-center transition-colors">
              <Newspaper className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Write News</span>
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg text-center transition-colors">
              <Upload className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Upload Asset</span>
            </button>
            <button className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-lg text-center transition-colors">
              <Users className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Manage Users</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-800 rounded-lg p-6 border border-slate-700"
        >
          <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg">
                <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <activity.icon className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{activity.action}</p>
                  <p className="text-sm text-slate-400 truncate">{activity.item}</p>
                </div>
                <span className="text-xs text-slate-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* System Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800 rounded-lg p-6 border border-slate-700"
      >
        <h2 className="text-xl font-bold text-white mb-4">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-green-600/20 rounded-lg">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-green-400 font-medium">All Systems Operational</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-600/20 rounded-lg">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <span className="text-blue-400 font-medium">Database: Healthy</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-600/20 rounded-lg">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-green-400 font-medium">Uptime: 99.9%</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
