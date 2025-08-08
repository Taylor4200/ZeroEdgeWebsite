'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { z } from 'zod'

const jobOpenings = [
  {
    id: 'game-mathematician',
    title: 'Game Mathematician',
    department: 'Mathematics',
    type: 'Full-time',
    location: 'Remote',
    description: 'Join our team to design and implement game mathematics for our slot games. You\'ll work on RTP calculations, volatility modeling, and feature design.',
    requirements: [
      'Strong mathematical background (Statistics, Probability, or related field)',
      'Experience with game mathematics and RTP calculations',
      'Proficiency in Python, R, or similar statistical programming languages',
      'Understanding of gaming regulations and compliance requirements'
    ]
  },
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Remote',
    description: 'Help us build the next generation of slot games using modern web technologies. You\'ll work on game engines, UI components, and performance optimization.',
    requirements: [
      'Strong experience with JavaScript/TypeScript and modern frameworks',
      'Experience with Canvas, WebGL, or game development',
      'Knowledge of performance optimization and mobile development',
      'Understanding of gaming industry standards and best practices'
    ]
  },
  {
    id: 'technical-artist',
    title: 'Technical Artist',
    department: 'Art',
    type: 'Full-time',
    location: 'Remote',
    description: 'Bridge the gap between art and technology. You\'ll work on visual effects, animations, and technical implementation of game assets.',
    requirements: [
      'Experience with 2D/3D animation and visual effects',
      'Knowledge of game engines and real-time rendering',
      'Proficiency in tools like After Effects, Blender, or similar',
      'Understanding of performance constraints in game development'
    ]
  }
]

const applicationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  position: z.string().min(1, 'Please select a position'),
  linkedin: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  github: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  honeypot: z.string().max(0, 'Invalid submission')
})

type ApplicationForm = z.infer<typeof applicationSchema>

export default function CareersPage() {
  const [selectedPosition, setSelectedPosition] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      position: formData.get('position') as string,
      linkedin: formData.get('linkedin') as string,
      github: formData.get('github') as string,
      message: formData.get('message') as string,
      honeypot: formData.get('honeypot') as string
    }

    try {
      const validatedData = applicationSchema.parse(data)
      console.log('Application submitted:', validatedData)
      // TODO: Send to actual API
      alert('Application submitted successfully!')
      e.currentTarget.reset()
      setSelectedPosition('')
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message
          }
        })
        setErrors(newErrors)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-[0.08] bg-[color:var(--primary)]/20" />
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[color:var(--text)]">Join Our Team</h1>
          <p className="text-xl text-[color:var(--muted)] max-w-2xl mx-auto">
            Help us create the next generation of slot games. We're looking for talented 
            individuals who are passionate about gaming and innovation.
          </p>
        </motion.div>

        {/* Job Openings */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
            <p className="text-white/60">
              Explore our current openings and find your perfect role
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="info">{job.department}</Badge>
                        <Badge variant="default">{job.type}</Badge>
                        <Badge variant="default">{job.location}</Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-white/60 mb-4">{job.description}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Requirements:</h4>
                    <ul className="text-white/60 text-sm space-y-1">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-neon-purple mr-2">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    onClick={() => setSelectedPosition(job.id)}
                    className="w-full"
                  >
                    Apply for this position
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Application Form */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 max-w-2xl mx-auto relative overflow-hidden bg-[color:var(--bg)] border border-[color:var(--muted)]/20">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[color:var(--text)]">
                Apply Now
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2 bg-background-secondary border border-border rounded-lg text-white focus:ring-2 focus:ring-neon-purple focus:border-transparent"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-2 bg-background-secondary border border-border rounded-lg text-white focus:ring-2 focus:ring-neon-purple focus:border-transparent"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="position" className="block text-sm font-medium mb-2">
                    Position *
                  </label>
                  <select
                    id="position"
                    name="position"
                    required
                    value={selectedPosition}
                    onChange={(e) => setSelectedPosition(e.target.value)}
                    className="w-full px-4 py-2 bg-background-secondary border border-border rounded-lg text-white focus:ring-2 focus:ring-neon-purple focus:border-transparent"
                  >
                    <option value="">Select a position</option>
                    {jobOpenings.map((job) => (
                      <option key={job.id} value={job.id}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                  {errors.position && (
                    <p className="text-red-400 text-sm mt-1">{errors.position}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium mb-2">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      id="linkedin"
                      name="linkedin"
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="w-full px-4 py-2 bg-background-secondary border border-border rounded-lg text-white focus:ring-2 focus:ring-neon-purple focus:border-transparent"
                    />
                    {errors.linkedin && (
                      <p className="text-red-400 text-sm mt-1">{errors.linkedin}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="github" className="block text-sm font-medium mb-2">
                      GitHub Profile
                    </label>
                    <input
                      type="url"
                      id="github"
                      name="github"
                      placeholder="https://github.com/yourusername"
                      className="w-full px-4 py-2 bg-background-secondary border border-border rounded-lg text-white focus:ring-2 focus:ring-neon-purple focus:border-transparent"
                    />
                    {errors.github && (
                      <p className="text-red-400 text-sm mt-1">{errors.github}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Cover Letter *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell us why you'd be a great fit for this position..."
                    className="w-full px-4 py-2 bg-background-secondary border border-border rounded-lg text-white focus:ring-2 focus:ring-neon-purple focus:border-transparent resize-vertical"
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Honeypot */}
                <input
                  type="text"
                  name="honeypot"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </form>
            </Card>
          </motion.div>
        </section>
      </Container>
    </div>
  )
}
