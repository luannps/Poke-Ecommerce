import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold">P</span>
              </div>
              <h3 className="text-xl font-bold text-primary">PokéCards</h3>
            </div>
            <p className="text-slate-300 text-sm">
              Sua loja especializada em cartas Pokémon TCG. Encontre as melhores cartas, 
              decks prontos e monte sua coleção dos sonhos.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="text-slate-300 hover:text-primary">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-300 hover:text-primary">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-300 hover:text-primary">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-300 hover:text-primary">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Links rápidos */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Links Rápidos</h4>
            <div className="space-y-2">
              <Button variant="ghost" className="justify-start p-0 h-auto text-slate-300 hover:text-primary">
                Sobre Nós
              </Button>
              <Button variant="ghost" className="justify-start p-0 h-auto text-slate-300 hover:text-primary">
                Como Comprar
              </Button>
              <Button variant="ghost" className="justify-start p-0 h-auto text-slate-300 hover:text-primary">
                Política de Troca
              </Button>
              <Button variant="ghost" className="justify-start p-0 h-auto text-slate-300 hover:text-primary">
                Termos de Uso
              </Button>
              <Button variant="ghost" className="justify-start p-0 h-auto text-slate-300 hover:text-primary">
                Privacidade
              </Button>
            </div>
          </div>

          {/* Categorias */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Categorias</h4>
            <div className="space-y-2">
              <Button variant="ghost" className="justify-start p-0 h-auto text-slate-300 hover:text-primary">
                Cartas Avulsas
              </Button>
              <Button variant="ghost" className="justify-start p-0 h-auto text-slate-300 hover:text-primary">
                Decks Prontos
              </Button>
              <Button variant="ghost" className="justify-start p-0 h-auto text-slate-300 hover:text-primary">
                Boosters
              </Button>
              <Button variant="ghost" className="justify-start p-0 h-auto text-slate-300 hover:text-primary">
                Acessórios
              </Button>
              <Button variant="ghost" className="justify-start p-0 h-auto text-slate-300 hover:text-primary">
                Promoções
              </Button>
            </div>
          </div>

          {/* Contato e Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-slate-300">
                <Phone className="w-4 h-4" />
                <span className="text-sm">(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <Mail className="w-4 h-4" />
                <span className="text-sm">contato@pokecards.com.br</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">São Paulo, SP</span>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-medium">Newsletter</h5>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Seu e-mail" 
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                />
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © 2024 PokéCards. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-6 text-slate-400 text-sm">
              <span>Pagamento via PIX</span>
              <span>Entrega em todo Brasil</span>
              <span>Suporte 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

