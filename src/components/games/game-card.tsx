'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
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
    thumbYPosition?: string
    zoomLevel?: string
  }
  index: number
}

export function GameCard({ game, index }: GameCardProps) {
  const isLive = game.status === 'live'
  const router = useRouter()
  const navigateToGame = () => router.push(`/games/${game.slug}`)
  const onKeyNavigate = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      navigateToGame()
    }
  }
  
  return (
    <div
      className="group perspective-1000 relative cursor-pointer"
      role="link"
      tabIndex={0}
      onClick={navigateToGame}
      onKeyDown={onKeyNavigate}
    >
      <div className="relative w-full h-full transform-style-preserve-3d transition-all duration-500 group-hover:scale-105 group-hover:rotate-y-12">
        {/* Main Card */}
        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 shadow-2xl group-hover:shadow-3xl group-hover:shadow-emerald-500/20">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={game.thumb}
              alt={game.title}
              fill
              className="object-cover transition-transform duration-700"
              style={{ 
                objectPosition: game.thumbYPosition ? `center ${game.thumbYPosition}` : 'center center',
                transform: game.zoomLevel ? `scale(${game.zoomLevel})` : 'scale(1.05)'
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>

          {/* RTP Badge */}
          <div className="absolute top-2 left-2 md:top-4 md:left-4 z-10">
            <Badge className="bg-emerald-500/90 text-white font-bold text-[10px] md:text-xs px-2 md:px-3 py-1 rounded-full border-0 shadow-lg">
              {game.rtp_range} RTP
            </Badge>
          </div>

          {/* Status Badge */}
          <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10">
            <Badge 
              className={`font-semibold text-[10px] md:text-xs px-2 md:px-3 py-1 rounded-full shadow-lg ${
                isLive 
                  ? 'bg-green-500/90 text-white' 
                  : 'bg-orange-500/90 text-white'
              }`}
            >
              {isLive ? 'LIVE' : 'SOON'}
            </Badge>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 text-white">
            {/* Title */}
            <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 group-hover:text-emerald-400 transition-colors duration-300 leading-tight">
              {game.title}
            </h3>
            
            {/* Tagline */}
            <p className="text-xs md:text-sm text-slate-300 mb-2 md:mb-4 leading-relaxed line-clamp-2">
              {game.tagline}
            </p>

            {/* Game Stats */}
            <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-4">
              <Badge className="bg-black/40 border border-slate-600 text-slate-300 text-[10px] md:text-xs px-2 py-1">
                {game.max_win}
              </Badge>
              <Badge className="bg-black/40 border border-slate-600 text-slate-300 text-[10px] md:text-xs px-2 py-1">
                {game.volatility}
              </Badge>
            </div>

            {/* Brand */}
            <div className="text-[10px] md:text-xs text-slate-400 font-medium">
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
      {/* Click handled by container for full-card navigation */}
    </div>
  )
}
