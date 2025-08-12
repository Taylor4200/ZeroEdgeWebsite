'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

interface GameCardProps {
  game: {
    slug: string
    title: string
    tagline: string
    thumb: string
    status: string
    rtp_range: string
    max_win: string
    volatility: string
  }
  index: number
}

export function GameCard({ game, index }: GameCardProps) {
  const isLive = game.status === 'live'
  
  console.log('Rendering GameCard:', game.title, 'index:', index)
  
  return (
    <div className="group perspective-1000">
      <div className="relative w-full h-full transform-style-preserve-3d transition-all duration-500 group-hover:scale-105 group-hover:rotate-y-12">
        {/* Main Card */}
        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 shadow-2xl group-hover:shadow-3xl group-hover:shadow-emerald-500/20">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={game.thumb}
              alt={game.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>

          {/* RTP Badge */}
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-emerald-500/90 text-white font-bold text-xs px-3 py-1 rounded-full border-0 shadow-lg">
              99.9% RTP
            </Badge>
          </div>

          {/* Status Badge */}
          <div className="absolute top-4 right-4 z-10">
            <Badge 
              className={`font-semibold text-xs px-3 py-1 rounded-full shadow-lg ${
                isLive 
                  ? 'bg-green-500/90 text-white' 
                  : 'bg-orange-500/90 text-white'
              }`}
            >
              {isLive ? 'LIVE' : 'SOON'}
            </Badge>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            {/* Title */}
            <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors duration-300">
              {game.title}
            </h3>
            
            {/* Tagline */}
            <p className="text-sm text-slate-300 mb-4 leading-relaxed">
              {game.tagline}
            </p>

            {/* Game Stats */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-black/40 border border-slate-600 text-slate-300 text-xs">
                {game.max_win}
              </Badge>
              <Badge className="bg-black/40 border border-slate-600 text-slate-300 text-xs">
                {game.volatility}
              </Badge>
            </div>

            {/* Brand */}
            <div className="text-xs text-slate-400 font-medium">
              ZeroEdge Studios
            </div>
          </div>

          {/* Hover Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Enhanced Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
        
        {/* Card Shadow for Depth */}
        <div className="absolute inset-0 rounded-2xl bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-20" />
      </div>
    </div>
  )
}
