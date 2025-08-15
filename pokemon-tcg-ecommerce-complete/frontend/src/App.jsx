import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import ProductCarousel from './components/ProductCarousel'
import LoginModal from './components/LoginModal'
import AdminPanel from './components/AdminPanel'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [showLogin, setShowLogin] = useState(false)

  const handleLogin = (userData) => {
    setUser(userData)
    setShowLogin(false)
  }

  const handleLogout = () => {
    setUser(null)
  }

  // Se o usuário é admin, mostrar painel administrativo
  if (user && user.role === 'admin') {
    return <AdminPanel user={user} onLogout={handleLogout} />
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={user} 
        onLoginClick={() => setShowLogin(true)}
        onLogout={handleLogout}
      />
      
      <main>
        <HeroSection />
        <ProductCarousel title="Produtos em Destaque" />
        <ProductCarousel title="Novidades" />
        <ProductCarousel title="Mais Vendidos" />
      </main>
      
      <Footer />
      
      <LoginModal 
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
      />
    </div>
  )
}

export default App

