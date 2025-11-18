'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface MainLayoutProps {
  children: React.ReactNode
  className?: string
  container?: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

export function MainLayout({
  children,
  className,
  container = true,
  maxWidth = '7xl',
  padding = 'lg',
}: MainLayoutProps) {
  const containerClasses = cn(
    container && 'container mx-auto',
    container && maxWidth !== 'full' && `max-w-${maxWidth}`,
    padding !== 'none' && `px-${padding === 'sm' ? '4' : padding === 'md' ? '6' : padding === 'lg' ? '8' : '10'}`
  )

  return (
    <div className={cn('min-h-screen bg-background', className)}>
      <div className={containerClasses}>
        {children}
      </div>
    </div>
  )
}

interface SectionProps {
  children: React.ReactNode
  className?: string
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
  id?: string
}

export function Section({ children, className, spacing = 'lg', id }: SectionProps) {
  const spacingClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-20',
  }

  return (
    <section 
      id={id}
      className={cn(
        spacingClasses[spacing],
        className
      )}
    >
      {children}
    </section>
  )
}

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl'
  center?: boolean
}

export function Container({ 
  children, 
  className, 
  size = '7xl', 
  center = true 
}: ContainerProps) {
  return (
    <div 
      className={cn(
        'container',
        center && 'mx-auto',
        `max-w-${size}`,
        className
      )}
    >
      {children}
    </div>
  )
}

interface GridProps {
  children: React.ReactNode
  className?: string
  cols?: 1 | 2 | 3 | 4 | 6 | 12
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  responsive?: boolean
}

export function Grid({ 
  children, 
  className, 
  cols = 3, 
  gap = 'md',
  responsive = true 
}: GridProps) {
  const colsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    6: 'grid-cols-6',
    12: 'grid-cols-12',
  }

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-10',
  }

  const responsiveClasses = responsive ? {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
    12: 'grid-cols-4 md:grid-cols-6 lg:grid-cols-12',
  } : colsClasses

  return (
    <div 
      className={cn(
        'grid',
        responsive ? responsiveClasses[cols] : colsClasses[cols],
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  )
}
