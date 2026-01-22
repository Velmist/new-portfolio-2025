"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, ExternalLink, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"

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

interface CherryBlossomLeafProps {
  delay: number
  duration: number
  left: number
  size: number
}

function CherryBlossomLeaf({ delay, duration, left, size }: CherryBlossomLeafProps) {
  const animationName = `fall-${Math.random().toString(36).substr(2, 9)}`
  
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
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/70 to-rose-300/70 rounded-full transform rotate-45"></div>
        <div className="absolute inset-1 bg-gradient-to-br from-pink-100/50 to-rose-200/50 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 bg-white/40 rounded-full"></div>
      </div>
    </div>
  )
}

export function ImageExhibition() {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<(typeof exhibitionImages)[0] | null>(null)
  const [leaves, setLeaves] = useState<Array<{id: number, delay: number, duration: number, left: number, size: number}>>([])
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

    const currentIndex = exhibitionImages.findIndex(img => img.id === selectedImage.id)
    let newIndex

    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : exhibitionImages.length - 1
    } else {
      newIndex = currentIndex < exhibitionImages.length - 1 ? currentIndex + 1 : 0
    }

    setSelectedImage(exhibitionImages[newIndex])
  }

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
  }, [selectedImage, isInfoModalOpen])

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
      className="py-20 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 z-0"></div>
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

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            <h2 className="text-4xl md:text-6xl font-bold font-sans text-foreground">
              Featured Exhibition
            </h2>
            <Sparkles className="h-6 w-6 text-accent animate-pulse" />
          </div>
          <p className="text-xl text-muted-foreground font-serif max-w-2xl mx-auto">
            Discover my most relevant works and project in this gallery, I select the best only for you!.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {exhibitionImages.map((image) => (
            <Card
              key={image.id}
              className="group relative overflow-hidden bg-card border-2 border-transparent hover:border-primary/50 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-primary/20 rounded-3xl"
              onMouseEnter={() => setHoveredImage(image.id)}
              onMouseLeave={() => setHoveredImage(null)}
              onClick={() => openImageModal(image)}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-3xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="bg-background/80 backdrop-blur-sm rounded-full p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <ExternalLink className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold font-sans text-foreground mb-2 group-hover:text-primary transition-colors">
                  {image.title}
                </h3>
                <p className="text-sm text-primary font-medium mb-2">{image.artist}</p>
                <p className="text-sm text-muted-foreground font-serif">{image.description}</p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-primary to-accent transition-all duration-700"></div>
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
            className="group border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-10 py-6 text-xl font-medium rounded-full transition-all duration-500 bg-transparent hover:shadow-2xl hover:shadow-primary/30"
          >
            More Information
            <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-180 transition-transform duration-700" />
          </Button>
        </div>
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-500"
          onClick={closeImageModal}
        >
          <div 
            className="relative max-w-4xl max-h-full w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 text-white hover:text-primary bg-background/20 backdrop-blur-sm rounded-full p-3 z-50 transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateImage('prev')
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary bg-background/20 backdrop-blur-sm rounded-full p-3 z-50 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateImage('next')
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary bg-background/20 backdrop-blur-sm rounded-full p-3 z-50 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            <div className="bg-gradient-to-br from-background to-card rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative">
                <img
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[60vh] object-contain bg-black/5"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6">
                  <h3 className="text-3xl font-bold font-sans text-white mb-2">
                    {selectedImage.title}
                  </h3>
                  <p className="text-primary/90 font-medium">{selectedImage.artist}</p>
                </div>
              </div>
              <div className="p-8">
                <p className="text-muted-foreground font-serif text-lg mb-6">
                  {selectedImage.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-sm text-muted-foreground">
                      {exhibitionImages.findIndex(img => img.id === selectedImage.id) + 1} of {exhibitionImages.length}
                    </span>
                    <span className="text-xs text-muted-foreground opacity-70">
                      (Use ← → arrows or ESC to close)
                    </span>
                  </div>
                  <Button
                    onClick={closeImageModal}
                    className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary rounded-full px-6"
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
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-500"
          onClick={closeInfoModal}
        >
          <div 
            className="bg-gradient-to-br from-background to-card rounded-3xl max-w-md w-full p-8 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>

            <button
              onClick={closeInfoModal}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 bg-background/50 backdrop-blur-sm rounded-full p-2 transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
              About Me
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground text-xl mb-2">
                  It will be a complete pleasure work with you and your project!
                </h3>
                <p className="text-muted-foreground">¡Será un completo placer trabajar contigo y tu proyecto!</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-xl mb-2">Specialty</h3>
                <p className="text-muted-foreground">I'm a graphic designer and a software engineer</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-xl mb-2">Contact</h3>
                <p className="text-muted-foreground">+58-422-2306142</p>
                <p className="text-muted-foreground">English-Spanish-Portuguese</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-xl mb-2">Bio</h3>
                <p className="text-muted-foreground">
                  I have more than a 6 years working in professional graphic design areas, and with my
                  software engineer career (2018-2025) I offer the perfect design for modern software.
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                onClick={closeInfoModal}
                className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary px-8 py-3 rounded-full"
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