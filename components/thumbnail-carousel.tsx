"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, Sparkles, MoveRight } from "lucide-react"

const thumbnailImages = [
  {
    id: 1,
    src: "/downgallery1.webp",
    title: "The Gym WebSite",
    details: "Flyer for the website of VitalFit gym, you can see more here: https://gym-page.onrender.com/",
  },
  {
    id: 2,
    src: "/downgallery2.webp",
    title: "Natural Strawberry Jam",
    details: "Non-Oficial flyer for the existent brand Smuckers. Personal practice.",
  },
  {
    id: 3,
    src: "/downgallery3.webp",
    title: "The Afrodita interview",
    details: "Instagram mockup for the showcase of the new Afrodita logo shop. Afrodita is a new adult shop who want they brand as a 'sensual and funny'. Want give to their public a new experience in each product.",
  },
  {
    id: 4,
    src: "/downgallery4.webp",
    title: "Womans Portraits",
    details: "An non-oficial sketch for a magazine from Vogue, personal practice with the magazine structure.",
  },
  {
    id: 5,
    src: "/downgallery5.webp",
    title: "The true pleasure",
    details: "Principal piece from the new branding on Wibeam wine.",
  },
  {
    id: 6,
    src: "/downgallery6.webp",
    title: "A new special move",
    details: "An non-oficial flyer from the Honkai Star Rail game, sketch-concept for a new drink",
  },
  {
    id: 7,
    src: "/downgallery7.webp",
    title: "Try the new Pink Label",
    details: "Non-oficial logo for the new brand: Pink Label; sketch-concept from the Calliope Mori public figure.",
  },
  {
    id: 8,
    src: "/downgallery8.webp",
    title: "The modern pleasure",
    details: "Flyer for the liquor store Pin8, they want elegance in the each piece of marketing.",
  },
]

export function ThumbnailCarousel() {
  const [selectedImage, setSelectedImage] = useState<(typeof thumbnailImages)[0] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const openLightbox = (image: (typeof thumbnailImages)[0]) => {
    setSelectedImage(image)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction: "prev" | "next") => {
    if (!selectedImage) return

    const currentIndex = thumbnailImages.findIndex((img) => img.id === selectedImage.id)
    let newIndex

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : thumbnailImages.length - 1
    } else {
      newIndex = currentIndex < thumbnailImages.length - 1 ? currentIndex + 1 : 0
    }

    setSelectedImage(thumbnailImages[newIndex])
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current && !isDragging) {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % thumbnailImages.length
          if (containerRef.current) {
            containerRef.current.scrollTo({
              left: nextIndex * 272,
              behavior: "smooth",
            })
          }
          return nextIndex
        })
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [isDragging])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0))
    setScrollLeft(containerRef.current?.scrollLeft || 0)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    e.preventDefault()
    const x = e.pageX - (containerRef.current.offsetLeft || 0)
    const walk = (x - startX) * 2
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <>
      <section className="py-20 bg-gradient-to-t from-background to-muted/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center space-x-4 mb-6">
              <div className="h-1 w-12 bg-gradient-to-r from-transparent to-primary rounded-full"></div>
              <h2 className="text-4xl md:text-5xl font-bold font-sans text-foreground">
                Portfolio Highlights
              </h2>
              <div className="h-1 w-12 bg-gradient-to-l from-transparent to-accent rounded-full"></div>
            </div>
            <p className="text-lg text-muted-foreground font-serif max-w-2xl mx-auto">
              Browse through the best pieces from my work. Each project is a unique blend of creativity and
              technology.
            </p>
          </div>

          <div className="relative">
            <div
              ref={containerRef}
              className="flex space-x-6 overflow-x-auto pb-8 scrollbar-hide"
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              style={{ cursor: isDragging ? "grabbing" : "grab" }}
            >
              {thumbnailImages.map((image, index) => (
                <div
                  key={image.id}
                  className="flex-shrink-0 w-64 transform transition-all duration-500 hover:scale-105"
                >
                  <Card
                    className="group relative cursor-pointer border-2 border-transparent hover:border-primary/50 overflow-hidden rounded-2xl shadow-2xl shadow-black/10"
                    onClick={() => openLightbox(image)}
                  >
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <img
                        src={image.src || "/placeholder.svg"}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 z-20">
                        <div className="bg-background/80 backdrop-blur-sm rounded-full p-2 transform translate-x-4 group-hover:translate-x-0 transition-transform duration-500">
                          <Sparkles className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold font-sans text-foreground group-hover:text-primary transition-colors text-lg">
                        {image.title}
                      </h3>
                      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-primary to-accent transition-all duration-700"></div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8 space-x-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => {
                  if (containerRef.current) {
                    containerRef.current.scrollBy({ left: -272, behavior: "smooth" })
                  }
                }}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => {
                  if (containerRef.current) {
                    containerRef.current.scrollBy({ left: 272, behavior: "smooth" })
                  }
                }}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              variant="ghost"
              className="group text-primary hover:text-primary-foreground hover:bg-primary text-lg font-medium"
            >
              
            </Button>
          </div>
        </div>
      </section>

      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-500">
          <div className="relative max-w-4xl max-h-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white hover:text-primary bg-background/20 backdrop-blur-sm rounded-full"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary bg-background/20 backdrop-blur-sm rounded-full"
              onClick={() => navigateImage("prev")}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary bg-background/20 backdrop-blur-sm rounded-full"
              onClick={() => navigateImage("next")}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            <div className="bg-gradient-to-br from-background to-card rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative">
                <img
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.title}
                  className="w-full max-h-[60vh] object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <h3 className="text-3xl font-bold font-sans text-white">{selectedImage.title}</h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-muted-foreground font-serif text-lg">{selectedImage.details}</p>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-sm text-muted-foreground">
                      {thumbnailImages.findIndex((img) => img.id === selectedImage.id) + 1} of{" "}
                      {thumbnailImages.length}
                    </span>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary"
                    onClick={closeLightbox}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}