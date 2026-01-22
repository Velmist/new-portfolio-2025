"use client"

interface GlowEffectProps {
  position?: 'top' | 'bottom' | 'full'
  intensity?: 'light' | 'medium' | 'strong'
  color?: 'primary' | 'accent' | 'mixed'
}

export function GlowEffect({ 
  position = 'top', 
  intensity = 'medium',
  color = 'mixed'
}: GlowEffectProps) {
  
  const positionClasses = {
    top: 'top-0 left-0 right-0 h-96',
    bottom: 'bottom-0 left-0 right-0 h-96',
    full: 'inset-0'
  }

  const intensityClasses = {
    light: 'opacity-20',
    medium: 'opacity-30',
    strong: 'opacity-40'
  }

  const gradientClasses = {
    primary: 'from-primary/20 via-primary/10 to-transparent',
    accent: 'from-accent/20 via-accent/10 to-transparent',
    mixed: 'from-primary/20 via-accent/10 to-transparent'
  }

  const radialClasses = {
    primary: 'from-primary/10 via-transparent to-transparent',
    accent: 'from-accent/10 via-transparent to-transparent',
    mixed: 'from-primary/10 via-accent/5 to-transparent'
  }

  return (
    <div className={`absolute ${positionClasses[position]} pointer-events-none z-0`}>
      <div className={`absolute ${positionClasses[position]} pointer-events-none z-0 animate-glow`}></div>
      <div className={`absolute inset-0 bg-gradient-to-b ${gradientClasses[color]} ${intensityClasses[intensity]}`} />
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${radialClasses[color]} ${intensityClasses[intensity]}`} />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-40 h-40 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute top-40 right-1/4 w-48 h-48 rounded-full bg-accent/5 blur-3xl"></div>
      </div>
    </div>
  )
}