"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X } from 'lucide-react';

const exhibitionImages = [
  {
    id: 1,
    src: "/placeholder-srz6z.png",
    title: "Wine Elegance",
    artist: "Brand Designed",
    description: "A mockup for a designed brand, Wibeam",
  },
  {
    id: 2,
    src: "/placeholder-ddryp.png",
    title: "Del Mar MiniMarket",
    artist: "Brand Designed",
    description: "A market from the natural sea, mockup designed for the brand",
  },
  {
    id: 3,
    src: "/placeholder-ad1ff.png",
    title: "Vital Fit App",
    artist: "Mockup Design",
    description: "A mockup for an android app for the Vital Fit Gym Brand",
  },
  {
    id: 4,
    src: "/placeholder-rckxe.png",
    title: "Best food in town",
    artist: "Poster Design",
    description: "A mockup designed for a poster from Japanese Food brand.",
  },
  {
    id: 5,
    src: "/placeholder-ozkav.png",
    title: "Ecological Energy",
    artist: "Mockup Design",
    description: "Uniform mockup for the brand EcoEnergy.",
  },
  {
    id: 6,
    src: "/placeholder-0wb65.png",
    title: "Your own natural Beauty",
    artist: "Flyer Design",
    description: "Mockup poster for a flyer design",
  },
]

export function ImageExhibition() {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-sans text-foreground mb-4">Featured Exhibition</h2>
          <p className="text-xl text-muted-foreground font-serif max-w-2xl mx-auto">
            Discover my most relevant works and project in this gallery, i select the best only for you!.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {exhibitionImages.map((image) => (
            <Card
              key={image.id}
              className="group relative overflow-hidden bg-card border-border hover:shadow-xl transition-all duration-500 cursor-pointer"
              onMouseEnter={() => setHoveredImage(image.id)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
                    hoveredImage === image.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold font-sans mb-2">{image.title}</h3>
                    <p className="text-sm text-primary font-medium mb-2">{image.artist}</p>
                    <p className="text-sm opacity-90 font-serif">{image.description}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={openModal}
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 font-medium transition-all duration-300 bg-transparent"
          >
            More Information
          </Button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">About Me</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700">It will be a complete pleasure work with you and your project! </h3>
                  <p className="text-gray-600">¡Será un completo placer trabajar contigo y tu proyecto!</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Specialty</h3>
                  <p className="text-gray-600">Im a graphic designer and a software engineer</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Contact</h3>
                  <p className="text-gray-600">+58-4163226508</p>
                  <p className="text-gray-600">English-Spanish-Portuguese</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Bio</h3>
                  <p className="text-gray-600">
                    I have more than a 6 years working in professional graphic design areas, and with my software engineer carrer (2018-2025) i offer the perfect design for modern software.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button 
                  onClick={closeModal}
                  className="bg-primary hover:bg-primary-dark"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}