'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { GameCard } from '@/components/games/game-card'
import { getGames, getLatestNews, getPartners } from '@/lib/data'
import { useReducedMotion } from 'framer-motion'
import { formatDate } from '@/lib/utils'
import TitleReel from '@/components/TitleReel'

export default function HomePage() {
  const featuredGames = getGames().slice(0, 6)
  const latestNews = getLatestNews(3)
  const partners = getPartners()
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Background.png"
            alt="ZeroEdge Studios background illustration"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Enhanced overlay for better text readability and visual appeal */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          {/* Subtle vignette effect */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/30" />
        </div>
        
        <Container className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-sm bg-black/20 rounded-3xl p-8 border border-white/10"
          >
            <TitleReel className="text-[clamp(42px,8vw,104px)] font-extrabold text-[color:var(--text)] drop-shadow-2xl" />
            <p className="mt-4 text-[color:var(--muted)] text-xl md:text-2xl max-w-2xl mx-auto drop-shadow-lg">
              Creating exclusive games for the Stake ecosystem
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button asChild size="lg" className="shadow-2xl">
                <Link href="/games">View Games</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="shadow-2xl border-white/30 hover:border-white/50">
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
              Exclusive slot games built on Stake Engine, designed for the Stake ecosystem
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
              The foundation of our success as a Stake-exclusive game studio
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Stake Engine Powered',
                description: 'Built on Stake\'s official RGS platform, ensuring seamless integration and optimal performance for the Stake ecosystem.',
                icon: '⚡'
              },
              {
                title: 'Stake-Exclusive Publishing',
                description: 'All our games are developed exclusively for Stake, reaching their global audience of millions of players.',
                icon: '🎯'
              },
              {
                title: 'Original Art & Animation',
                description: 'Every visual element is crafted in-house, creating unique and memorable gaming experiences for Stake players.',
                icon: '🎨'
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[color:var(--text)]">Our Partnership</h2>
            <p className="text-[color:var(--muted)] max-w-2xl mx-auto">
              Proud to be a Stake-exclusive publisher, creating games for the world's leading crypto casino
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                viewport={{ once: true }}
                className="flex justify-center group"
              >
                <div
                  className="
                    relative w-full max-w-48 h-24
                    [perspective:1000px]
                  "
                >
                  <div
                    className="
                      relative h-full w-full rounded-xl
                      transition-transform duration-500 will-change-transform
                      [transform-style:preserve-3d]
                      group-hover:[transform:rotateY(180deg)]
                      motion-reduce:transition-none motion-reduce:[transform:none]
                    "
                    aria-label={`${partner.name} card`}
                  >
                    {/* Front */}
                    <div
                      className="
                        absolute inset-0 rounded-xl p-6
                        flex items-center justify-center text-center
                        bg-[color:var(--bg)] border border-[color:var(--muted)]/20
                        [backface-visibility:hidden]
                      "
                    >
                      <span className="text-[color:var(--muted)] font-semibold">
                        {partner.name}
                      </span>
                    </div>

                    {/* Back */}
                    <div
                      className="
                        absolute inset-0 rounded-xl p-4
                        flex items-center justify-center text-center
                        bg-[color:var(--bg)] border border-[color:var(--primary)]/40
                        [transform:rotateY(180deg)] [backface-visibility:hidden]
                      "
                    >
                      <p className="text-[color:var(--muted)] text-xs leading-relaxed">
                        {partner.description}
                      </p>
                    </div>
                  </div>
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
                <Card className="h-full group bg-[color:var(--bg)] border border-[color:var(--muted)]/20">
                  <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    />
                    <div className="absolute inset-0 bg-[color:var(--primary)]/10" />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-[color:var(--muted)]/60 mb-2">
                      {formatDate(post.date)}
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-[color:var(--primary)] transition-colors text-[color:var(--text)]">{post.title}</h3>
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
