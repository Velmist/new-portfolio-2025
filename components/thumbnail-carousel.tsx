"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const thumbnailImages = [
  {
    id: 1,
    src: "/professional-headshot.png",
    title: "The Gym WebSite",
    details: "Flyer for the website of VitalFit gym, you can see more here: https://gym-page.onrender.com/",
  },
  {
    id: 2,
    src: "/placeholder-4wu0g.png",
    title: "Natural Strawberry Jam",
    details: "Non-Oficial flyer for the existent brand Smuckers",
  },
  {
    id: 3,
    src: "/placeholder-veq1p.png",
    title: "The Afrodita interview",
    details: "Instagram mockup for the showcase of the new Afrodita logo shop.",
  },
  {
    id: 4,
    src: "/outdoor-family-portrait.png",
    title: "Womans Portraits",
    details: "An non-oficial sketch for a magazine from Vogue",
  },
  {
    id: 5,
    src: "/artistic-black-and-white-photography.png",
    title: "The Great Donut",
    details: "Mockup bag for the new brand design Donus Delight",
  },
  {
    id: 6,
    src: "/placeholder-zva25.png",
    title: "A new special move",
    details: "An non-oficial flyer from the Honkai Star Rail game, sketch-concept for a new drink",
  },
  {
    id: 7,
    src: "/placeholder-4ovta.png",
    title: "Try the new suit, try the Pink Label",
    details: "Non-oficial logo for the new brand: Pink Label; sketch-concept from the Calliope Mori public figure.",
  },
  {
    id: 8,
    src: "/placeholder-sdjek.png",
    title: "The modern pleasure",
    details: "Flyer for the liquor store Pin8",
  },
]

export function ThumbnailCarousel() {
  const [selectedImage, setSelectedImage] = useState<(typeof thumbnailImages)[0] | null>(null)

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

  return (
    <>
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-sans text-foreground mb-4">Portfolio Highlights</h2>
            <p className="text-lg text-muted-foreground font-serif">
              Browse through the best pieces from my work.
            </p>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-4 min-w-max">
              {thumbnailImages.map((image) => (
                <Card
                  key={image.id}
                  className="flex-shrink-0 w-64 cursor-pointer group border-2 border-transparent hover:border-primary transition-all duration-300 overflow-hidden"
                  onClick={() => openLightbox(image)}
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold font-sans text-foreground group-hover:text-primary transition-colors">
                      {image.title}
                    </h3>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white hover:text-primary"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary"
              onClick={() => navigateImage("prev")}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary"
              onClick={() => navigateImage("next")}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            <div className="bg-background rounded-lg overflow-hidden">
              <img
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.title}
                className="w-full max-h-[70vh] object-contain"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold font-sans text-foreground mb-2">{selectedImage.title}</h3>
                <p className="text-muted-foreground font-serif">{selectedImage.details}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
