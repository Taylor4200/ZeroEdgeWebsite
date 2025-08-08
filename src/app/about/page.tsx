"use client"
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Card } from '@/components/ui/card'

const milestones = [
  {
    year: '2025',
    title: 'Studio Launch',
    description: 'ZeroEdgeStudios officially launches with our first game, Mysterious Night.'
  },
  {
    year: '2025',
    title: 'Partnership Expansion',
    description: 'Secured partnerships with leading gaming platforms worldwide.'
  },
  {
    year: '2025',
    title: 'Team Growth',
    description: 'Expanded our development team with top talent in game mathematics and design.'
  },
  {
    year: '2025',
    title: 'Award Recognition',
    description: 'Nominated for Best New Studio at the prestigious Gaming Awards 2025.'
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About ZeroEdgeStudios</h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            We're a premium slot game studio dedicated to creating innovative gaming experiences 
            that push the boundaries of what's possible in the industry.
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
                At ZeroEdgeStudios, we believe that slot gaming should be more than just spinning reels. 
                It should be an immersive experience that combines stunning visuals, innovative mechanics, 
                and fair gameplay to create moments of excitement and joy.
              </p>
              <p className="text-white/80 text-lg">
                Our mission is to redefine the slot gaming landscape by creating games that not only 
                look incredible but also provide transparent, fair, and engaging gameplay experiences 
                for players worldwide.
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
              Key milestones in our journey to becoming a leading slot game studio
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Compliance & Fair Play</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Responsible Gaming</h3>
                  <p className="text-white/80 mb-4">
                    We are committed to promoting responsible gaming practices. Our games include 
                    features that help players maintain control over their gaming experience, 
                    including session limits and reality checks.
                  </p>
                  <p className="text-white/80">
                    We work closely with regulatory bodies to ensure our games meet the highest 
                    standards of fairness and compliance in all jurisdictions where we operate.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Certification Roadmap</h3>
                  <p className="text-white/80 mb-4">
                    Our games are designed to meet the rigorous standards of leading testing 
                    laboratories and certification bodies. We maintain a comprehensive roadmap 
                    for obtaining certifications in key markets.
                  </p>
                  <p className="text-white/80">
                    This commitment to certification ensures that our games can be integrated 
                    seamlessly with leading gaming platforms worldwide.
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Distribution & Integration</h2>
              <p className="text-white/80 text-lg mb-6">
                Our games are built with modern technology and designed for seamless integration 
                with leading gaming platforms. We provide comprehensive SDK support and technical 
                documentation to ensure smooth deployment and operation.
              </p>
              <p className="text-white/80 text-lg">
                Whether you're a casino operator, aggregator, or platform provider, our games 
                are ready to enhance your gaming portfolio with premium content that players love.
              </p>
            </Card>
          </motion.div>
        </section>
      </Container>
    </div>
  )
}
