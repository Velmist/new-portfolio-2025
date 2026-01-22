"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { 
  X, Sparkles, ArrowRight, Code, Server, Database, Terminal, Cpu, Palette, 
  GitBranch, Cloud, Laptop, Type, FileCode, Coffee, Wind, 
  LayoutTemplate, Square, Image, PenTool, Box, Container, Flame, Globe,
  Circle, Smartphone, Monitor, Braces, SquareCode, Zap, ChevronLeft, ChevronRight
} from "lucide-react"

export function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

  const carouselImages = [
    {
      url: "/carrousel1.webp",
      title: "Creative"
    },
    {
      url: "/carrousel2.webp", 
      title: "Innovative"
    },
    {
      url: "/carrousel3.webp",
      title: "Modern"
    }
  ]

 
  const words = ["Creative", "Innovative", "Modern", "Stunning", "Dynamic", "Beautiful"]

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const openProjectsModal = () => setIsProjectsModalOpen(true)
  const closeProjectsModal = () => setIsProjectsModalOpen(false)


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [carouselImages.length])

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % words.length
      const fullWord = words[i]

      setDisplayText(isDeleting 
        ? fullWord.substring(0, displayText.length - 1)
        : fullWord.substring(0, displayText.length + 1)
      )

      setTypingSpeed(isDeleting ? 50 : 150)

      if (!isDeleting && displayText === fullWord) {
        setTimeout(() => setIsDeleting(true), 1000)
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }
    }

    const timer = setTimeout(() => {
      handleTyping()
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, loopNum, typingSpeed])

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    )
  }

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
      script.onload = () => {
        // @ts-ignore
        if (window.particlesJS) {
          // @ts-ignore
          window.particlesJS("particles-js", {
            particles: {
              number: { value: 80, density: { enable: true, value_area: 800 } },
              color: { value: "#f472b6" },
              shape: { type: "circle" },
              opacity: { value: 0.5, random: true },
              size: { value: 3, random: true },
              line_linked: {
                enable: true,
                distance: 150,
                color: "#c084fc",
                width: 1,
              },
              move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
              },
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true,
              },
            },
            retina_detect: true,
          })
        }
      }
      document.body.appendChild(script)
      return () => {
        document.body.removeChild(script)
      }
    }
  }, [])

  const programmingLanguages = [
    { name: "C", icon: <Code className="h-6 w-6" />, level: 90, description: "System programming, Algorithms" },
    { name: "Java", icon: <Coffee className="h-6 w-6" />, level: 85, description: "Enterprise applications, Android" },
    { name: "Python", icon: <FileCode className="h-6 w-6" />, level: 80, description: "Data analysis, Automation" },
    { name: "TypeScript", icon: <Type className="h-6 w-6" />, level: 88, description: "React, Angular, Node.js" },
    { name: "JavaScript", icon: <Code className="h-6 w-6" />, level: 92, description: "Frontend, Full Stack" },
    { name: "Bash/Shell", icon: <Terminal className="h-5 w-5" />, level: 75, description: "Linux scripting, DevOps" },
  ]

  const frameworks = [
    { name: "React", icon: <Cpu className="h-6 w-6" />, level: 90 },
    { name: "Angular", icon: <Circle className="h-6 w-6" />, level: 80 },
    { name: "Next.js", icon: <Globe className="h-6 w-6" />, level: 85 },
    { name: "Node.js", icon: <Server className="h-6 w-6" />, level: 82 },
    { name: "Bootstrap", icon: <LayoutTemplate className="h-6 w-6" />, level: 88 },
    { name: "Tailwind CSS", icon: <Wind className="h-6 w-6" />, level: 95 },
  ]

  const operatingSystems = [
    { name: "Linux", icon: <Terminal className="h-6 w-6" />, level: 85 },
    { name: "Windows", icon: <Monitor className="h-6 w-6" />, level: 90 },
    { name: "macOS", icon: <Laptop className="h-6 w-6" />, level: 70 },
    { name: "Android", icon: <Smartphone className="h-6 w-6" />, level: 80 },
  ]

  const designTools = [
    { name: "Figma", icon: <Square className="h-6 w-6" />, level: 88 },
    { name: "Photoshop", icon: <Image className="h-6 w-6" />, level: 85 },
    { name: "Illustrator", icon: <PenTool className="h-6 w-6" />, level: 82 },
    { name: "Blender", icon: <Box className="h-6 w-6" />, level: 65 },
  ]

  const devOpsTools = [
    { name: "Git", icon: <GitBranch className="h-6 w-6" />, level: 88 },
    { name: "Docker", icon: <Container className="h-6 w-6" />, level: 75 },
    { name: "AWS", icon: <Cloud className="h-6 w-6" />, level: 70 },
    { name: "Firebase", icon: <Flame className="h-6 w-6" />, level: 78 },
  ]

  const databases = [
    { name: "PostgreSQL", icon: <Database className="h-6 w-6" />, level: 80 },
    { name: "MongoDB", icon: <Database className="h-6 w-6" />, level: 75 },
    { name: "MySQL", icon: <Database className="h-6 w-6" />, level: 82 },
  ]

  const ides = [
    { name: "VS Code", icon: <SquareCode className="h-6 w-6" />, level: 95 },
    { name: "IntelliJ IDEA", icon: <Braces className="h-6 w-6" />, level: 80 },
    { name: "Android Studio", icon: <Smartphone className="h-6 w-6" />, level: 75 },
  ]

  const experiences = [
    { 
      years: "6+", 
      title: "Graphic Design", 
      description: "Professional design experience",
      moreInfo: "I was worked on various design projects in several companies in the past years, including branding, web design, and print materials. My design approach focuses on clean aesthetics and effective communication."
    },
    { 
      years: "7+", 
      title: "Software Engineering", 
      description: "Since 2018 in my college, 3 years of professional experience",
      moreInfo: "My software engineering journey started in college. I have professional experience in full-stack development, working with technologies like React, Node.js, and cloud platforms."
    },
    { 
      years: "∞", 
      title: "Continuous Learning", 
      description: "Always updating skills",
      moreInfo: "I am constantly learning new technologies and design trends to stay ahead in the fast-paced tech industry. I believe in lifelong learning and regularly take online courses and attend workshops."
    },
  ]

  return (
    <>
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div id="particles-js" className="absolute inset-0 z-0"></div>

        <div className="absolute inset-0 overflow-hidden">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                transition: "transform 0.3s ease-out, opacity 1s ease-in-out"
              }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('${image.url}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background/50 to-accent/30"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 z-0"></div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? "bg-primary scale-125" 
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 hidden md:block"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 hidden md:block"
          aria-label="Siguiente imagen"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center space-x-2 bg-background/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8 animate-pulse">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Graphic Designer & Software Engineer</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-bold font-sans mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
              {displayText}
              <span className="ml-1 inline-block w-1 h-16 bg-primary animate-pulse align-middle"></span>
            </span>
            <br />
            <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-gradient">
              Digital Experiences
            </span>
          </h1>
          <p className="text-xl md:text-2xl font-serif mb-8 opacity-90 max-w-2xl mx-auto">
            Crafting visually stunning designs and functional web experiences that blend aesthetics with
            technical excellence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={openModal}
              size="lg"
              className="group bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-primary-foreground px-8 py-6 text-lg font-medium rounded-full transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/40"
            >
              About Me
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Button
              onClick={openProjectsModal}
              variant="outline"
              size="lg"
              className="group border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg font-medium rounded-full transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30"
            >
              View Projects & Skills
              <Laptop className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-500">
          <div className="bg-gradient-to-br from-background to-card rounded-2xl max-w-2xl w-full p-8 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>

            <button
              onClick={closeModal}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 bg-background/50 backdrop-blur-sm rounded-full p-2"
            >
              <X size={24} />
            </button>

            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
              Welcome to My Portfolio
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground text-xl mb-2 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-primary" />
                  About My Work
                </h3>
                <p className="text-muted-foreground">
                  I specialize in creating visually stunning designs and functional web experiences. My work
                  combines aesthetic appeal with technical excellence to deliver results that exceed
                  expectations. Feel free to contact me, more information below!
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-xl mb-2">Services</h3>
                <ul className="text-muted-foreground grid grid-cols-2 gap-2">
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-primary rounded-full mr-2"></div>
                    Brand Identity Design
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-primary rounded-full mr-2"></div>
                    Web Development
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-primary rounded-full mr-2"></div>
                    UI/UX Design
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-primary rounded-full mr-2"></div>
                    Digital Marketing Materials
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-primary rounded-full mr-2"></div>
                    App Interface Design
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-xl mb-2">My Approach</h3>
                <p className="text-muted-foreground">
                  I believe in creating designs that not only look beautiful but also serve their purpose
                  effectively. Every project is approached with careful attention to detail and a focus on
                  delivering the best possible user experience.
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                onClick={closeModal}
                className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary px-8 py-3 rounded-full"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {isProjectsModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-500">
          <div className="bg-gradient-to-br from-background to-card rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto p-8 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent/10 rounded-full blur-3xl"></div>

            <button
              onClick={closeProjectsModal}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 bg-background/50 backdrop-blur-sm rounded-full p-2 z-50"
            >
              <X size={24} />
            </button>

            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-8 text-center">
              My Skills & Experience
            </h2>

            <div className="mb-10">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <Sparkles className="h-6 w-6 mr-3 text-primary" />
                Years of Expertise
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="experience-card relative group min-h-[200px] cursor-pointer overflow-hidden rounded-xl"
                  >
                    <div className="experience-card__content absolute inset-0 bg-gradient-to-br from-card to-muted/30 rounded-xl border border-border group-hover:border-primary/50 transition-all duration-500 z-10 p-6">
                      <div className="experience-card__years text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2 transition-all duration-500 group-hover:translate-x-[-80px]">
                        {exp.years}
                      </div>
                      <h4 className="experience-card__title text-xl font-bold text-foreground mb-2 transition-all duration-500 group-hover:translate-x-[-80px]">
                        {exp.title}
                      </h4>
                      <p className="experience-card__description text-muted-foreground transition-all duration-500 group-hover:translate-x-[-80px]">
                        {exp.description}
                      </p>
                    </div>

                    <div className="experience-card__info absolute inset-0 opacity-0 transform translate-x-full group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-in-out bg-gradient-to-br from-primary/95 to-accent/95 text-white p-6 z-20">
                      <h4 className="text-xl font-bold mb-3 text-white">More Details</h4>
                      <p className="text-sm mb-4">{exp.moreInfo}</p>
                      <div className="flex items-center space-x-2 mt-4">
                        <div className="h-1 w-1 bg-white/60 rounded-full animate-pulse"></div>
                        <div className="h-1 w-1 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="h-1 w-1 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <Code className="h-6 w-6 mr-3 text-primary" />
                Programming Languages
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {programmingLanguages.map((lang, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-card to-muted/30 rounded-xl p-4 border border-border hover:border-primary/50 transition-all duration-300 group hover:scale-105"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
                        {lang.icon}
                      </div>
                      <h4 className="font-bold text-foreground mb-1">{lang.name}</h4>
                      <p className="text-xs text-muted-foreground mb-3">{lang.description}</p>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-700"
                          style={{ width: `${lang.level}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">{lang.level}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <Cpu className="h-6 w-6 mr-3 text-primary" />
                Frameworks & Libraries
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {frameworks.map((framework, index) => (
                  <div key={index} className="flex flex-col items-center p-4 rounded-lg bg-card/50 border border-border hover:border-primary/50 transition-colors">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                      {framework.icon}
                    </div>
                    <span className="font-medium text-center mb-2">{framework.name}</span>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                        style={{ width: `${framework.level}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">{framework.level}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <Server className="h-6 w-6 mr-3 text-primary" />
                Tools & Technologies
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-4 flex items-center">
                    <Terminal className="h-5 w-5 mr-2 text-primary" />
                    Operating Systems
                  </h4>
                  <div className="space-y-3">
                    {operatingSystems.map((os, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border hover:border-primary/30 transition-colors">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 text-primary">
                            {os.icon}
                          </div>
                          <span className="font-medium">{os.name}</span>
                        </div>
                        <div className="text-primary font-bold">{os.level}%</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-foreground mb-4 flex items-center">
                    <Database className="h-5 w-5 mr-2 text-primary" />
                    Databases
                  </h4>
                  <div className="space-y-3">
                    {databases.map((db, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border hover:border-primary/30 transition-colors">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 text-primary">
                            {db.icon}
                          </div>
                          <span className="font-medium">{db.name}</span>
                        </div>
                        <div className="text-primary font-bold">{db.level}%</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-foreground mb-4 flex items-center">
                    <Cloud className="h-5 w-5 mr-2 text-primary" />
                    DevOps & Cloud
                  </h4>
                  <div className="space-y-3">
                    {devOpsTools.map((tool, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border hover:border-primary/30 transition-colors">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 text-primary">
                            {tool.icon}
                          </div>
                          <span className="font-medium">{tool.name}</span>
                        </div>
                        <div className="text-primary font-bold">{tool.level}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <Palette className="h-6 w-6 mr-3 text-primary" />
                Areas of Specialization
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                      <Palette className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-foreground">Graphic Design</h4>
                      <p className="text-sm text-muted-foreground">Visual communication & branding</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-4">
                    {designTools.map((tool, index) => (
                      <div key={index} className="flex items-center bg-background/50 rounded-full px-4 py-2">
                        <div className="mr-2">{tool.icon}</div>
                        <span>{tool.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-6 border border-accent/20">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center mr-4">
                      <Laptop className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-foreground">Software Engineering</h4>
                      <p className="text-sm text-muted-foreground">Full-stack development & architecture</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-accent rounded-full mr-3"></div>
                      <span>Web Development</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-accent rounded-full mr-3"></div>
                      <span>Mobile Apps</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-accent rounded-full mr-3"></div>
                      <span>API Design</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-accent rounded-full mr-3"></div>
                      <span>DevOps</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <SquareCode className="h-6 w-6 mr-3 text-primary" />
                Development Tools
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {ides.map((ide, index) => (
                  <div key={index} className="flex flex-col items-center p-4 rounded-lg bg-card/50 border border-border">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                      {ide.icon}
                    </div>
                    <span className="font-medium text-center mb-2">{ide.name}</span>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                        style={{ width: `${ide.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center pt-6 border-t border-border">
              <p className="text-lg text-muted-foreground mb-6">
                Ready to bring your ideas to life? Let's create something amazing together!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={closeProjectsModal}
                  className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary px-8 py-6 text-lg rounded-full"
                >
                  Close Skills Overview
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    closeProjectsModal();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg rounded-full"
                >
                  Contact Me
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

<style jsx global>{`
  .experience-card {
    position: relative;
    width: 100%;
    height: 200px;
  }

  .experience-card__content {
    position: absolute;
    inset: 0;
    z-index: 10;
  }

  .experience-card__years,
  .experience-card__title,
  .experience-card__description {
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .experience-card__info {
    opacity: 0;
    height: 100%;
    transform: translateX(100%);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    background: linear-gradient(
      -75deg,
      rgba(59, 130, 246, 0.95) 65%,
      rgba(139, 92, 246, 0.95) 75%,
      rgba(59, 130, 246, 0) 18%
    );
    color: white;
    padding: 1.5rem;
    font-size: 0.875rem;
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .experience-card:hover .experience-card__info {
    opacity: 1;
    transform: translateX(0%);
  }

  .experience-card:hover .experience-card__years,
  .experience-card:hover .experience-card__title,
  .experience-card:hover .experience-card__description {
    transform: translateX(-80px);
  }

  /* Animaciones para los puntos */
  @keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }

  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
`}</style>