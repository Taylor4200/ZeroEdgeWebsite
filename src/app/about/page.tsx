"use client"
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Card } from '@/components/ui/card'

const milestones = [
  {
    year: '2025',
    title: 'Stake Engine Access',
    description: 'Secured official access to Stake Engine, becoming a Stake-exclusive publisher.'
  },
  {
    year: '2025',
    title: 'Studio Launch',
    description: 'ZeroEdge Studios officially launches as a Stake-exclusive game studio.'
  },
  {
    year: '2025',
    title: 'First Stake Game',
    description: 'Developing our first exclusive slot game for the Stake platform.'
  },
  {
    year: '2025',
    title: 'Global Reach',
    description: 'Reaching Stake\'s global audience of millions of crypto casino players.'
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20">
      <Container>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About ZeroEdge Studios</h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            A Stake-exclusive game studio, creating unique slot games built on Stake Engine for the world's leading crypto casino.
          </p>
        </motion.div>

        {/* Vision */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Vision</h2>
              <p className="text-white/80 text-lg mb-6">
                At ZeroEdge Studios, we believe that slot gaming should be more than just spinning reels. 
                As a Stake-exclusive publisher, we create immersive experiences that combine stunning visuals, 
                innovative mechanics, and fair gameplay specifically designed for the Stake ecosystem.
              </p>
              <p className="text-white/80 text-lg">
                Our mission is to leverage Stake Engine's powerful infrastructure to deliver top-tier, 
                transparent, and engaging games that reach Stake's global audience of millions of players.
              </p>
            </div>
            <div className="bg-[color:var(--primary)]/10 rounded-2xl p-8 h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎯</div>
                <p className="text-[color:var(--muted)] font-medium">Innovation Meets Excellence</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Milestones - left rail timeline */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Key milestones in our journey as a Stake-exclusive game studio
            </p>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-[color:var(--primary)]/50" />
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-8"
                >
                  <div className="hidden md:block" />
                  <Card className="p-6 bg-[color:var(--bg)] border border-[color:var(--muted)]/20">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-[color:var(--primary)]/20">
                        <span className="text-[color:var(--primary)] font-bold text-sm">{milestone.year}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-1 text-[color:var(--text)]">{milestone.title}</h3>
                        <p className="text-[color:var(--muted)] leading-snug">{milestone.description}</p>
                      </div>
                    </div>
                  </Card>
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 w-3 h-3 rounded-full bg-[color:var(--primary)]" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance & Fair Play */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Stake Engine Integration</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Stake Engine Powered</h3>
                  <p className="text-white/80 mb-4">
                    Our games are built on Stake's official Remote Gaming Server (RGS) platform, 
                    ensuring seamless integration with Stake's infrastructure that handles over a million bets per second.
                  </p>
                  <p className="text-white/80">
                    This gives us access to Stake's full game stack—frontend framework, math engine, 
                    balancing tools—while they handle hosting, scaling, and payouts.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Stake-Exclusive Publishing</h3>
                  <p className="text-white/80 mb-4">
                    As a Stake-exclusive publisher, all our games are developed and launched exclusively 
                    through Stake Engine, reaching their global audience of millions of crypto casino players.
                  </p>
                  <p className="text-white/80">
                    This exclusive partnership ensures our games are optimized for the Stake ecosystem 
                    and benefit from their industry-leading infrastructure and player base.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* Distribution & Integration */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Stake Engine Development</h2>
              <p className="text-white/80 text-lg mb-6">
                Our games are built using Stake Engine's comprehensive development tools, designed for 
                seamless integration with Stake's infrastructure. We leverage their frontend framework, 
                math engine, and balancing tools to create games that perform optimally on their platform.
              </p>
              <p className="text-white/80 text-lg">
                As a Stake-exclusive publisher, we focus entirely on creating games for the Stake ecosystem, 
                ensuring every title is optimized for their global audience and benefits from their 
                industry-leading infrastructure and player base.
              </p>
            </Card>
          </motion.div>
        </section>
      </Container>
    </div>
  )
}
