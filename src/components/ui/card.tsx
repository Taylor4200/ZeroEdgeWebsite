"use client"
import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hover?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, hover = true, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'rounded-2xl border border-[color:var(--muted)]/20 bg-[color:var(--bg)]',
          hover && 'hover:border-[color:var(--primary)]/50 hover:bg-[color:var(--muted)]/5',
          className
        )}
        whileHover={hover ? { scale: 1.01 } : undefined}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.18 }}
        {...(props as any)}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

export { Card }
