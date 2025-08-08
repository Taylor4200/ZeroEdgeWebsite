'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { GameCard } from '@/components/games/game-card'
import { getGames } from '@/lib/data'
import { Game } from '@/lib/data'

const filters = [
  { id: 'all', label: 'All Games' },
  { id: 'live', label: 'Live' },
  { id: 'coming-soon', label: 'Coming Soon' },
  { id: 'high-volatility', label: 'High Volatility' },
  { id: 'feature-buy', label: 'Feature Buy' },
]

export default function GamesPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const games = getGames()

  const filteredGames = useMemo(() => {
    switch (activeFilter) {
      case 'live':
        return games.filter(game => game.status === 'live')
      case 'coming-soon':
        return games.filter(game => game.status === 'coming-soon')
      case 'high-volatility':
        return games.filter(game => game.volatility.toLowerCase().includes('high'))
      case 'feature-buy':
        return games.filter(game => 
          game.features.some(feature => 
            feature.toLowerCase().includes('feature buy') || 
            feature.toLowerCase().includes('boost')
          )
        )
      default:
        return games
    }
  }, [games, activeFilter])

  return (
    <div className="min-h-screen py-20">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Games</h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Discover our collection of premium slot games featuring innovative mechanics, 
            stunning visuals, and fair gameplay.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveFilter(filter.id)}
              className="rounded-full"
            >
              {filter.label}
            </Button>
          ))}
        </motion.div>

        {/* Games Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredGames.map((game, index) => (
              <motion.div
                key={game.slug}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GameCard game={game} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredGames.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-white/60 text-lg">
              No games found matching your criteria.
            </p>
            <Button
              variant="outline"
              onClick={() => setActiveFilter('all')}
              className="mt-4"
            >
              View All Games
            </Button>
          </motion.div>
        )}
      </Container>
    </div>
  )
}
