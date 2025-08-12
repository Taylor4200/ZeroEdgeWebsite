'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mail, 
  Search, 
  Filter,
  Eye,
  Trash2,
  Reply,
  Clock,
  User,
  Phone,
  Globe,
  MessageSquare,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Mock data - replace with your actual data source
const mockMessages = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    subject: 'Partnership Inquiry',
    message: 'Hi, I\'m interested in discussing a potential partnership opportunity with ZeroEdge Studios. I represent a gaming platform and would like to explore collaboration possibilities.',
    status: 'unread',
    created_at: '2025-08-12T10:30:00Z',
    ip_address: '192.168.1.100',
    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 987-6543',
    subject: 'Game Development Question',
    message: 'I\'m a developer interested in learning more about Stake Engine and how to get started with game development. Could you provide some guidance on the process?',
    status: 'read',
    created_at: '2025-08-11T15:45:00Z',
    ip_address: '192.168.1.101',
    user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  },
  {
    id: 3,
    name: 'Mike Chen',
    email: 'mike.chen@example.com',
    phone: '+1 (555) 456-7890',
    subject: 'Bug Report',
    message: 'I found a bug in the Mysterious Night game. The bonus round sometimes doesn\'t trigger properly. Here are the steps to reproduce...',
    status: 'replied',
    created_at: '2025-08-10T09:15:00Z',
    ip_address: '192.168.1.102',
    user_agent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
  },
  {
    id: 4,
    name: 'Emily Rodriguez',
    email: 'emily.r@example.com',
    phone: '+1 (555) 321-0987',
    subject: 'Feature Request',
    message: 'I love your games! Would it be possible to add more volatility options or create a low-volatility version of some games?',
    status: 'archived',
    created_at: '2025-08-09T14:20:00Z',
    ip_address: '192.168.1.103',
    user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15'
  }
]

export default function MessagesManagement() {
  const [messages, setMessages] = useState(mockMessages)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyContent, setReplyContent] = useState('')

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const deleteMessage = (id: number) => {
    if (confirm('Are you sure you want to delete this message?')) {
      setMessages(messages.filter(message => message.id !== id))
    }
  }

  const markAsRead = (id: number) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, status: 'read' } : message
    ))
  }

  const markAsReplied = (id: number) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, status: 'replied' } : message
    ))
  }

  const archiveMessage = (id: number) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, status: 'archived' } : message
    ))
  }

  const handleReply = () => {
    if (replyContent.trim()) {
      // Here you would typically send the reply via email
      markAsReplied(selectedMessage.id)
      setShowReplyForm(false)
      setReplyContent('')
      setSelectedMessage(null)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'read':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'replied':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'archived':
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'unread':
        return 'UNREAD'
      case 'read':
        return 'READ'
      case 'replied':
        return 'REPLIED'
      case 'archived':
        return 'ARCHIVED'
      default:
        return 'UNKNOWN'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Contact Messages</h1>
          <p className="text-slate-400 mt-2">Manage incoming contact form submissions and inquiries</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Mail className="w-6 h-6 text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-400">Total Messages</p>
              <p className="text-2xl font-bold text-white">{messages.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center">
            <div className="p-3 bg-red-500/20 rounded-lg">
              <Clock className="w-6 h-6 text-red-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-400">Unread</p>
              <p className="text-2xl font-bold text-white">{messages.filter(m => m.status === 'unread').length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-400">Replied</p>
              <p className="text-2xl font-bold text-white">{messages.filter(m => m.status === 'replied').length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center">
            <div className="p-3 bg-slate-500/20 rounded-lg">
              <XCircle className="w-6 h-6 text-slate-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-400">Archived</p>
              <p className="text-2xl font-bold text-white">{messages.filter(m => m.status === 'archived').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Messages</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredMessages.map((message) => (
                <motion.tr
                  key={message.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`hover:bg-slate-700/30 transition-colors cursor-pointer ${
                    message.status === 'unread' ? 'bg-red-500/5' : ''
                  }`}
                  onClick={() => {
                    setSelectedMessage(message)
                    if (message.status === 'unread') {
                      markAsRead(message.id)
                    }
                  }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{message.name}</div>
                        <div className="text-sm text-slate-400">{message.email}</div>
                        {message.phone && (
                          <div className="text-xs text-slate-500">{message.phone}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <div className="text-sm font-medium text-white">{message.subject}</div>
                      <div className="text-sm text-slate-400 truncate">{message.message}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className={getStatusColor(message.status)}>
                      {getStatusText(message.status)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {formatDate(message.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedMessage(message)
                        }}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedMessage(message)
                          setShowReplyForm(true)
                        }}
                        className="text-green-400 hover:text-green-300 transition-colors"
                        title="Reply"
                      >
                        <Reply className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          archiveMessage(message.id)
                        }}
                        className="text-orange-400 hover:text-orange-300 transition-colors"
                        title="Archive"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteMessage(message.id)
                        }}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Message Detail Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMessage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-lg border border-slate-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Message Details</h2>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Contact Info */}
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Name</label>
                        <p className="text-white">{selectedMessage.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                        <p className="text-white">{selectedMessage.email}</p>
                      </div>
                      {selectedMessage.phone && (
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-1">Phone</label>
                          <p className="text-white">{selectedMessage.phone}</p>
                        </div>
                      )}
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Date</label>
                        <p className="text-white">{formatDate(selectedMessage.created_at)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Message</h3>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-400 mb-1">Subject</label>
                      <p className="text-white font-medium">{selectedMessage.subject}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Content</label>
                      <p className="text-white whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>
                  </div>

                  {/* Technical Details */}
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Technical Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">IP Address</label>
                        <p className="text-white font-mono text-sm">{selectedMessage.ip_address}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">User Agent</label>
                        <p className="text-white font-mono text-xs break-all">{selectedMessage.user_agent}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end space-x-3 pt-4">
                    <Button
                      onClick={() => {
                        setShowReplyForm(true)
                        setSelectedMessage(null)
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Reply className="w-4 h-4 mr-2" />
                      Reply
                    </Button>
                    <Button
                      onClick={() => archiveMessage(selectedMessage.id)}
                      variant="outline"
                      className="border-orange-500 text-orange-400 hover:bg-orange-500/10"
                    >
                      Archive
                    </Button>
                    <Button
                      onClick={() => setSelectedMessage(null)}
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reply Form Modal */}
      <AnimatePresence>
        {showReplyForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowReplyForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-lg border border-slate-700 w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Reply to Message</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Reply Content
                    </label>
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      rows={8}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                      placeholder="Type your reply here..."
                      required
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowReplyForm(false)}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleReply}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Send Reply
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
