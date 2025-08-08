'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface FadeProps {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
  inView?: boolean
}

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 50,
  ...rest
}: FadeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className={className}
      {...(rest as any)}
    >
      {children}
    </motion.div>
  )
}

export function FadeInWhenVisible({
  children,
  className,
  delay = 0,
  y = 50,
  once = true,
  ...rest
}: FadeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once }}
      className={className}
      {...(rest as any)}
    >
      {children}
    </motion.div>
  )
}


