"use client"
import React from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useCounter } from '../../hooks/useCounter'

interface StatData {
  value: string
  label: string
}

interface AnimatedStatCardProps {
  stat: StatData
  index: number
}

// Helper function to extract number from string and format it
const parseStatValue = (value: string) => {
  // Remove all non-numeric characters except decimal points
  const numericString = value.replace(/[^\d.]/g, '')
  const number = parseFloat(numericString)
  
  // Extract suffix (k, M, etc.)
  const suffix = value.replace(/[\d.,\s]/g, '')
  
  return { number: isNaN(number) ? 0 : number, suffix }
}

const formatNumber = (num: number, originalValue: string) => {
  const { suffix } = parseStatValue(originalValue)
  
  if (suffix.includes('k') || suffix.includes('K')) {
    return `${num.toFixed(0)}k${suffix.replace(/[kK]/g, '')}`
  } else if (suffix.includes('M')) {
    return `$${num.toFixed(0)}M`
  } else if (suffix.includes('$')) {
    return `$${num.toFixed(0)}${suffix.replace('$', '')}`
  } else {
    return `${num.toFixed(0)}${suffix}`
  }
}

export const AnimatedStatCard: React.FC<AnimatedStatCardProps> = ({ stat, index }) => {
  const { ref, isInView } = useIntersectionObserver({ 
    threshold: 0.3,
    triggerOnce: false
  })

  const { number: targetNumber } = parseStatValue(stat.value)
  const animatedNumber = useCounter({ 
    end: targetNumber, 
    duration: 2000 + (index * 200), // Staggered animation
    isInView 
  })

  const displayValue = targetNumber > 0 ? formatNumber(animatedNumber, stat.value) : stat.value

  return (
    <div
      ref={ref}
      className={`bg-white/20 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 p-6 md:p-8 flex flex-col items-center justify-center min-h-[160px] md:min-h-[180px] hover:bg-white/25 hover:scale-105 transition-all duration-500 group relative overflow-hidden ${
        isInView ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
      }`}
      style={{ 
        animationDelay: `${index * 150}ms`,
        animationDuration: '0.8s',
        animationFillMode: 'forwards'
      }}
    >
      {/* Shimmer effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 transition-all duration-1000 ${
        isInView ? 'translate-x-full' : '-translate-x-full'
      }`} style={{ animationDelay: `${index * 200 + 500}ms` }} />
      
      {/* Pulsing ring when animating */}
      {isInView && targetNumber > 0 && (
        <div className="absolute inset-0 rounded-3xl border-2 border-white/30 animate-pulse-ring" 
             style={{ animationDelay: `${index * 200}ms` }} />
      )}
      
      <div className={`text-3xl md:text-4xl lg:text-5xl font-black mb-3 text-white drop-shadow-lg group-hover:scale-110 transition-all duration-300 ${
        isInView && targetNumber > 0 ? 'animate-bounce-in' : ''
      }`} style={{ animationDelay: `${index * 200 + 300}ms` }}>
        {displayValue}
      </div>
      
      <div className={`text-sm md:text-base lg:text-lg text-white/90 font-semibold text-center leading-relaxed transition-all duration-500 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`} style={{ animationDelay: `${index * 200 + 600}ms` }}>
        {stat.label}
      </div>
      
      {/* Background glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl transition-opacity duration-500 ${
        isInView ? 'opacity-100' : 'opacity-0'
      }`} />
    </div>
  )
}
