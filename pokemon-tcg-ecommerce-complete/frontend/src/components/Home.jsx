import { useState, useEffect } from 'react'
import ProductCarousel from './ProductCarousel'
import HeroSection from './HeroSection'

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products/featured')
        if (!response.ok) {
          throw new Error('Falha ao carregar produtos em destaque')
        }
        const data = await response.json()
        setFeaturedProducts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <div className="container mx-auto py-8">
      <HeroSection />
      
      <div className="mt-12">
        <ProductCarousel 
          title="Produtos em Destaque"
          products={featuredProducts.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            originalPrice: p.original_price,
            image: p.image_url,
            category: p.category,
            rarity: p.rarity,
            set: p.set_name,
            rating: p.rating,
            inStock: p.stock > 0
          }))}
        />
      </div>

      {error && (
        <div className="text-red-500 mt-4 text-center">
          {error}
        </div>
      )}
    </div>
  )
}

export default Home;
