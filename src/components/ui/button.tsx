"use client"
import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, asChild = false, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus-ring disabled:opacity-50 disabled:pointer-events-none'
    
    const variants = {
      primary: 'bg-[color:var(--primary)] text-white shadow-[0_0_0_0_rgba(154,91,255,0)] hover:shadow-[0_0_24px_0_rgba(154,91,255,.45)]',
      secondary: 'bg-[color:var(--bg)] text-[color:var(--text)] border border-[color:var(--muted)]/20 hover:bg-[color:var(--muted)]/10',
      outline: 'text-[color:var(--text)] border border-[color:var(--muted)]/20 hover:bg-[color:var(--muted)]/10',
      ghost: 'text-[color:var(--text)] hover:bg-[color:var(--muted)]/10'
    }
    
    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-11 px-6 text-base',
      lg: 'h-14 px-8 text-lg'
    }

    if (asChild) {
      return (
        <motion.span
          className={cn(baseStyles, variants[variant], sizes[size], className)}
          transition={{ type: 'tween', ease: 'easeOut', duration: 0.18 }}
        >
          {children}
        </motion.span>
      )
    }

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.18 }}
        {...(props as any)}
      >
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
