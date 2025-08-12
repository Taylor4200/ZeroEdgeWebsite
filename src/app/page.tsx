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
      {/* Hero Section with Extended Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image - Extended to cover more area */}
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

      {/* Featured Games - Below the Background Image */}
      <section className="relative py-20 z-20">
        <Container>
          {/* Fanned-Out Cards Container */}
          <div className="relative">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 blur-3xl -z-10" />
            
            {/* Featured Games Text */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-2xl">
                Featured Games
              </h2>
              <p className="text-slate-200 text-xl max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                Exclusive slot games built on Stake Engine, designed for the Stake ecosystem
              </p>
            </motion.div>
            
            {/* Fanned-Out Cards Container */}
            <div className="relative flex justify-center items-center min-h-[200px] md:min-h-[400px] fan-container">
              {/* Mobile Carousel - Hidden on desktop */}
              <div className="block md:hidden w-full">
                <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide px-4">
                  {featuredGames.map((game, index) => (
                    <motion.div
                      key={`mobile-${game.slug}`}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.1,
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                      viewport={{ once: true }}
                      className="flex-shrink-0 w-64 first:ml-0 last:mr-4"
                    >
                      <GameCard game={game} index={index} />
                    </motion.div>
                  ))}
                </div>
                {/* Scroll indicator */}
                <div className="text-center mt-4">
                  <p className="text-slate-400 text-sm">← Scroll to see more games →</p>
                </div>
              </div>
              
              {/* Desktop Fan Effect - Hidden on mobile */}
              <div className="hidden md:block relative w-full h-[300px] flex justify-center items-center">
                {featuredGames.map((game, index) => {
                  const totalCards = featuredGames.length;
                  const centerIndex = Math.floor(totalCards / 2);
                  const distanceFromCenter = index - centerIndex;
                  const maxRotation = 5; // Rotation around central point (like a fan)
                  const rotation = distanceFromCenter * (maxRotation / Math.max(centerIndex, 1));
                  
                  return (
                    <div
                      key={`fan-${game.slug}`}
                      className="absolute group"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%) translateX(${distanceFromCenter * 270}px) translateY(${Math.abs(distanceFromCenter) * 40}px) rotateZ(${rotation}deg)`,
                        zIndex: totalCards - Math.abs(distanceFromCenter),
                      }}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 100, rotateY: -30, scale: 0.8 }}
                        whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
                        transition={{ 
                          duration: 0.8, 
                          delay: index * 0.15,
                          ease: [0.25, 0.1, 0.25, 1]
                        }}
                        viewport={{ once: true }}
                        className="w-72 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-y-0 group-hover:translate-y-[-20px] group-hover:z-50"
                      >
                        <GameCard game={game} index={index} />
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* View All Games Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <Button asChild size="lg" className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-bold px-8 py-4 rounded-xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300">
                <Link href="/games">View All Games</Link>
              </Button>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Pillars - Seamless Transition */}
      <section className="relative py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Our Pillars</h2>
            <p className="text-slate-300 text-xl max-w-3xl mx-auto leading-relaxed">
              The foundation of our success as a Stake-exclusive game studio
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Stake Engine Powered',
                description: 'Built on Stake\'s official RGS platform, ensuring seamless integration and optimal performance for the Stake ecosystem.',
                icon: '⚡',
                gradient: 'from-yellow-500 to-orange-500'
              },
              {
                title: 'Stake-Exclusive Publishing',
                description: 'All our games are developed exclusively for Stake, reaching their global audience of millions of players.',
                icon: '🎯',
                gradient: 'from-emerald-500 to-blue-500'
              },
              {
                title: 'Original Art & Animation',
                description: 'Every visual element is crafted in-house, creating unique and memorable gaming experiences for Stake players.',
                icon: '🎨',
                gradient: 'from-purple-500 to-pink-500'
              }
            ].map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-slate-800/30 via-slate-700/20 to-slate-800/30 border border-slate-600/20 backdrop-blur-sm hover:border-slate-500/30 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-slate-500/20">
                  {/* Icon with Gradient Background */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${pillar.gradient} text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {pillar.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-slate-100 transition-colors duration-300">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                    {pillar.description}
                  </p>
                  
                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${pillar.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`} />
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Partners - Seamless Transition */}
      <section className="relative py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Our Partnership</h2>
            <p className="text-slate-300 text-xl max-w-3xl mx-auto leading-relaxed">
              Proud to be a Stake-exclusive publisher, creating games for the world's leading crypto casino
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.95, rotateY: -15 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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
                      transition-all duration-500 will-change-transform
                      [transform-style:preserve-3d]
                      group-hover:[transform:rotateY(180deg)]
                      group-hover:scale-105
                      motion-reduce:transition-none motion-reduce:[transform:none]
                    "
                    aria-label={`${partner.name} card`}
                  >
                    {/* Front */}
                    <div
                      className="
                        absolute inset-0 rounded-xl p-6
                        flex items-center justify-center text-center
                        bg-gradient-to-br from-slate-800/40 via-slate-700/30 to-slate-800/40 border border-slate-600/30 backdrop-blur-sm
                        [backface-visibility:hidden]
                        group-hover:border-slate-500/40 transition-colors duration-300
                      "
                    >
                      <span className="text-slate-200 font-semibold group-hover:text-white transition-colors duration-300">
                        {partner.name}
                      </span>
                    </div>

                    {/* Back */}
                    <div
                      className="
                        absolute inset-0 rounded-xl p-4
                        flex items-center justify-center text-center
                        bg-gradient-to-br from-emerald-800/80 to-blue-800/80 border border-emerald-500/40 backdrop-blur-sm
                        [transform:rotateY(180deg)] [backface-visibility:hidden]
                      "
                    >
                      <p className="text-slate-100 text-xs leading-relaxed">
                        {partner.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* News Teaser - Seamless Transition */}
      <section className="relative py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Latest News</h2>
            <p className="text-slate-300 text-xl max-w-3xl mx-auto leading-relaxed">
              Stay updated with our latest announcements and industry insights
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="h-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800/30 via-slate-700/20 to-slate-800/30 border border-slate-600/20 backdrop-blur-sm hover:border-slate-500/30 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-slate-500/20">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-slate-400 mb-3 font-medium">
                      {formatDate(post.date)}
                    </div>
                    <h3 className="font-bold text-xl mb-3 group-hover:text-emerald-400 transition-colors duration-300 text-white">
                      {post.title}
                    </h3>
                    <p className="text-slate-300 text-sm mb-4 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/news/${post.slug}`}
                      className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors duration-300 font-semibold group/link"
                    >
                      Read More 
                      <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform duration-300">→</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}