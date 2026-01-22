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

    const timeouts: NodeJS.Timeout[] = []

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
      <footer id="contact" className="bg-gradient-to-b from-muted/50 to-background py-16 relative overflow-hidden">
        <GlowEffect position="bottom" intensity="light" color="primary" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent animate-spin-slow"></div>
                <div className="text-3xl font-bold font-sans bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Martínez
                </div>
              </div>
              <p className="text-muted-foreground font-serif mb-6">
                Crafting digital experiences that blend creativity with technology. Let's build something
                amazing together.
              </p>
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">+58-422-2306142</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold font-sans text-foreground mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#home"
                    className="text-muted-foreground hover:text-primary transition-colors font-medium"
                  >
                    Home
                </a>
                </li>
                <li>
                  <a
                    href="#gallery"
                    className="text-muted-foreground hover:text-primary transition-colors font-medium"
                  >
                    Gallery
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-muted-foreground hover:text-primary transition-colors font-medium"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold font-sans text-foreground mb-6">Get In Touch</h3>
              <p className="text-muted-foreground mb-4">
                Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
              </p>
              <Button
                onClick={openContactModal}
                className="group w-full bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-primary-foreground px-8 py-6 text-lg font-medium rounded-full transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/40"
              >
                <MessageSquare className="mr-3 h-5 w-5" />
                Send Me a Message
                <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <p className="text-muted-foreground">Based in Venezuela, working worldwide</p>
            </div>
            <p className="text-muted-foreground text-sm font-serif flex items-center justify-center">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500 animate-pulse" /> by Martínez (SW). All
              rights reserved. © 2025
            </p>
          </div>
        </div>
      </footer>

      {isContactModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-500">
          <div className="bg-gradient-to-br from-background to-card rounded-2xl max-w-lg w-full p-8 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>

            <button
              onClick={closeContactModal}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 bg-background/50 backdrop-blur-sm rounded-full p-2 z-50"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-8">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Contact Me
              </h2>
              <p className="text-muted-foreground mt-2">
                Send me a message directly to my email. I usually reply within 24 hours.
              </p>
            </div>

            {submitStatus === "success" ? (
              <div className="text-center py-4">
                <ChecklistAnimation />
                <div className="mt-8">
                  <Button
                    onClick={closeContactModal}
                    className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
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
                <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <X className="h-10 w-10 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-red-600 mb-2">Error Sending Message</h3>
                <p className="text-muted-foreground">
                  There was an error sending your message. Please try again or contact me directly at:
                  <br />
                  <span className="font-medium">+58-422-2306142</span>
                </p>
                <Button
                  onClick={() => setSubmitStatus("idle")}
                  className="mt-6 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary px-8 py-3 rounded-full"
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
                      className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
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
                      className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
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
                      className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
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
                      className="w-full px-4 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-primary-foreground py-6 text-lg font-medium rounded-full transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
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