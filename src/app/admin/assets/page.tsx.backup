'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  Search, 
  Filter,
  Eye,
  Trash2,
  Download,
  Copy,
  Image as ImageIcon,
  File,
  Folder,
  Grid,
  List,
  Plus,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Mock data - replace with your actual data source
const mockAssets = [
  {
    id: 1,
    name: 'Background.png',
    type: 'image',
    size: '2.4 MB',
    url: '/images/Background.png',
    category: 'backgrounds',
    uploaded_at: '2025-08-12T10:30:00Z',
    dimensions: '1920x1080',
    format: 'PNG',
    tags: ['hero', 'background', 'main']
  },
  {
    id: 2,
    name: 'stake-engine-logo.svg',
    type: 'image',
    size: '45 KB',
    url: '/images/stake-engine-logo.svg',
    category: 'logos',
    uploaded_at: '2025-08-11T15:45:00Z',
    dimensions: '200x80',
    format: 'SVG',
    tags: ['logo', 'stake', 'brand']
  },
  {
    id: 3,
    name: 'game-thumbnail-1.jpg',
    type: 'image',
    size: '156 KB',
    url: '/images/games/Mysterious-Night/thumb.png',
    category: 'game-assets',
    uploaded_at: '2025-08-10T09:15:00Z',
    dimensions: '400x300',
    format: 'JPG',
    tags: ['game', 'thumbnail', 'midnight-prowl']
  },
  {
    id: 4,
    name: 'press-kit.zip',
    type: 'archive',
    size: '15.2 MB',
    url: '/presskits/press-kit.zip',
    category: 'press-kits',
    uploaded_at: '2025-08-09T14:20:00Z',
    dimensions: null,
    format: 'ZIP',
    tags: ['press', 'media', 'download']
  },
  {
    id: 5,
    name: 'news-cover-1.jpg',
    type: 'image',
    size: '890 KB',
    url: '/images/news/Screenshot 2025-08-12 062800.png',
    category: 'news',
    uploaded_at: '2025-08-08T11:30:00Z',
    dimensions: '800x600',
    format: 'JPG',
    tags: ['news', 'cover', 'stake-engine']
  }
]

const categories = [
  { id: 'all', name: 'All Assets', icon: Folder },
  { id: 'backgrounds', name: 'Backgrounds', icon: ImageIcon },
  { id: 'logos', name: 'Logos', icon: ImageIcon },
  { id: 'game-assets', name: 'Game Assets', icon: ImageIcon },
  { id: 'news', name: 'News Images', icon: ImageIcon },
  { id: 'press-kits', name: 'Press Kits', icon: File }
]

export default function AssetsManagement() {
  const [assets, setAssets] = useState(mockAssets)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedAsset, setSelectedAsset] = useState<any>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = categoryFilter === 'all' || asset.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const deleteAsset = (id: number) => {
    if (confirm('Are you sure you want to delete this asset?')) {
      setAssets(assets.filter(asset => asset.id !== id))
    }
  }

  const copyAssetUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    // You could add a toast notification here
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFiles = (files: FileList) => {
    // Here you would typically upload files to your server/storage
    Array.from(files).forEach(file => {
      const newAsset = {
        id: Date.now() + Math.random(),
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : 'file',
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        url: URL.createObjectURL(file),
        category: 'uploads',
        uploaded_at: new Date().toISOString(),
        dimensions: null,
        format: file.name.split('.').pop()?.toUpperCase() || 'UNKNOWN',
        tags: []
      }
      setAssets([newAsset, ...assets])
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image':
        return ImageIcon
      case 'archive':
        return File
      default:
        return File
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'image':
        return 'from-blue-500 to-blue-600'
      case 'archive':
        return 'from-orange-500 to-orange-600'
      default:
        return 'from-slate-500 to-slate-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Assets Management</h1>
          <p className="text-slate-400 mt-2">Upload, organize, and manage your website assets</p>
        </div>
        <Button
          onClick={() => setShowUploadModal(true)}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Upload Assets
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Folder className="w-6 h-6 text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-400">Total Assets</p>
              <p className="text-2xl font-bold text-white">{assets.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <ImageIcon className="w-6 h-6 text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-400">Images</p>
              <p className="text-2xl font-bold text-white">{assets.filter(a => a.type === 'image').length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center">
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <File className="w-6 h-6 text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-400">Files</p>
              <p className="text-2xl font-bold text-white">{assets.filter(a => a.type !== 'image').length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Upload className="w-6 h-6 text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-400">Total Size</p>
              <p className="text-2xl font-bold text-white">18.7 MB</p>
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
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            <div className="flex border border-slate-600 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Assets Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden hover:border-slate-600 transition-colors group"
            >
              {/* Asset Preview */}
              <div className="relative aspect-square bg-slate-700 overflow-hidden">
                {asset.type === 'image' ? (
                  <img
                    src={asset.url}
                    alt={asset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <File className="w-16 h-16 text-slate-400" />
                  </div>
                )}
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                  <button
                    onClick={() => setSelectedAsset(asset)}
                    className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => copyAssetUrl(asset.url)}
                    className="p-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors"
                    title="Copy URL"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteAsset(asset.id)}
                    className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Asset Info */}
              <div className="p-4">
                <h3 className="font-medium text-white truncate mb-1">{asset.name}</h3>
                <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
                  <span>{asset.size}</span>
                  <span>{asset.format}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {asset.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} className="text-xs bg-slate-700 text-slate-300">
                      {tag}
                    </Badge>
                  ))}
                  {asset.tags.length > 2 && (
                    <Badge className="text-xs bg-slate-700 text-slate-300">
                      +{asset.tags.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Asset
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Uploaded
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {filteredAssets.map((asset) => {
                  const TypeIcon = getTypeIcon(asset.type)
                  return (
                    <motion.tr
                      key={asset.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-slate-700/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 bg-gradient-to-r ${getTypeColor(asset.type)} rounded-lg flex items-center justify-center`}>
                            <TypeIcon className="w-5 h-5 text-white" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">{asset.name}</div>
                            <div className="text-sm text-slate-400">{asset.format}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {asset.type.toUpperCase()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {asset.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {asset.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {formatDate(asset.uploaded_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedAsset(asset)}
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => copyAssetUrl(asset.url)}
                            className="text-green-400 hover:text-green-300 transition-colors"
                            title="Copy URL"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteAsset(asset.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-lg border border-slate-700 w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Upload Assets</h2>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Drag & Drop Zone */}
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-slate-600 hover:border-slate-500'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-white text-lg mb-2">Drag and drop files here</p>
                    <p className="text-slate-400 mb-4">or</p>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Choose Files
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      onChange={(e) => e.target.files && handleFiles(e.target.files)}
                      className="hidden"
                    />
                  </div>

                  {/* Upload Options */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Category
                      </label>
                      <select className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500">
                        {categories.slice(1).map(category => (
                          <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Tags (comma-separated)
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                        placeholder="hero, background, main"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowUploadModal(false)}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Upload Files
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Asset Detail Modal */}
      <AnimatePresence>
        {selectedAsset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAsset(null)}
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
                  <h2 className="text-2xl font-bold text-white">Asset Details</h2>
                  <button
                    onClick={() => setSelectedAsset(null)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Asset Preview */}
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Preview</h3>
                    {selectedAsset.type === 'image' ? (
                      <img
                        src={selectedAsset.url}
                        alt={selectedAsset.name}
                        className="w-full h-auto rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-48 bg-slate-600 rounded-lg flex items-center justify-center">
                        <File className="w-16 h-16 text-slate-400" />
                      </div>
                    )}
                  </div>

                  {/* Asset Information */}
                  <div className="space-y-6">
                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-4">Information</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-1">Name</label>
                          <p className="text-white">{selectedAsset.name}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-1">Type</label>
                          <p className="text-white">{selectedAsset.type.toUpperCase()}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-1">Size</label>
                          <p className="text-white">{selectedAsset.size}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-1">Format</label>
                          <p className="text-white">{selectedAsset.format}</p>
                        </div>
                        {selectedAsset.dimensions && (
                          <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Dimensions</label>
                            <p className="text-white">{selectedAsset.dimensions}</p>
                          </div>
                        )}
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-1">Category</label>
                          <p className="text-white">{selectedAsset.category}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-1">Uploaded</label>
                          <p className="text-white">{formatDate(selectedAsset.uploaded_at)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedAsset.tags.map((tag: string, index: number) => (
                          <Badge key={index} className="bg-slate-600 text-slate-300">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <Button
                        onClick={() => copyAssetUrl(selectedAsset.url)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy URL
                      </Button>
                      <Button
                        onClick={() => window.open(selectedAsset.url, '_blank')}
                        variant="outline"
                        className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        onClick={() => deleteAsset(selectedAsset.id)}
                        variant="outline"
                        className="border-red-500 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
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
