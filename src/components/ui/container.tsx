"use client"
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, size = 'lg', ...props }, ref) => {
    const sizes = {
      sm: 'max-w-4xl',
      md: 'max-w-6xl',
      lg: 'max-w-7xl',
      xl: 'max-w-screen-2xl'
    }

    return (
      <div
        ref={ref}
        className={cn('mx-auto px-4 sm:px-6 lg:px-8', sizes[size], className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Container.displayName = 'Container'

export { Container }
