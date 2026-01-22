"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, ExternalLink, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"
import { GlowEffect } from "./GlowEffect"

const exhibitionImages = [
  {
    id: 1,
    src: "/imagex1.webp",
    title: "Wine Elegance",
    artist: "Brand Design",
    description: "A mockup with the new logo for Wibeam, designed by me. Wibeam is a wine brand who look for elegance and a new fresh image",
  },
  {
    id: 2,
    src: "/imagex2.webp",
    title: "Del Mar MiniMarket",
    artist: "Brand Design",
    description: "A market from the natural sea, mockup designed for the new logo. This is a market with a sea motive, fresh and clean is what they looking for. Brand and logo designed by me.",
  },
  {
    id: 3,
    src: "/imagex3.webp",
    title: "Vital Fit App",
    artist: "Mockup Design",
    description: "A mockup for a possible android app for the Vital Fit Gym Brand, with the new logo and design. Brand, logo and website designed by me.",
  },
  {
    id: 4,
    src: "/imagex4.webp",
    title: "Best food in town",
    artist: "Poster Design",
    description: "A poster with the new logo for Japanese Food, a restaurant from Japan culture. Brand and logo designed by me.",
  },
  {
    id: 5,
    src: "/imagex5.webp",
    title: "Ecological Energy",
    artist: "Mockup Design",
    description: "Uniform mockup with the new logo for EcoEnergy, a company who looks for professional branding. Brand and logo designed by me.",
  },
  {
    id: 6,
    src: "/imagex6.webp",
    title: "The Best Portrait",
    artist: "Poster Design",
    description: "Poster Design with photography retoque for a marketing brand.",
  },
]

const fallbackImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80",
    title: "Wine Elegance",
    artist: "Brand Design",
    description: "A mockup with the new logo for Wibeam, designed by me.",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w-800&q=80",
    title: "Del Mar MiniMarket",
    artist: "Brand Design",
    description: "A market from the natural sea, mockup designed for the new logo.",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
    title: "Vital Fit App",
    artist: "Mockup Design",
    description: "A mockup for a possible android app for the Vital Fit Gym Brand.",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    title: "Best food in town",
    artist: "Poster Design",
    description: "A poster with the new logo for Japanese Food.",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=800&q=80",
    title: "Ecological Energy",
    artist: "Mockup Design",
    description: "Uniform mockup with the new logo for EcoEnergy.",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=800&q=80",
    title: "The Best Portrait",
    artist: "Poster Design",
    description: "Poster Design with photography retoque for a marketing brand.",
  },
]

interface CherryBlossomLeafProps {
  delay: number
  duration: number
  left: number
  size: number
}

function CherryBlossomLeaf({ delay, duration, left, size }: CherryBlossomLeafProps) {
  const leafStyle = {
    '--delay': `${delay}s`,
    '--duration': `${duration}s`,
    '--left': `${left}%`,
    '--size': `${size}px`,
  } as React.CSSProperties

  return (
    <div
      className="absolute pointer-events-none z-0 cherry-blossom-leaf"
      style={leafStyle}
    >
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/70 to-purple-300/70 rounded-full transform rotate-45"></div>
        <div className="absolute inset-1 bg-gradient-to-br from-pink-100/50 to-purple-200/50 rounded-full"></div>
      </div>
    </div>
  )
}

export function ImageExhibition() {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<(typeof exhibitionImages)[0] | null>(null)
  const [leaves, setLeaves] = useState<Array<{id: number, delay: number, duration: number, left: number, size: number}>>([])
  const [currentImages, setCurrentImages] = useState(exhibitionImages)
  const sectionRef = useRef<HTMLElement>(null)

  const openInfoModal = () => setIsInfoModalOpen(true)
  const closeInfoModal = () => setIsInfoModalOpen(false)

  const openImageModal = (image: (typeof exhibitionImages)[0]) => {
    setSelectedImage(image)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return

    const currentIndex = currentImages.findIndex(img => img.id === selectedImage.id)
    let newIndex

    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : currentImages.length - 1
    } else {
      newIndex = currentIndex < currentImages.length - 1 ? currentIndex + 1 : 0
    }

    setSelectedImage(currentImages[newIndex])
  }

  useEffect(() => {
    const checkImages = async () => {
      const imageChecks = await Promise.all(
        exhibitionImages.map(async (img) => {
          try {
            const response = await fetch(img.src, { method: 'HEAD' })
            return response.ok ? img : fallbackImages.find(fb => fb.id === img.id) || img
          } catch {
            return fallbackImages.find(fb => fb.id === img.id) || img
          }
        })
      )
      setCurrentImages(imageChecks)
    }
    
    checkImages()
  }, [])

  useEffect(() => {
    const initialLeaves = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      left: Math.random() * 100,
      size: 8 + Math.random() * 12, 
    }))
    setLeaves(initialLeaves)

    const style = document.createElement('style')
    style.textContent = `
      @keyframes fall {
        0% {
          transform: translateY(-100px) translateX(0) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 0.8;
        }
        90% {
          opacity: 0.6;
        }
        100% {
          transform: translateY(100vh) translateX(100px) rotate(360deg);
          opacity: 0;
        }
      }
      
      .cherry-blossom-leaf {
        animation: fall var(--duration, 15s) linear var(--delay, 0s) infinite;
        left: var(--left, 50%);
        width: var(--size, 15px);
        height: var(--size, 15px);
        top: -50px;
        opacity: 0.7;
        will-change: transform, opacity;
        transform: translateZ(0);
        backface-visibility: hidden;
      }
      
      @media (prefers-reduced-motion: reduce) {
        .cherry-blossom-leaf {
          animation: none !important;
          opacity: 0.3;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === 'Escape') {
          closeImageModal()
        } else if (e.key === 'ArrowLeft') {
          navigateImage('prev')
        } else if (e.key === 'ArrowRight') {
          navigateImage('next')
        }
      }
      
      if (isInfoModalOpen && e.key === 'Escape') {
        closeInfoModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, isInfoModalOpen, currentImages])

  useEffect(() => {
    if (selectedImage || isInfoModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage, isInfoModalOpen])

  return (
    <section
      id="gallery"
      className="py-20 bg-gradient-to-b from-background to-pink-50/20 dark:to-pink-950/10 relative overflow-hidden"
      ref={sectionRef}
    >
      <GlowEffect position="top" intensity="light" color="mixed" className="opacity-30" />

      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-purple-500/5 z-0"></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {leaves.map((leaf) => (
          <CherryBlossomLeaf
            key={leaf.id}
            delay={leaf.delay}
            duration={leaf.duration}
            left={leaf.left}
            size={leaf.size}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="h-3 w-16 bg-gradient-to-r from-transparent via-pink-500 to-transparent rounded-full"></div>
            <Sparkles className="h-8 w-8 text-pink-500 animate-pulse" />
            <h2 className="text-4xl md:text-6xl font-bold font-sans bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Featured Exhibition
            </h2>
            <Sparkles className="h-8 w-8 text-purple-500 animate-pulse" />
            <div className="h-3 w-16 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full"></div>
          </div>
          <p className="text-xl text-muted-foreground font-serif max-w-2xl mx-auto mt-6">
            Discover my most relevant works and projects in this gallery. I select the best only for you!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {currentImages.map((image) => (
            <Card
              key={image.id}
              className="group relative overflow-hidden bg-white dark:bg-gray-900 border-2 border-transparent hover:border-pink-500/50 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-pink-500/20 rounded-3xl"
              onMouseEnter={() => setHoveredImage(image.id)}
              onMouseLeave={() => setHoveredImage(null)}
              onClick={() => openImageModal(image)}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-3xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    const fallback = fallbackImages.find(fb => fb.id === image.id)
                    if (fallback && target.src !== fallback.src) {
                      target.src = fallback.src
                    }
                  }}
                />
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <ExternalLink className="h-8 w-8 text-pink-600 dark:text-pink-400" />
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold font-sans text-gray-800 dark:text-gray-200 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                    {image.title}
                  </h3>
                  <span className="text-sm font-medium bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    {image.artist}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-serif line-clamp-2">{image.description}</p>
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-700 rounded-full"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={openInfoModal}
            variant="outline"
            size="lg"
            className="group border-2 border-pink-600 dark:border-pink-400 text-pink-600 dark:text-pink-400 hover:bg-pink-600 dark:hover:bg-pink-400 hover:text-white px-10 py-6 text-xl font-medium rounded-full transition-all duration-500 bg-transparent hover:shadow-2xl hover:shadow-pink-500/30"
          >
            More Information
            <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-180 transition-transform duration-700" />
          </Button>
        </div>
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-500"
          onClick={closeImageModal}
        >
          <div 
            className="relative max-w-4xl max-h-full w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 text-white hover:text-pink-300 bg-gray-900/50 backdrop-blur-sm rounded-full p-3 z-50 transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateImage('prev')
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-pink-300 bg-gray-900/50 backdrop-blur-sm rounded-full p-3 z-50 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateImage('next')
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-pink-300 bg-gray-900/50 backdrop-blur-sm rounded-full p-3 z-50 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="relative">
                <div className="w-full h-[60vh] bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className="w-full h-full object-contain p-4"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      const fallback = fallbackImages.find(fb => fb.id === selectedImage.id)
                      if (fallback && target.src !== fallback.src) {
                        target.src = fallback.src
                      }
                    }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/90 via-gray-900/70 to-transparent p-6">
                  <h3 className="text-3xl font-bold font-sans text-white mb-2">
                    {selectedImage.title}
                  </h3>
                  <p className="text-pink-300/90 font-medium">{selectedImage.artist}</p>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-gray-700 dark:text-gray-300 font-serif text-lg mb-6">
                  {selectedImage.description}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-2 w-2 bg-pink-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {currentImages.findIndex(img => img.id === selectedImage.id) + 1} of {currentImages.length}
                    </span>
                    <span className="hidden sm:inline text-xs text-gray-500 dark:text-gray-500">
                      (Use ← → arrows or ESC to close)
                    </span>
                  </div>
                  <Button
                    onClick={closeImageModal}
                    className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 rounded-full px-6 py-3 text-white"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isInfoModalOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-500"
          onClick={closeInfoModal}
        >
          <div 
            className="bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 rounded-3xl max-w-md w-full p-6 md:p-8 relative overflow-hidden border border-gray-200 dark:border-gray-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>

            <button
              onClick={closeInfoModal}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-full p-2 transition-colors shadow-md"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-6">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-pink-600 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                About Me
              </h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-xl mb-2">
                  It will be a complete pleasure to work with you and your project!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">¡Será un completo placer trabajar contigo y tu proyecto!</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-xl mb-2">Specialty</h3>
                <p className="text-gray-600 dark:text-gray-400">I'm a graphic designer and a software engineer</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-xl mb-2">Contact</h3>
                <p className="text-gray-600 dark:text-gray-400">+58-422-2306142</p>
                <p className="text-gray-600 dark:text-gray-400">English - Spanish - Portuguese</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-xl mb-2">Bio</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  I have more than 6 years working in professional graphic design areas, and with my
                  software engineer career (2018-2025) I offer the perfect design for modern software.
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                onClick={closeInfoModal}
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 px-8 py-3 rounded-full text-white shadow-md hover:shadow-lg"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}