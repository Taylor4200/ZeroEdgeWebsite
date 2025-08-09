'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  honeypot: z.string().max(0, 'Invalid submission')
})

type ContactForm = z.infer<typeof contactSchema>

export default function ContactPage() {
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
      company: formData.get('company') as string,
      message: formData.get('message') as string,
      honeypot: formData.get('honeypot') as string
    }

    try {
      const validatedData = contactSchema.parse(data)
      console.log('Contact form submitted:', validatedData)
      // TODO: Send to actual API
      alert('Message sent successfully! We\'ll get back to you soon.')
      e.currentTarget.reset()
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
    <div className="min-h-screen py-20">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-[color:var(--muted)] max-w-3xl mx-auto">
            Interested in our Stake-exclusive games? Get in touch to learn more about our partnership opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Partnership Inquiry</h2>
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
                      className="w-full px-4 py-2 bg-[color:var(--bg)] border border-[color:var(--muted)]/20 rounded-lg text-[color:var(--text)] focus:ring-2 focus:ring-[color:var(--primary)] focus:border-transparent"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    className="w-full px-4 py-2 bg-[color:var(--bg)] border border-[color:var(--muted)]/20 rounded-lg text-[color:var(--text)] focus:ring-2 focus:ring-[color:var(--primary)] focus:border-transparent"
                  />
                  {errors.company && (
                    <p className="text-red-400 text-sm mt-1">{errors.company}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell us about your partnership interest..."
                    className="w-full px-4 py-2 bg-[color:var(--bg)] border border-[color:var(--muted)]/20 rounded-lg text-[color:var(--text)] focus:ring-2 focus:ring-[color:var(--primary)] focus:border-transparent resize-vertical"
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
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Company Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Why Partner With Us?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-neon-purple/20 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-neon-purple text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Premium Content</h3>
                    <p className="text-white/60 text-sm">
                      High-quality slot games with innovative mechanics and stunning visuals
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-neon-purple/20 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-neon-purple text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Technical Excellence</h3>
                    <p className="text-white/60 text-sm">
                      Modern technology stack with seamless integration capabilities
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-neon-purple/20 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-neon-purple text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Compliance Ready</h3>
                    <p className="text-white/60 text-sm">
                      Games designed to meet regulatory requirements in key markets
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-neon-purple/20 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-neon-purple text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Dedicated Support</h3>
                    <p className="text-white/60 text-sm">
                      Comprehensive technical support and documentation
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Contact Us</h3>
                  <p className="text-white/60 text-sm">
                    For all inquiries, partnerships, and support
                  </p>
                  <p className="text-neon-purple">contact@zeroedgestudios.com</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </Container>
    </div>
  )
}
