import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import CartasAvulsas from './components/CartasAvulsas'
import DecksProntos from './components/DecksProntos'
import DeckBuilder from './components/DeckBuilder'
import LoginModal from './components/LoginModal'
import AdminPanel from './components/AdminPanel'
import './App.css'

// Páginas básicas para cada aba
function Boosters() {
  return <div className="container mx-auto py-8"><h2 className="text-2xl font-bold mb-4">Boosters</h2><p>Em breve: listagem de boosters.</p></div>
}
function Promocoes() {
  return <div className="container mx-auto py-8"><h2 className="text-2xl font-bold mb-4">Promoções</h2><p>Em breve: ofertas e promoções.</p></div>
}

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

  if (user && user.role === 'admin') {
    return <AdminPanel user={user} onLogout={handleLogout} />
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Header 
            user={user} 
            onLoginClick={() => setShowLogin(true)}
            onLogout={handleLogout}
          />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cartas" element={<CartasAvulsas user={user} />} />
              <Route path="/decks" element={<DecksProntos user={user} />} />
              <Route path="/deck-builder" element={<DeckBuilder />} />
            </Routes>
          </main>
          <Footer />
          <LoginModal 
            isOpen={showLogin}
            onClose={() => setShowLogin(false)}
            onLogin={handleLogin}
          />
        </div>
      </BrowserRouter>
    </DndProvider>
  )
}

export default App

