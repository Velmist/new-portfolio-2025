"use client"

interface GlowEffectProps {
  position?: 'top' | 'bottom' | 'full'
  intensity?: 'light' | 'medium' | 'strong'
  color?: 'pink' | 'purple' | 'mixed'
  className?: string
}

export function GlowEffect({ 
  position = 'top', 
  intensity = 'medium',
  color = 'mixed',
  className = ''
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
    pink: 'from-pink-500/20 via-pink-400/10 to-transparent',
    purple: 'from-purple-500/20 via-purple-400/10 to-transparent',
    mixed: 'from-pink-500/20 via-purple-500/10 to-transparent'
  }

  const radialClasses = {
    pink: 'from-pink-500/15 via-transparent to-transparent',
    purple: 'from-purple-500/15 via-transparent to-transparent',
    mixed: 'from-pink-500/15 via-purple-500/10 to-transparent'
  }

  return (
    <div className={`absolute ${positionClasses[position]} pointer-events-none z-0 ${className}`}>
      <div className={`absolute inset-0 bg-gradient-to-b ${gradientClasses[color]} ${intensityClasses[intensity]}`} />
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${radialClasses[color]} ${intensityClasses[intensity]}`} />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-40 h-40 rounded-full bg-pink-500/10 blur-3xl"></div>
        <div className="absolute top-40 right-1/4 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl"></div>
      </div>
    </div>
  )
}