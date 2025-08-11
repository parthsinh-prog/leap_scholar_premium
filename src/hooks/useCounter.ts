import { useState, useEffect } from 'react'

interface UseCounterOptions {
  start?: number
  end: number
  duration?: number
  isInView: boolean
}

export const useCounter = ({ start = 0, end, duration = 2000, isInView }: UseCounterOptions) => {
  const [count, setCount] = useState(start)

  useEffect(() => {
    if (!isInView) {
      setCount(start)
      return
    }

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (startTime === undefined) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = start + (end - start) * easeOutQuart

      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [start, end, duration, isInView])

  return Math.floor(count)
}
