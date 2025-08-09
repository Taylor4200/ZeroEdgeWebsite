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
    id: 'spine-artist-animator',
    title: 'Spine Artist & 2D Animator',
    department: 'Art',
    type: 'Contract or Full-time',
    location: 'Remote',
    description:
      "Own the visual identity of our slots. You'll create production-ready characters, symbols, VFX, and Spine timelines that feel premium on both desktop and mobile.",
    responsibilities: [
      'Design symbols, characters, UI elements, and backgrounds for slot games',
      'Build clean Spine rigs (meshes, weights, constraints) and author performant animations',
      'Export optimized atlases and JSON for web delivery (multi-res, texture packing)',
      'Collaborate with devs to integrate/preview Spine in PixiJS and tune timing/easing',
      'Maintain a consistent visual style across base game and bonus features'
    ],
    requirements: [
      'Strong portfolio showing 2D game art and Spine animation (send links)',
      'Expertise in Spine 2D (meshing, IK, paths, skins) and Photoshop/Illustrator',
      'Understands performance budgets: draw calls, atlas sizing, overdraw',
      'Comfort delivering layered source files and tidy export pipelines',
      'Bonus: Experience with particle/VFX, After Effects, or shader-based effects'
    ]
  },
  {
    id: 'frontend-slot-developer',
    title: 'Frontend Slot Developer (Svelte + PixiJS)',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Remote',
    description:
      'Ship smooth, responsive slot games. You’ll build game UIs, integrate math, wire features, and push perf using Svelte + PixiJS (and our Stake Engine stack).',
    responsibilities: [
      'Implement game flows, reels, states, paytable/feature UIs in Svelte',
      'Integrate PixiJS rendering, Spine animations, and asset loaders',
      'Hook up math outcomes, event buses, and session handling to the web SDK',
      'Optimize for 60fps on mid-tier phones (texture atlases, pooling, GC control)',
      'Write clean, typed code and reusable components; add unit/integration tests'
    ],
    requirements: [
      'Strong Svelte/SvelteKit and TypeScript skills',
      'Hands-on PixiJS experience (containers, spritesheets, filters, Spine runtime)',
      'Understands game loops, timing, easing, and deterministic state',
      'Web perf chops: memory profiling, asset strategies, input latency',
      'Bonus: Experience with Stake Engine/Web SDKs, slot mechanics, or canvas/WebGL'
    ]
  }
]

const applicationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  position: z.string().min(1, 'Please select a position'),
  portfolio: z.string().url('Invalid portfolio URL').optional().or(z.literal('')),
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

  const handleApplyClick = (positionId: string) => {
    setSelectedPosition(positionId)
    
    // Smooth scroll to application form
    const applicationForm = document.getElementById('application-form')
    if (applicationForm) {
      applicationForm.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      position: formData.get('position') as string,
      portfolio: formData.get('portfolio') as string,
      linkedin: formData.get('linkedin') as string,
      github: formData.get('github') as string,
      message: formData.get('message') as string,
      honeypot: formData.get('honeypot') as string
    }

    try {
      const validatedData = applicationSchema.parse(data)
      console.log('Application submitted:', validatedData)
      // TODO: Send to your API / webhook
      alert('Application submitted successfully!')
      e.currentTarget.reset()
      setSelectedPosition('')
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[String(err.path[0])] = err.message
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[color:var(--text)]">
            Join ZeroEdge Studios
          </h1>
          <p className="text-xl text-[color:var(--muted)] max-w-2xl mx-auto">
            We build fast, clean, high-impact slot games for Stake. If you’re elite at your craft and
            care about polish, you’ll fit here.
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
            <p className="text-white/60">Two roles. High bar. Clear impact.</p>
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

                  {'responsibilities' in job && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">What you’ll do:</h4>
                      <ul className="text-white/60 text-sm space-y-1">
                        {(job as any).responsibilities.map((item: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <span className="text-neon-purple mr-2">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Requirements:</h4>
                    <ul className="text-white/60 text-sm space-y-1">
                      {job.requirements.map((req: string, i: number) => (
                        <li key={i} className="flex items-start">
                          <span className="text-neon-purple mr-2">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button onClick={() => handleApplyClick(job.id)} className="w-full">
                    Apply for this position
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Application Form */}
        <section id="application-form">
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
                      className="w-full px-4 py-2 bg-[color:var(--bg)] border border-[color:var(--muted)]/20 rounded-lg text-[color:var(--text)] focus:ring-2 focus:ring-[color:var(--primary)] focus:border-transparent"
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
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
                      className="w-full px-4 py-2 bg-[color:var(--bg)] border border-[color:var(--muted)]/20 rounded-lg text-[color:var(--text)] focus:ring-2 focus:ring-[color:var(--primary)] focus:border-transparent"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
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
                    className="w-full px-4 py-2 bg-[color:var(--bg)] border border-[color:var(--muted)]/20 rounded-lg text-[color:var(--text)] focus:ring-2 focus:ring-[color:var(--primary)] focus:border-transparent"
                  >
                    <option value="">Select a position</option>
                    {jobOpenings.map((job) => (
                      <option key={job.id} value={job.id}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                  {errors.position && <p className="text-red-400 text-sm mt-1">{errors.position}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <label htmlFor="portfolio" className="block text-sm font-medium mb-2">
                      Portfolio
                    </label>
                    <input
                      type="url"
                      id="portfolio"
                      name="portfolio"
                      placeholder="https://your-portfolio.com"
                      className="w-full px-4 py-2 bg-[color:var(--bg)] border border-[color:var(--muted)]/20 rounded-lg text-[color:var(--text)] focus:ring-2 focus:ring-[color:var(--primary)] focus:border-transparent"
                    />
                    {errors.portfolio && <p className="text-red-400 text-sm mt-1">{errors.portfolio}</p>}
                  </div>
                  <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium mb-2">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      id="linkedin"
                      name="linkedin"
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="w-full px-4 py-2 bg-[color:var(--bg)] border border-[color:var(--muted)]/20 rounded-lg text-[color:var(--text)] focus:ring-2 focus:ring-[color:var(--primary)] focus:border-transparent"
                    />
                    {errors.linkedin && <p className="text-red-400 text-sm mt-1">{errors.linkedin}</p>}
                  </div>
                  <div>
                    <label htmlFor="github" className="block text-sm font-medium mb-2">
                      GitHub
                    </label>
                    <input
                      type="url"
                      id="github"
                      name="github"
                      placeholder="https://github.com/yourusername"
                      className="w-full px-4 py-2 bg-[color:var(--bg)] border border-[color:var(--muted)]/20 rounded-lg text-[color:var(--text)] focus:ring-2 focus:ring-[color:var(--primary)] focus:border-transparent"
                    />
                    {errors.github && <p className="text-red-400 text-sm mt-1">{errors.github}</p>}
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
                    placeholder="Tell us why you’re a fit. Include links to your best work and what you shipped most recently."
                    className="w-full px-4 py-2 bg-[color:var(--bg)] border border-[color:var(--muted)]/20 rounded-lg text-[color:var(--text)] focus:ring-2 focus:ring-[color:var(--primary)] focus:border-transparent resize-vertical"
                  />
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                </div>

                {/* Honeypot */}
                <input
                  type="text"
                  name="honeypot"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <Button type="submit" disabled={isSubmitting} className="w-full">
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