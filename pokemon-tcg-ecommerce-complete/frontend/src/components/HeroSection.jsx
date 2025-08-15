import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Sparkles, 
  ArrowRight,
  Zap,
  Trophy
} from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-background via-card to-background text-foreground overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-primary rounded-full animate-pulse-glow"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border-2 border-accent rounded-full animate-float"></div>
        <div className="absolute bottom-20 left-32 w-12 h-12 border-2 border-primary rounded-full animate-pulse-glow"></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 border-2 border-accent rounded-full animate-float"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-2 text-sm font-medium shadow-glow">
              <Sparkles className="w-4 h-4 mr-2" />
              Novidades Pokémon TCG
            </Badge>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Sua Jornada
                <span className="gradient-text block">Pokémon</span>
                Começa Aqui
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Descubra as melhores cartas, monte decks incríveis e torne-se um mestre Pokémon. 
                Tudo com entrega rápida e pagamento via PIX.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 glass-effect p-3 rounded-lg">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-glow">
                  <Zap className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-sm">Entrega Rápida</span>
              </div>
              <div className="flex items-center space-x-2 glass-effect p-3 rounded-lg">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-glow">
                  <Trophy className="w-4 h-4 text-accent-foreground" />
                </div>
                <span className="text-sm">Cartas Originais</span>
              </div>
              <div className="flex items-center space-x-2 glass-effect p-3 rounded-lg">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-glow">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-sm">Deck Builder</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow shadow-glow-hover">
                Explorar Produtos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground shadow-glow-hover">
                Deck Builder
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">1000+</div>
                <div className="text-sm text-muted-foreground">Cartas Disponíveis</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">50+</div>
                <div className="text-sm text-muted-foreground">Decks Prontos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">24h</div>
                <div className="text-sm text-muted-foreground">Entrega Expressa</div>
              </div>
            </div>
          </div>

          {/* Hero Image/Cards */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main card */}
              <div className="w-64 h-80 mx-auto gradient-bg rounded-xl shadow-glow transform rotate-6 hover:rotate-3 transition-transform duration-300 gradient-border">
                <div className="p-6 h-full flex flex-col justify-between relative z-10">
                  <div>
                    <Badge className="bg-accent/20 text-accent border-accent/30 mb-4">Ultra Rare</Badge>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Pikachu VMAX</h3>
                    <p className="text-muted-foreground text-sm">HP 320</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold gradient-text">⚡</div>
                    <p className="text-muted-foreground text-sm">Lightning Type</p>
                  </div>
                </div>
              </div>

              {/* Background cards */}
              <div className="absolute top-4 -left-8 w-56 h-72 gradient-bg rounded-xl shadow-glow transform -rotate-12 opacity-70"></div>
              <div className="absolute -top-4 -right-8 w-56 h-72 gradient-bg rounded-xl shadow-glow transform rotate-12 opacity-70"></div>
            </div>

            {/* Floating elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-10 left-10 w-3 h-3 bg-primary rounded-full animate-bounce shadow-glow"></div>
              <div className="absolute top-20 right-20 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <div className="absolute bottom-20 left-20 w-4 h-4 bg-primary rounded-full animate-bounce delay-300 shadow-glow"></div>
              <div className="absolute bottom-10 right-10 w-2 h-2 bg-accent rounded-full animate-pulse delay-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-card">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
      </div>
    </section>
  )
}

