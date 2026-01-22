"use client"

import { Mail, Phone, MapPin, Heart, MessageSquare, Send, User, X, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { GlowEffect } from "@/components/GlowEffect"

function ChecklistAnimation() {
  const [checkedItems, setCheckedItems] = useState([false, false, false, false])
  const [currentStep, setCurrentStep] = useState(0)
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    const steps = [
      { item: 0, delay: 300 },
      { item: 1, delay: 600 },
      { item: 2, delay: 900 },
      { item: 3, delay: 1200 },
      { item: 0, delay: 1800 },
      { item: 1, delay: 2100 },
      { item: 2, delay: 2400 },
      { item: 3, delay: 2700 },
    ]

    const timeouts: ReturnType<typeof setTimeout>[] = []

    steps.forEach((step, index) => {
      const timeout = setTimeout(() => {
        if (index < 4) {
          setCheckedItems(prev => {
            const newItems = [...prev]
            newItems[step.item] = true
            return newItems
          })
        } else {
          setCheckedItems(prev => {
            const newItems = [...prev]
            newItems[step.item] = false
            setTimeout(() => {
              newItems[step.item] = true
              setCheckedItems([...newItems])
            }, 50)
            return newItems
          })
        }

        setCurrentStep(step.item)

        if (index === steps.length - 1) {
          setTimeout(() => {
            setAnimationComplete(true)
          }, 500)
        }
      }, step.delay)

      timeouts.push(timeout)
    })

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout))
    }
  }, [])

  const checklistItems = [
    { text: "Message received", color: "from-pink-400/80 to-rose-400/80" },
    { text: "Processing content", color: "from-pink-500/80 to-rose-500/80" },
    { text: "Validating information", color: "from-rose-500/80 to-pink-600/80" },
    { text: "Sending to Us!", color: "from-pink-600/80 to-rose-600/80" },
  ]

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/10 to-rose-50/5 rounded-2xl border border-pink-200/20 pencil-texture" />
      
      <div className="relative p-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-pink-200/30 to-rose-200/30 mb-3 border border-pink-300/20">
            <svg className="w-7 h-7 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Message Sent!
          </h3>
          <p className="text-pink-500/70 mt-1 text-sm">Your message is on its way</p>
        </div>

        <div className="space-y-4">
          {checklistItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-3"
              style={{
                opacity: checkedItems[index] ? 1 : 0.6,
              }}
            >
              <div className="relative">
                <div className={`w-7 h-7 rounded-full border-2 transition-all duration-300 ${
                  checkedItems[index]
                    ? `border-transparent bg-gradient-to-br ${item.color}`
                    : 'border-pink-300/40 bg-pink-50/10'
                }`} />
                
                {checkedItems[index] && (
                  <>
                    <svg
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                        className="animate-drawCheck"
                      />
                    </svg>

                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                  </>
                )}

                {currentStep === index && !animationComplete && (
                  <div className="absolute -top-1 -right-1">
                    <div className="relative">
                      <div className="absolute inset-0 bg-pink-400/50 rounded-full animate-ping" />
                      <div className="relative w-2 h-2 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full" />
                    </div>
                  </div>
                )}
              </div>

              <span className={`text-sm font-medium transition-all duration-300 ${
                checkedItems[index]
                  ? `bg-gradient-to-r ${item.color} bg-clip-text text-transparent`
                  : 'text-pink-400/40'
              }`}>
                {item.text}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 h-1 bg-pink-100/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-400/50 via-rose-500/50 to-pink-600/50 rounded-full transition-all duration-1000"
            style={{
              width: animationComplete ? '100%' : `${(currentStep + 1) * 25}%`,
            }}
          />
        </div>

        {animationComplete && (
          <div className="mt-4 text-center animate-in fade-in duration-500">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-50/20 to-rose-50/10 rounded-full px-4 py-2 border border-pink-200/20">
              <Sparkles className="h-3 w-3 text-pink-500" />
              <span className="text-xs font-medium bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Ready for the next masterpiece!
              </span>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .pencil-texture {
          background-image: 
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 1px,
              rgba(236, 72, 153, 0.03) 1px,
              rgba(236, 72, 153, 0.03) 2px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 1px,
              rgba(244, 114, 182, 0.02) 1px,
              rgba(244, 114, 182, 0.02) 2px
            );
        }

        @keyframes drawCheck {
          0% {
            stroke-dasharray: 24;
            stroke-dashoffset: 24;
          }
          100% {
            stroke-dasharray: 24;
            stroke-dashoffset: 0;
          }
        }

        .animate-drawCheck {
          animation: drawCheck 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export function GalleryFooter() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const openContactModal = () => setIsContactModalOpen(true)
  const closeContactModal = () => {
    setIsContactModalOpen(false)
    setSubmitStatus("idle")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch("https://formspree.io/f/mreevpqd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
          _subject: `Nuevo mensaje de ${formData.name}: ${formData.subject}`
        })
      })

      if (response.ok) {
        setSubmitStatus("success")
      } else {
        throw new Error("Error en el envío")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <>
      <footer id="contact" className="relative bg-gradient-to-b from-background via-pink-50/20 to-background dark:via-pink-950/10 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-purple-500/5" />
        
        <GlowEffect 
          position="bottom" 
          intensity="medium" 
          color="pink" 
          className="opacity-40"
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-14">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 animate-spin-slow flex items-center justify-center shadow-lg shadow-pink-500/20">
                  <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center">
                    <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">M</span>
                  </div>
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Martínez Ordaz
                </div>
              </div>
              
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md font-serif">
                Crafting digital experiences that blend creativity with technology. 
                Let's build something amazing together.
              </p>
              
              <div className="flex items-center gap-5 p-5 bg-gradient-to-r from-pink-50/50 to-purple-50/50 dark:from-pink-950/20 dark:to-purple-950/20 rounded-2xl border border-pink-200/30 dark:border-pink-800/30 backdrop-blur-sm">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-pink-500/30">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Phone</p>
                  <p className="text-xl font-semibold text-foreground">+58-422-2306142</p>
                </div>
              </div>
            </div>
            
            <div className="lg:pl-10">
              <h3 className="text-2xl font-bold mb-10 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent font-sans">
                Quick Links
              </h3>
              <ul className="space-y-6">
                {['Home', 'Gallery', 'Contact'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="group flex items-center gap-4 text-lg text-muted-foreground hover:text-foreground transition-all duration-300"
                    >
                      <div className="h-2 w-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative">
                        {item}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 group-hover:w-full transition-all duration-300" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="lg:pl-10">
              <h3 className="text-2xl font-bold mb-10 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent font-sans">
                Get In Touch
              </h3>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
              </p>
              <Button
                onClick={openContactModal}
                className="group w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-7 text-lg font-semibold rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-pink-500/30 border border-pink-500/20"
              >
                <MessageSquare className="mr-3 h-6 w-6" />
                Send Me a Message
                <Send className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </div>
          </div>
          
          <div className="mt-20 pt-10 border-t-0 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-11/12 h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-10">
              <div className="flex items-center gap-3 bg-gradient-to-r from-pink-50/30 to-purple-50/30 dark:from-pink-950/20 dark:to-purple-950/20 px-5 py-3 rounded-full">
                <MapPin className="h-5 w-5 text-pink-500" />
                <p className="text-muted-foreground font-medium">Based in Venezuela, working worldwide</p>
              </div>
              <p className="text-muted-foreground flex items-center gap-2 text-center">
                <span className="flex items-center">
                  Made with <Heart className="h-4 w-4 text-red-500 animate-pulse mx-1" /> 
                  by Martínez Ordaz (SW)
                </span>
                <span className="hidden md:inline">•</span>
                <span>All rights reserved. © 2025</span>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {isContactModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-500">
         <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 rounded-2xl max-w-lg w-full p-6 md:p-8 relative overflow-hidden border border-gray-200 dark:border-gray-700 shadow-2xl">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
            <button
              onClick={closeContactModal}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-full p-2 transition-colors shadow-md"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-8">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-pink-600 to-purple-600 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-pink-500/30">
                <MessageSquare className="h-9 w-9 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Contact Me
              </h2>
              <p className="text-muted-foreground mt-3 max-w-sm mx-auto">
                Send me a message directly to my email. I usually reply within 24 hours.
              </p>
            </div>

            {submitStatus === "success" ? (
              <div className="text-center py-4">
                <ChecklistAnimation />
                <div className="mt-8">
                  <Button
                    onClick={closeContactModal}
                    className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-pink-500/30 text-lg"
                  >
                    Back to Portfolio
                  </Button>
                  <p className="text-xs text-muted-foreground mt-4">
                    I'll get back to you within 24 hours
                  </p>
                </div>
              </div>
            ) : submitStatus === "error" ? (
              <div className="text-center py-8">
                <div className="h-20 w-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
                  <X className="h-10 w-10 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">Error Sending Message</h3>
                <p className="text-muted-foreground mb-6">
                  There was an error sending your message. Please try again or contact me directly at:
                  <br />
                  <span className="font-medium text-foreground">+58-422-2306142</span>
                </p>
                <Button
                  onClick={() => setSubmitStatus("idle")}
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 px-8 py-4 rounded-full"
                >
                  Try Again
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      className="w-full pl-12 pr-4 py-4 rounded-full border border-border bg-background/80 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      className="w-full pl-12 pr-4 py-4 rounded-full border border-border bg-background/80 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      className="w-full pl-12 pr-4 py-4 rounded-full border border-border bg-background/80 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="relative">
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows={4}
                      className="w-full px-4 py-4 rounded-2xl border border-border bg-background/80 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none transition-all duration-300"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group bg-gradient-to-r from-pink-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white py-6 text-lg font-semibold rounded-full transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-pink-500/30 disabled:opacity-50 disabled:cursor-not-allowed border border-pink-500/20"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-6 w-6 animate-spin rounded-full border-3 border-white border-t-transparent mr-3"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center pt-2">
                  By submitting this form, you agree to receive a response directly to your email.
                  No spam, guaranteed.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}