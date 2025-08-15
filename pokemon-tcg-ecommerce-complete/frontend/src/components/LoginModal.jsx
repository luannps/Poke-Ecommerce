import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  User, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Shield,
  UserPlus,
  LogIn
} from 'lucide-react'

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    userType: 'user'
  })
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleLogin = (e) => {
    e.preventDefault()
    
    // Credenciais de admin
    if (loginData.email === 'admin@pokecards.com' && loginData.password === 'admin123') {
      onLogin({ 
        id: 1, 
        name: 'Administrador', 
        email: 'admin@pokecards.com', 
        role: 'admin' 
      })
      onClose()
      return
    }
    
    // Login de usuário comum (mock)
    if (loginData.email && loginData.password) {
      onLogin({ 
        id: 2, 
        name: 'Usuário Comum', 
        email: loginData.email, 
        role: 'user' 
      })
      onClose()
      return
    }
    
    alert('Credenciais inválidas!')
  }

  const handleRegister = (e) => {
    e.preventDefault()
    
    if (registerData.password !== registerData.confirmPassword) {
      alert('Senhas não coincidem!')
      return
    }
    
    if (registerData.name && registerData.email && registerData.password) {
      onLogin({ 
        id: Date.now(), 
        name: registerData.name, 
        email: registerData.email, 
        role: 'user' 
      })
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass-effect border-border shadow-glow">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl gradient-text">PokéCards</CardTitle>
          <p className="text-muted-foreground">Acesse sua conta ou crie uma nova</p>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="login" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 glass-effect">
              <TabsTrigger value="login" className="flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Entrar
              </TabsTrigger>
              <TabsTrigger value="register" className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Cadastrar
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-10 bg-muted/50 border-border focus:border-primary"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Sua senha"
                      className="pl-10 pr-10 bg-muted/50 border-border focus:border-primary"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Credenciais de demonstração */}
                <div className="space-y-2 p-3 bg-muted/30 rounded-lg border border-border">
                  <p className="text-xs font-medium text-muted-foreground">Credenciais de demonstração:</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Shield className="w-3 h-3 text-primary" />
                      <span className="text-xs">Admin: admin@pokecards.com / admin123</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3 text-accent" />
                      <span className="text-xs">Usuário: qualquer@email.com / qualquersenha</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow"
                  >
                    Entrar
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={onClose}
                    className="border-border hover:bg-muted"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome Completo</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Seu nome completo"
                      className="pl-10 bg-muted/50 border-border focus:border-primary"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-10 bg-muted/50 border-border focus:border-primary"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      type="password"
                      placeholder="Crie uma senha"
                      className="pl-10 bg-muted/50 border-border focus:border-primary"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Confirmar Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      type="password"
                      placeholder="Confirme sua senha"
                      className="pl-10 bg-muted/50 border-border focus:border-primary"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow"
                  >
                    Cadastrar
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={onClose}
                    className="border-border hover:bg-muted"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

