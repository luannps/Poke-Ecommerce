import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ShoppingCart, 
  Heart, 
  QrCode,
  Star
} from 'lucide-react'

export default function ProductCard({ 
  product = {
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
  }
}) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [showQR, setShowQR] = useState(false)

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const getCategoryColor = (category) => {
    const colors = {
      'Carta Avulsa': 'bg-primary/20 text-primary border-primary/30',
      'Deck Pronto': 'bg-accent/20 text-accent border-accent/30',
      'Booster': 'bg-primary/20 text-primary border-primary/30'
    }
    return colors[category] || 'bg-muted/20 text-muted-foreground border-muted/30'
  }

  const getRarityColor = (rarity) => {
    const colors = {
      'Ultra Rare': 'bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-400 border-yellow-400/30',
      'Secret Rare': 'bg-gradient-to-r from-purple-400/20 to-pink-500/20 text-purple-400 border-purple-400/30',
      'Theme Deck': 'bg-accent/20 text-accent border-accent/30',
      'Booster Pack': 'bg-primary/20 text-primary border-primary/30'
    }
    return colors[rarity] || 'bg-muted/20 text-muted-foreground border-muted/30'
  }

  return (
    <Card className="group glass-effect shadow-glow shadow-glow-hover border-border overflow-hidden">
      <CardContent className="p-0">
        {/* Image container */}
        <div className="relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {discountPercentage > 0 && (
              <Badge className="text-xs bg-destructive text-destructive-foreground shadow-glow">
                -{discountPercentage}%
              </Badge>
            )}
            <Badge className={`text-xs ${getCategoryColor(product.category)} shadow-glow`}>
              {product.category}
            </Badge>
          </div>

          {/* Favorite button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 glass-effect shadow-glow-hover"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart 
              className={`w-4 h-4 ${isFavorite ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`} 
            />
          </Button>

          {/* Stock status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
              <Badge className="bg-destructive text-destructive-foreground shadow-glow">Esgotado</Badge>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title and rating */}
          <div>
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground">{product.rating}</span>
              </div>
              <Badge className={`text-xs ${getRarityColor(product.rarity)}`}>
                {product.rarity}
              </Badge>
            </div>
          </div>

          {/* Set info */}
          <p className="text-sm text-muted-foreground">{product.set}</p>

          {/* Price */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold gradient-text">
                R$ {product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  R$ {product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <p className="text-xs text-accent">
              ou via PIX com desconto
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 space-y-2">
        {/* Action buttons */}
        <div className="flex gap-2 w-full">
          <Button 
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow shadow-glow-hover" 
            disabled={!product.inStock}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Adicionar
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground shadow-glow-hover"
            onClick={() => setShowQR(!showQR)}
            disabled={!product.inStock}
          >
            <QrCode className="w-4 h-4" />
          </Button>
        </div>

        {/* QR Code section */}
        {showQR && (
          <div className="w-full p-3 glass-effect rounded-lg text-center border border-border">
            <div className="w-24 h-24 bg-card mx-auto mb-2 rounded border-2 border-dashed border-primary/30 flex items-center justify-center shadow-glow">
              <QrCode className="w-8 h-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">
              Escaneie para pagar via PIX
            </p>
            <p className="text-sm font-medium gradient-text">
              R$ {(product.price * 0.95).toFixed(2)}
            </p>
            <p className="text-xs text-accent">
              5% de desconto no PIX
            </p>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

