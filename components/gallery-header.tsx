"use client"

import { useState, useEffect } from "react"
import { Paintbrush, Brush, Sparkles, Palette } from "lucide-react"

export function GalleryHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHoveringTitle, setIsHoveringTitle] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-gradient-to-br from-pink-500/10 via-rose-400/5 to-transparent backdrop-blur-md shadow-lg shadow-pink-500/10" 
            : "bg-transparent"
        }`}
        style={{
          background: isScrolled 
            ? `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(236, 72, 153, 0.15) 0%, transparent 50%), 
               radial-gradient(circle at ${100 - mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(244, 114, 182, 0.1) 0%, transparent 50%), 
               linear-gradient(to bottom, rgba(251, 113, 133, 0.05) 0%, transparent 100%)`
            : undefined
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className={`absolute h-32 w-full transition-all duration-1000 ${
              isScrolled ? "opacity-30" : "opacity-0"
            }`}
            style={{
              background: `linear-gradient(to bottom, 
                transparent 0%,
                rgba(236, 72, 153, 0.1) 20%,
                rgba(244, 114, 182, 0.15) 40%,
                rgba(251, 113, 133, 0.1) 60%,
                rgba(255, 228, 230, 0.05) 80%,
                transparent 100%
              )`,
              maskImage: `linear-gradient(to right, 
                transparent 0%,
                black 20%,
                black 80%,
                transparent 100%
              )`,
              transform: `translateY(${isScrolled ? '0' : '-100%'})`,
              transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease'
            }}
          />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-pink-300/10 to-rose-300/10"
              style={{
                width: `${4 + Math.random() * 6}px`,
                height: `${4 + Math.random() * 6}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${8 + Math.random() * 8}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: isScrolled ? 0.4 : 0.1
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 py-4 relative">
          <nav className="flex items-center justify-between">
            <div 
              className="relative group"
              onMouseEnter={() => setIsHoveringTitle(true)}
              onMouseLeave={() => setIsHoveringTitle(false)}
            >
              <div className={`absolute -inset-4 rounded-2xl transition-all duration-700 ${
                isHoveringTitle 
                  ? "bg-gradient-to-r from-pink-500/20 via-rose-400/15 to-pink-500/20 blur-xl" 
                  : "bg-gradient-to-r from-pink-500/5 via-transparent to-pink-500/5"
              }`} />
              
              <div className={`absolute -inset-2 rounded-xl transition-opacity duration-500 ${
                isHoveringTitle ? "opacity-100" : "opacity-0"
              }`}>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400/30 via-transparent to-rose-400/30 rounded-xl blur-md" />
              </div>

              <div className="relative flex items-center space-x-3">
                <div className={`relative transition-all duration-500 ${
                  isHoveringTitle ? "scale-110 rotate-12" : "scale-100"
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full blur-sm opacity-60" />
                  <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg">
                    <Brush className="h-5 w-5 text-white" />
                  </div>
                  {isHoveringTitle && (
                    <>
                      <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-300 animate-ping" />
                      <Sparkles className="absolute -bottom-1 -left-1 h-3 w-3 text-yellow-300 animate-ping" style={{ animationDelay: '0.3s' }} />
                    </>
                  )}
                </div>

                <div className="relative">
                  <h1 className={`text-2xl font-bold font-sans transition-all duration-700 ${
                    isHoveringTitle 
                      ? "tracking-widest" 
                      : "tracking-normal"
                  }`}>
                    <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 bg-clip-text text-transparent animate-gradient">
                      Martínez Ordaz
                    </span>
                  </h1>

                  <div className={`absolute -bottom-4 left-0 right-0 text-center transition-all duration-500 ${
                    isHoveringTitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  }`}>
                    <span className="text-xs font-medium bg-gradient-to-r from-pink-300/80 to-rose-300/80 bg-clip-text text-transparent">
                      Creative Studio
                    </span>
                  </div>
                </div>
              </div>

              {isHoveringTitle && (
                <div className="absolute -top-4 -left-4 -right-4 -bottom-4 pointer-events-none">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full bg-gradient-to-r from-pink-300/40 to-rose-300/40"
                      style={{
                        width: '2px',
                        height: '2px',
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animation: `sparkle ${0.5 + Math.random() * 1}s ease-out forwards`,
                        animationDelay: `${Math.random() * 0.5}s`
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className={`hidden md:flex items-center space-x-2 transition-opacity duration-500 ${
              isScrolled ? "opacity-100" : "opacity-30"
            }`}>
              <div className="flex flex-col items-center space-y-1">
                <div className="h-1 w-1 rounded-full bg-gradient-to-b from-pink-300 to-rose-400 animate-pulse" />
                <div className="h-1 w-1 rounded-full bg-gradient-to-b from-pink-300/60 to-rose-400/60 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="h-1 w-1 rounded-full bg-gradient-to-b from-pink-300/30 to-rose-400/30 animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
              <span className="text-xs font-medium bg-gradient-to-r from-pink-300/60 to-rose-300/60 bg-clip-text text-transparent">
                Scroll
              </span>
            </div>
          </nav>
        </div>

        <div className={`absolute bottom-0 left-0 right-0 h-px transition-all duration-700 ${
          isScrolled ? "opacity-100" : "opacity-30"
        }`}>
          <div className="h-full bg-gradient-to-r from-transparent via-pink-400/30 to-transparent" 
               style={{
                 backgroundSize: '200% 100%',
                 animation: 'shimmer 3s ease-in-out infinite'
               }} 
          />
        </div>
      </header>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-10px) translateX(5px); }
          66% { transform: translateY(5px) translateX(-5px); }
        }

        @keyframes sparkle {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1) rotate(180deg); opacity: 1; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        /* Optimizaciones */
        .backdrop-blur-md {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        /* Para usuarios que prefieren menos movimiento */
        @media (prefers-reduced-motion: reduce) {
          .animate-gradient,
          .animate-ping,
          .animate-pulse {
            animation: none;
          }
          
          .backdrop-blur-md {
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
          }
        }
      `}</style>
    </>
  )
}