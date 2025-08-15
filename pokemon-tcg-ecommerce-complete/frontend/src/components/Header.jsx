import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu,
  X,
  LogOut,
  Shield
} from 'lucide-react'

export default function Header({ user, onLoginClick, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount] = useState(3)

  const navItems = [
    { label: 'Início', href: '#', color: 'bg-primary/20 text-primary border-primary/30' },
    { label: 'Cartas Avulsas', href: '#', color: 'bg-accent/20 text-accent border-accent/30' },
    { label: 'Decks Prontos', href: '#', color: 'bg-primary/20 text-primary border-primary/30' },
    { label: 'Boosters', href: '#', color: 'bg-accent/20 text-accent border-accent/30' },
    { label: 'Deck Builder', href: '#', color: 'bg-primary/20 text-primary border-primary/30' },
    { label: 'Promoções', href: '#', color: 'bg-accent/20 text-accent border-accent/30' }
  ]

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-glow">
              <span className="text-primary-foreground font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold gradient-text">PokéCards</span>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Buscar cartas, decks..."
                className="pl-10 bg-muted/50 border-border focus:border-primary"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative shadow-glow-hover">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 bg-primary text-primary-foreground text-xs">
                  {cartCount}
                </Badge>
              )}
            </Button>
            
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 px-3 py-1 rounded-lg glass-effect">
                  {user.role === 'admin' && (
                    <Shield className="w-4 h-4 text-primary" />
                  )}
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="shadow-glow-hover"
                  onClick={onLogout}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                className="shadow-glow-hover"
                onClick={onLoginClick}
              >
                <User className="w-5 h-5" />
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Navigation - Desktop */}
        <div className="hidden md:flex items-center justify-center py-4 space-x-2">
          {navItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`${item.color} shadow-glow-hover`}
            >
              {item.label}
            </Button>
          ))}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 glass-effect rounded-lg mt-2 border border-border">
            {/* Mobile Search */}
            <div className="px-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Buscar cartas, decks..."
                  className="pl-10 bg-muted/50 border-border"
                />
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="px-4 space-y-2">
              {navItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className={`w-full justify-start ${item.color}`}
                >
                  {item.label}
                </Button>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="px-4 space-y-2">
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Carrinho ({cartCount})
              </Button>
              
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2 p-2 rounded-lg glass-effect">
                    {user.role === 'admin' && (
                      <Shield className="w-4 h-4 text-primary" />
                    )}
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    onClick={onLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                  onClick={onLoginClick}
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

