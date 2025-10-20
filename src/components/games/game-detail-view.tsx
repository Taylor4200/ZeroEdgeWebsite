'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { GameCard } from '@/components/games/game-card'
import { GameFacts } from '@/components/games/game-facts'
import { FeatureList } from '@/components/games/feature-list'
import type { Game } from '@/lib/data'

interface GameDetailViewProps {
  game: Game
  relatedGames: Game[]
}

export function GameDetailView({ game, relatedGames }: GameDetailViewProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={game.thumb}
            alt={game.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Overlays */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <Container className="relative h-full flex items-end pb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <Badge
              variant={game.status === 'live' ? 'success' : 'warning'}
              className="mb-4"
            >
              {game.status === 'live' ? 'Live' : 'Coming Soon'}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[color:var(--text)]">{game.title}</h1>
            <p className="text-xl text-[color:var(--muted)] mb-6">{game.tagline}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              {game.play_url && (
                <Button asChild variant="primary" size="lg">
                  <a href={game.play_url} target="_blank" rel="noopener noreferrer">Play on Stake</a>
                </Button>
              )}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Game Details */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Game Facts */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <GameFacts game={game} />
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <FeatureList features={game.features} />
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="p-6">
                  <h3 className="text-white font-semibold mb-4">Game Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/60">RTP Range</span>
                      <span className="text-white font-medium">{game.rtp_range}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Volatility</span>
                      <span className="text-white font-medium">{game.volatility}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Max Win</span>
                      <span className="text-white font-medium">{game.max_win}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Mechanics */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className="p-6">
                  <h3 className="text-white font-semibold mb-4">Mechanics</h3>
                  <div className="flex flex-wrap gap-2">
                    {game.mechanics.map((mechanic) => (
                      <Badge key={mechanic} variant="info">
                        {mechanic}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Games */}
      {relatedGames.length > 0 && (
        <section className="py-20 bg-background-secondary/30">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">You May Also Like</h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                Discover more games from our collection
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedGames.map((relatedGame, index) => (
                <motion.div
                  key={relatedGame.slug}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <GameCard game={relatedGame} index={index} />
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  )
}


