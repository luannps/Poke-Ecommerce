import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, 
  Package, 
  Settings, 
  BarChart3, 
  ShoppingCart, 
  Percent,
  Edit,
  Trash2,
  Plus,
  Save,
  Eye,
  DollarSign,
  TrendingUp,
  UserCheck,
  Gift,
  LogOut,
  Shield
} from 'lucide-react'

export default function AdminPanel({ user, onLogout }) {
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [orders, setOrders] = useState([])
  const [coupons, setCoupons] = useState([])
  const [stats, setStats] = useState({})
  const [editingProduct, setEditingProduct] = useState(null)
  const [editingUser, setEditingUser] = useState(null)

  // Mock data
  useEffect(() => {
    setProducts([
      { id: 1, name: 'Pikachu VMAX', price: 89.90, stock: 15, category: 'Carta Avulsa', status: 'active' },
      { id: 2, name: 'Charizard GX', price: 156.90, stock: 8, category: 'Carta Avulsa', status: 'active' },
      { id: 3, name: 'Deck Relentless Flame', price: 45.90, stock: 25, category: 'Deck Pronto', status: 'active' }
    ])

    setUsers([
      { id: 1, name: 'João Silva', email: 'joao@email.com', role: 'user', status: 'active', orders: 5, total: 450.50 },
      { id: 2, name: 'Maria Santos', email: 'maria@email.com', role: 'user', status: 'active', orders: 12, total: 1250.80 },
      { id: 3, name: 'Pedro Costa', email: 'pedro@email.com', role: 'user', status: 'blocked', orders: 2, total: 89.90 }
    ])

    setOrders([
      { id: 1, user: 'João Silva', total: 89.90, status: 'completed', date: '2024-01-15', items: 1 },
      { id: 2, user: 'Maria Santos', total: 156.90, status: 'pending', date: '2024-01-16', items: 1 },
      { id: 3, user: 'Pedro Costa', total: 45.90, status: 'shipped', date: '2024-01-16', items: 1 }
    ])

    setCoupons([
      { id: 1, code: 'WELCOME10', discount: 10, type: 'percentage', status: 'active', uses: 45, maxUses: 100 },
      { id: 2, code: 'FRETE20', discount: 20, type: 'fixed', status: 'active', uses: 12, maxUses: 50 },
      { id: 3, code: 'BLACKFRIDAY', discount: 25, type: 'percentage', status: 'expired', uses: 200, maxUses: 200 }
    ])

    setStats({
      totalRevenue: 15420.50,
      totalOrders: 156,
      totalUsers: 89,
      totalProducts: 45,
      monthlyGrowth: 12.5,
      conversionRate: 3.2
    })
  }, [])

  const ProductManager = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold gradient-text">Gerenciar Produtos</h3>
        <Button className="bg-primary hover:bg-primary/90 shadow-glow">
          <Plus className="w-4 h-4 mr-2" />
          Novo Produto
        </Button>
      </div>

      <div className="grid gap-4">
        {products.map((product) => (
          <Card key={product.id} className="glass-effect border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold">{product.name}</h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span>R$ {product.price.toFixed(2)}</span>
                    <span>Estoque: {product.stock}</span>
                    <Badge className={product.status === 'active' ? 'bg-primary/20 text-primary' : 'bg-muted'}>
                      {product.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const UserManager = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold gradient-text">Gerenciar Usuários</h3>
        <Button className="bg-primary hover:bg-primary/90 shadow-glow">
          <UserCheck className="w-4 h-4 mr-2" />
          Novo Usuário
        </Button>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id} className="glass-effect border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold">{user.name}</h4>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span>{user.orders} pedidos</span>
                    <span className="gradient-text font-medium">R$ {user.total.toFixed(2)}</span>
                    <Badge className={user.status === 'active' ? 'bg-primary/20 text-primary' : 'bg-destructive/20 text-destructive'}>
                      {user.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <Gift className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const OrderManager = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold gradient-text">Gerenciar Pedidos</h3>
      
      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id} className="glass-effect border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold">Pedido #{order.id}</h4>
                  <p className="text-sm text-muted-foreground">{order.user}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="gradient-text font-medium">R$ {order.total.toFixed(2)}</span>
                    <span>{order.items} item(s)</span>
                    <span>{order.date}</span>
                    <Badge className={
                      order.status === 'completed' ? 'bg-primary/20 text-primary' :
                      order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-accent/20 text-accent'
                    }>
                      {order.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const CouponManager = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold gradient-text">Gerenciar Cupons</h3>
        <Button className="bg-primary hover:bg-primary/90 shadow-glow">
          <Plus className="w-4 h-4 mr-2" />
          Novo Cupom
        </Button>
      </div>

      <div className="grid gap-4">
        {coupons.map((coupon) => (
          <Card key={coupon.id} className="glass-effect border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold font-mono">{coupon.code}</h4>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="gradient-text font-medium">
                      {coupon.type === 'percentage' ? `${coupon.discount}%` : `R$ ${coupon.discount}`}
                    </span>
                    <span>{coupon.uses}/{coupon.maxUses} usos</span>
                    <Badge className={coupon.status === 'active' ? 'bg-primary/20 text-primary' : 'bg-muted'}>
                      {coupon.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const Dashboard = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold gradient-text">Dashboard</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="glass-effect border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold gradient-text">R$ {stats.totalRevenue?.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.monthlyGrowth}% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
            <ShoppingCart className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold gradient-text">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              Taxa de conversão: {stats.conversionRate}%
            </p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold gradient-text">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Usuários ativos na plataforma
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background p-6">
      <div className="container mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">Painel Administrativo</h1>
            <p className="text-muted-foreground">Gerencie seu e-commerce Pokémon TCG</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-4 py-2 rounded-lg glass-effect">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{user?.name}</span>
            </div>
            <Button 
              variant="outline" 
              onClick={onLogout}
              className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 glass-effect">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Produtos
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Pedidos
            </TabsTrigger>
            <TabsTrigger value="coupons" className="flex items-center gap-2">
              <Percent className="w-4 h-4" />
              Cupons
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          <TabsContent value="products">
            <ProductManager />
          </TabsContent>

          <TabsContent value="users">
            <UserManager />
          </TabsContent>

          <TabsContent value="orders">
            <OrderManager />
          </TabsContent>

          <TabsContent value="coupons">
            <CouponManager />
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <h3 className="text-xl font-bold gradient-text">Configurações do Sistema</h3>
              <Card className="glass-effect border-border">
                <CardContent className="p-6">
                  <p className="text-muted-foreground">Configurações avançadas do e-commerce em desenvolvimento...</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

