import { GalleryHeader } from "@/components/gallery-header"
import { HeroSection } from "@/components/hero-section"
import { ImageExhibition } from "@/components/image-exhibition"
import { ThumbnailCarousel } from "@/components/thumbnail-carousel"
import { GalleryFooter } from "@/components/gallery-footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <GalleryHeader />
      <HeroSection />
      <ImageExhibition />
      <ThumbnailCarousel />
      <GalleryFooter />
    </main>
  )
}
