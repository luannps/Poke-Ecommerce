
import { useEffect, useState } from 'react';
import CartaCadastro from './CartaCadastro';
import { Button } from '@/components/ui/button';

function CartasAvulsas({ user }) {
  const [cartas, setCartas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchCartas() {
      setLoading(true);
      try {
        const res = await fetch('/api/products?category=Carta Avulsa');
        const data = await res.json();
        setCartas(data.products || []);
      } catch (err) {
        setError('Erro ao buscar cartas.');
      }
      setLoading(false);
    }
    fetchCartas();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Cartas Avulsas</h2>
      {user && user.role === 'admin' && (
        <div className="mb-6">
          <CartaCadastro />
        </div>
      )}
      <h3 className="font-semibold mb-2">Listagem de cartas</h3>
      {loading ? <div>Carregando...</div> : error ? <div className="text-red-500">{error}</div> : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cartas.length === 0 ? <div>Nenhuma carta encontrada.</div> : cartas.map(carta => (
            <div key={carta.id} className="border rounded p-2 bg-white flex flex-col items-center">
              <img src={carta.image_url} alt={carta.name} className="w-32 h-40 object-cover mb-2" />
              <span className="font-bold text-center">{carta.name}</span>
              <span className="text-xs text-muted-foreground">{carta.set_name}</span>
              <span className="text-xs">R${carta.price?.toFixed(2)}</span>
              <Button size="sm" className="mt-2">Adicionar ao carrinho</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CartasAvulsas;
