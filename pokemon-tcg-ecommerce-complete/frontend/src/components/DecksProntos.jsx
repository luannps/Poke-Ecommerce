
import { useEffect, useState } from 'react';
import DeckCadastro from './DeckCadastro';
import { Button } from '@/components/ui/button';

function DecksProntos({ user }) {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchDecks() {
      setLoading(true);
      try {
        const res = await fetch('/api/products?category=Deck Pronto');
        const data = await res.json();
        setDecks(data.products || []);
      } catch (err) {
        setError('Erro ao buscar decks.');
      }
      setLoading(false);
    }
    fetchDecks();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Decks Prontos</h2>
      {user && user.role === 'admin' && (
        <div className="mb-6">
          <DeckCadastro />
        </div>
      )}
      <h3 className="font-semibold mb-2">Listagem de decks</h3>
      {loading ? <div>Carregando...</div> : error ? <div className="text-red-500">{error}</div> : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {decks.length === 0 ? <div>Nenhum deck encontrado.</div> : decks.map(deck => (
            <div key={deck.id} className="border rounded p-2 bg-white flex flex-col items-center">
              <img src={deck.image_url} alt={deck.name} className="w-32 h-40 object-cover mb-2" />
              <span className="font-bold text-center">{deck.name}</span>
              <span className="text-xs text-muted-foreground">{deck.set_name}</span>
              <span className="text-xs">R${deck.price?.toFixed(2)}</span>
              <Button size="sm" className="mt-2">Adicionar ao carrinho</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DecksProntos;
