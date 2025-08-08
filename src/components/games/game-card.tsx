'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Game } from '@/lib/data'

interface GameCardProps {
  game: Game
}

export function GameCard({ game }: GameCardProps) {
  // Get custom Y position from game data, default to center (50%)
  const thumbYPosition = game.thumbYPosition || '50%'
  
  return (
    <Link href={`/games/${game.slug}`}>
      <Card className="group overflow-hidden h-full bg-[color:var(--bg)] border border-[color:var(--muted)]/20">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={game.thumb}
            alt={game.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03] group-hover:rotate-[1.5deg]"
            style={{ objectPosition: `center ${thumbYPosition}` }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute bottom-4 left-4 right-4">
            {game.status !== 'live' && (
              <Badge variant="warning" className="mb-2">Coming Soon</Badge>
            )}
            <h3 className="text-white font-bold text-lg">{game.title}</h3>
            <p className="text-white/80 text-sm">{game.tagline}</p>
          </div>
        </div>
        <div className="p-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {game.mechanics.slice(0, 3).map((mechanic) => (
              <Badge key={mechanic} variant="info" className="text-xs">
                {mechanic}
              </Badge>
            ))}
          </div>
          <div className="flex justify-between text-xs md:text-sm text-[color:var(--muted)] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
            <span className="bg-[color:var(--bg)]/80 px-2 py-1 rounded">Volatility: {game.volatility}</span>
            <span className="bg-[color:var(--bg)]/80 px-2 py-1 rounded">Max Win: {game.max_win}</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
