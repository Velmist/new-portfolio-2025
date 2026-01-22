"use client"

import { HeroSection } from "@/components/hero-section"
import { GalleryHeader } from "@/components/gallery-header"
import { ImageExhibition } from "@/components/image-exhibition"
import { GalleryFooter } from "@/components/gallery-footer"
import { SplashScreen } from "@/components/SplashScreen"
import { useState, useEffect } from "react"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      <SplashScreen 
        duration={2500} 
        onLoadingComplete={handleLoadingComplete}
      />
      
      <div className={`min-h-screen bg-background transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <GalleryHeader />
        <main>
          <HeroSection />
          <ImageExhibition />
        </main>
        <GalleryFooter />
      </div>
    </>
  )
}