'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { GameCard } from '@/components/games/game-card'
import { getLiveGames, getLatestNews, getPartners } from '@/lib/data'
import { useReducedMotion } from 'framer-motion'
import { formatDate } from '@/lib/utils'
import TitleReel from '@/components/TitleReel'

export default function HomePage() {
  const featuredGames = getLiveGames().slice(0, 6)
  const latestNews = getLatestNews(3)
  const partners = getPartners()
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="min-h-screen noise scanlines">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Container className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <TitleReel className="text-[clamp(42px,8vw,104px)] font-extrabold text-[color:var(--text)]" />
            <p className="mt-4 text-[color:var(--muted)] text-xl md:text-2xl max-w-2xl mx-auto">
              Where Slots Meet Innovation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button asChild size="lg">
                <Link href="/games">View Games</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact</Link>
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Featured Games */}
      <section className="py-20 bg-[color:var(--bg)]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[color:var(--text)]">Featured Games</h2>
            <p className="text-[color:var(--muted)] max-w-2xl mx-auto">
              Experience our latest slot games with stunning visuals and innovative mechanics
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredGames.map((game, index) => (
              <motion.div
                key={game.slug}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GameCard game={game} />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pillars */}
      <section className="py-20 bg-[color:var(--bg)]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[color:var(--text)]">Our Pillars</h2>
            <p className="text-[color:var(--muted)] max-w-2xl mx-auto">
              The foundation of our success in creating exceptional gaming experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Math-Driven RTP',
                description: 'Our games feature carefully calculated RTP ranges ensuring fair and transparent gameplay for all players.',
                icon: '🎯'
              },
              {
                title: 'Original Art & Animation',
                description: 'Every visual element is crafted in-house, creating unique and memorable gaming experiences.',
                icon: '🎨'
              },
              {
                title: 'Stake Integration Ready',
                description: 'Built with modern technology for seamless integration with leading gaming platforms.',
                icon: '⚡'
              }
            ].map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="text-center p-8 h-full bg-[color:var(--bg)] border border-[color:var(--muted)]/20">
                  <div className="text-4xl mb-4">{pillar.icon}</div>
                  <h3 className="text-xl font-bold mb-4 text-[color:var(--text)]">{pillar.title}</h3>
                  <p className="text-[color:var(--muted)]">{pillar.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Partners */}
      <section className="py-20 bg-[color:var(--bg)]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[color:var(--text)]">Our Partners</h2>
            <p className="text-[color:var(--muted)] max-w-2xl mx-auto">
              Trusted by leading gaming platforms worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex justify-center"
              >
                <div className="bg-[color:var(--bg)] border border-[color:var(--muted)]/20 rounded-xl p-6 w-full max-w-48 h-24 flex items-center justify-center">
                  <span className="text-[color:var(--muted)] font-semibold text-center">
                    {partner.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* News Teaser */}
      <section className="py-20 bg-[color:var(--bg)]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[color:var(--text)]">Latest News</h2>
            <p className="text-[color:var(--muted)] max-w-2xl mx-auto">
              Stay updated with our latest announcements and industry insights
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-[color:var(--bg)] border border-[color:var(--muted)]/20">
                  <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                    <div className="absolute inset-0 bg-[color:var(--primary)]/10" />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-[color:var(--muted)]/60 mb-2">
                      {formatDate(post.date)}
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-[color:var(--text)]">{post.title}</h3>
                    <p className="text-[color:var(--muted)] text-sm mb-4">{post.excerpt}</p>
                    <Link
                      href={`/news/${post.slug}`}
                      className="text-[color:var(--primary)] hover:text-[color:var(--accent)] transition-colors font-medium"
                    >
                      Read More →
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}
