"use client"

import { useState, useEffect } from "react"
import { PenTool } from "lucide-react"

interface SplashScreenProps {
  duration?: number
  onLoadingComplete?: () => void
}

export function SplashScreen({ 
  duration = 3000,
  onLoadingComplete 
}: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [penProgress, setPenProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("“Design is thinking made visual.” - Saul Bass")

  useEffect(() => {
    const texts = [
      "Loading visuals",
      "Making a new PSD",
      "Opening Illustrator",
      "Create new File",
    ]
    
    let textIndex = 0
    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % texts.length
      setLoadingText(texts[textIndex])
    }, 700)

    return () => clearInterval(textInterval)
  }, [])

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setPenProgress(prev => {
        if (prev >= 100) {
          return 100
        }
        return prev + 2
      })
    }, duration / 50)

    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onLoadingComplete) {
        onLoadingComplete()
      }
    }, duration)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(timer)
    }
  }, [duration, onLoadingComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-background to-card">
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-primary/10 to-accent/10"
              style={{
                width: `${4 + Math.random() * 8}px`,
                height: `${4 + Math.random() * 8}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `splashFloat ${6 + Math.random() * 8}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>


        <div className="relative z-10 text-center max-w-md mx-auto px-6">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative h-32 w-32 mx-auto mb-6">
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
              >
                <path
                  d="M50,30 C60,20 75,20 85,30 C95,40 95,60 85,70 C75,80 60,80 50,70 C40,80 25,80 15,70 C5,60 5,40 15,30 C25,20 40,20 50,30 Z"
                  fill="none"
                  stroke="url(#vectorGradient)"
                  strokeWidth="2"
                  strokeDasharray="280"
                  strokeDashoffset="280"
                  style={{
                    strokeDashoffset: `${280 - (penProgress * 2.8)}`
                  }}
                />
                
                <circle cx="50" cy="30" r="2" fill="hsl(var(--primary))" className="animate-ping" />
                <circle cx="85" cy="30" r="2" fill="hsl(var(--primary))" className="animate-ping" style={{ animationDelay: '0.2s' }} />
                <circle cx="85" cy="70" r="2" fill="hsl(var(--accent))" className="animate-ping" style={{ animationDelay: '0.4s' }} />
                <circle cx="50" cy="70" r="2" fill="hsl(var(--accent))" className="animate-ping" style={{ animationDelay: '0.6s' }} />
                <circle cx="15" cy="70" r="2" fill="hsl(var(--primary))" className="animate-ping" style={{ animationDelay: '0.8s' }} />
                <circle cx="15" cy="30" r="2" fill="hsl(var(--primary))" className="animate-ping" style={{ animationDelay: '1s' }} />
                
                <defs>
                  <linearGradient id="vectorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="50%" stopColor="hsl(var(--accent))" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" />
                  </linearGradient>
                </defs>
              </svg>
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-md"></div>
                  <PenTool className="h-12 w-12 text-primary relative z-10 animate-bounce" />
                  <div className="absolute -top-2 -right-2 h-4 w-4 bg-accent/50 rounded-full animate-ping"></div>
                </div>
              </div>
            </div>

            <div className="w-48 h-1 bg-muted rounded-full overflow-hidden mx-auto mt-6">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300"
                style={{ width: `${penProgress}%` }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {loadingText}
            </h2>
            <p className="text-muted-foreground font-serif">
              Wait for It...
            </p>
            
            <div className="flex justify-center space-x-2">
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="h-2 w-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-border/50">
            <div className="flex items-center justify-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent animate-spin-slow"></div>
              <span className="text-sm text-muted-foreground font-medium">
                Martínez Creative Studio
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Crafting digital experiences since 2018
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes splashFloat {
          0%, 100% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-10px) translateX(5px); }
          66% { transform: translateY(5px) translateX(-5px); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .splash-float,
          .animate-spin-slow,
          .animate-ping,
          .animate-bounce,
          .animate-pulse {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}