"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'

export function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/placeholder-tkke2.png')`,
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold font-sans mb-6 leading-tight">
            Graphic Design,
            <br />
            <span className="text-primary">Web Development</span>
          </h1>
          <p className="text-xl md:text-2xl font-serif mb-8 opacity-90 max-w-2xl mx-auto">
            Experience the art of professional software and graphic design. Welcome to my portfolio.
          </p>
          <Button
            onClick={openModal}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105"
          >
            About Me 
          </Button>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-8 relative">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome to My Portfolio</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-700 text-xl mb-2">About My Work</h3>
                <p className="text-gray-600">
                  I specialize in creating visually stunning designs and functional web experiences. 
                  My work combines aesthetic appeal with technical excellence to deliver results that 
                  exceed expectations. Feel free to contact me, more information below!
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 text-xl mb-2">Services</h3>
                <ul className="text-gray-600 list-disc pl-5 space-y-2">
                  <li>Brand Identity Design</li>
                  <li>Web Development</li>
                  <li>UI/UX Design</li>
                  <li>Digital Marketing Materials</li>
                  <li>App Interface Design</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 text-xl mb-2">My Approach</h3>
                <p className="text-gray-600">
                  I believe in creating designs that not only look beautiful but also serve their purpose 
                  effectively. Every project is approached with careful attention to detail and a focus on 
                  delivering the best possible user experience.
                </p>
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <Button 
                onClick={closeModal}
                className="bg-primary hover:bg-primary-dark px-6 py-3"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}