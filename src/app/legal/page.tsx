'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const legalContent = {
  terms: {
    title: 'Terms of Service',
    content: `
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing and using the ZeroEdgeStudios website, you accept and agree to be bound by the terms and provision of this agreement.</p>
      
      <h2>2. Use License</h2>
      <p>Permission is granted to temporarily download one copy of the materials (information or software) on ZeroEdgeStudios's website for personal, non-commercial transitory viewing only.</p>
      
      <h2>3. Disclaimer</h2>
      <p>The materials on ZeroEdgeStudios's website are provided on an 'as is' basis. ZeroEdgeStudios makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
      
      <h2>4. Limitations</h2>
      <p>In no event shall ZeroEdgeStudios or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ZeroEdgeStudios's website.</p>
      
      <h2>5. Revisions and Errata</h2>
      <p>The materials appearing on ZeroEdgeStudios's website could include technical, typographical, or photographic errors. ZeroEdgeStudios does not warrant that any of the materials on its website are accurate, complete or current.</p>
    `
  },
  privacy: {
    title: 'Privacy Policy',
    content: `
      <h2>1. Information We Collect</h2>
      <p>We collect information you provide directly to us, such as when you contact us, apply for a position, or sign up for our newsletter.</p>
      
      <h2>2. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide, maintain, and improve our services</li>
        <li>Process and respond to your inquiries</li>
        <li>Send you technical notices and support messages</li>
        <li>Communicate with you about products, services, and events</li>
      </ul>
      
      <h2>3. Information Sharing</h2>
      <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
      
      <h2>4. Data Security</h2>
      <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
      
      <h2>5. Your Rights</h2>
      <p>You have the right to access, update, or delete your personal information. You may also opt out of certain communications from us.</p>
    `
  },
  'responsible-gaming': {
    title: 'Responsible Gaming',
    content: `
      <h2>1. Our Commitment</h2>
      <p>ZeroEdgeStudios is committed to promoting responsible gaming practices and ensuring that our games are designed with player protection in mind.</p>
      
      <h2>2. Player Protection Features</h2>
      <p>Our games include various features designed to promote responsible gaming:</p>
      <ul>
        <li>Session time limits and reminders</li>
        <li>Reality checks and break reminders</li>
        <li>Self-exclusion options</li>
        <li>Deposit and loss limits</li>
      </ul>
      
      <h2>3. Age Restrictions</h2>
      <p>Our games are intended for players aged 18 and above. We do not knowingly collect personal information from individuals under the age of 18.</p>
      
      <h2>4. Problem Gambling Resources</h2>
      <p>If you or someone you know is experiencing problems with gambling, help is available:</p>
      <ul>
        <li>National Problem Gambling Helpline: 1-800-522-4700</li>
        <li>Gamblers Anonymous: www.gamblersanonymous.org</li>
        <li>National Council on Problem Gambling: www.ncpgambling.org</li>
      </ul>
      
      <h2>5. Self-Assessment</h2>
      <p>Consider these questions to assess your gaming habits:</p>
      <ul>
        <li>Do you gamble more than you can afford to lose?</li>
        <li>Do you gamble to escape problems or relieve depression?</li>
        <li>Have you lied to family or friends about your gambling?</li>
        <li>Have you borrowed money to finance your gambling?</li>
      </ul>
    `
  }
}

const tabs = [
  { id: 'terms', label: 'Terms of Service' },
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'responsible-gaming', label: 'Responsible Gaming' }
]

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState('terms')

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Legal Information</h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Important legal information about our services, privacy practices, and responsible gaming commitment
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className="rounded-full"
            >
              {tab.label}
            </Button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              {legalContent[activeTab as keyof typeof legalContent].title}
            </h2>
            <div 
              className="prose prose-invert prose-lg max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: legalContent[activeTab as keyof typeof legalContent].content 
              }}
            />
          </Card>
        </motion.div>
      </Container>
    </div>
  )
}
