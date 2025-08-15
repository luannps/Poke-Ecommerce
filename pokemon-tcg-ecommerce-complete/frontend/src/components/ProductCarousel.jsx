import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from './ProductCard'

export default function ProductCarousel({ 
  title = "Produtos em Destaque",
  products = []
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(4)

  // Mock products if none provided
  const mockProducts = [
    {
      id: 1,
      name: "Pikachu VMAX",
      price: 89.90,
      originalPrice: 120.00,
      image: "/api/placeholder/300/400",
      category: "Carta Avulsa",
      rarity: "Ultra Rare",
      set: "Brilliant Stars",
      rating: 4.8,
      inStock: true
    },
    {
      id: 2,
      name: "Charizard GX",
      price: 156.90,
      originalPrice: 200.00,
      image: "/api/placeholder/300/400",
      category: "Carta Avulsa",
      rarity: "Secret Rare",
      set: "Hidden Fates",
      rating: 4.9,
      inStock: true
    },
    {
      id: 3,
      name: "Deck Tema Relentless Flame",
      price: 45.90,
      image: "/api/placeholder/300/400",
      category: "Deck Pronto",
      rarity: "Theme Deck",
      set: "Unbroken Bonds",
      rating: 4.5,
      inStock: true
    },
    {
      id: 4,
      name: "Booster Pack Evolving Skies",
      price: 24.90,
      image: "/api/placeholder/300/400",
      category: "Booster",
      rarity: "Booster Pack",
      set: "Evolving Skies",
      rating: 4.7,
      inStock: true
    },
    {
      id: 5,
      name: "Mewtwo & Mew GX",
      price: 78.90,
      originalPrice: 95.00,
      image: "/api/placeholder/300/400",
      category: "Carta Avulsa",
      rarity: "Ultra Rare",
      set: "Unified Minds",
      rating: 4.8,
      inStock: false
    },
    {
      id: 6,
      name: "Rayquaza VMAX",
      price: 134.90,
      image: "/api/placeholder/300/400",
      category: "Carta Avulsa",
      rarity: "Secret Rare",
      set: "Evolving Skies",
      rating: 4.9,
      inStock: true
    }
  ]

  const displayProducts = products.length > 0 ? products : mockProducts

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1)
      } else if (window.innerWidth < 768) {
        setItemsPerView(2)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3)
      } else {
        setItemsPerView(4)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = Math.max(0, displayProducts.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1))
  }

  // Auto-play
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [maxIndex])

  return (
    <section className="py-16 bg-gradient-to-br from-card via-muted to-card">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold gradient-text">{title}</h2>
            <p className="text-muted-foreground mt-2">
              Descubra as cartas mais populares e procuradas
            </p>
          </div>
          
          {/* Navigation buttons */}
          <div className="hidden md:flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground shadow-glow-hover"
              disabled={displayProducts.length <= itemsPerView}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground shadow-glow-hover"
              disabled={displayProducts.length <= itemsPerView}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
            }}
          >
            {displayProducts.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 px-2"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="flex md:hidden justify-center space-x-2 mt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground shadow-glow-hover"
            disabled={displayProducts.length <= itemsPerView}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground shadow-glow-hover"
            disabled={displayProducts.length <= itemsPerView}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Dots indicator */}
        {displayProducts.length > itemsPerView && (
          <div className="flex justify-center space-x-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary shadow-glow' : 'bg-muted-foreground/30'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}

        {/* View all button */}
        <div className="text-center mt-8">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow shadow-glow-hover"
          >
            Ver Todos os Produtos
          </Button>
        </div>
      </div>
    </section>
  )
}

