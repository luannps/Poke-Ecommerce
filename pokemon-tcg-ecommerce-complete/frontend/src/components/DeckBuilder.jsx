import { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import DraggableCard from './DraggableCard';

// Card item type for DnD
const ItemTypes = {
  CARD: 'card',
};

function DeckBuilder() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [deck, setDeck] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Carrega cartas iniciais quando o componente é montado
  useEffect(() => {
    loadInitialCards();
  }, []);

  // Função para carregar cartas iniciais
  const loadInitialCards = async () => {
    try {
      setIsLoading(true);
      setError('');
      const res = await fetch('http://localhost:5000/api/cards/search?q=supertype:pokemon rarity:rare');
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Falha ao buscar cartas');
      }
      const data = await res.json();
      console.log('Cartas carregadas:', data);
      if (!data.data || !Array.isArray(data.data)) {
        throw new Error('Resposta inválida da API');
      }
      setSearchResults(data.data);
    } catch (err) {
      console.error('Erro detalhado ao carregar cartas:', err);
      setError(err.message || 'Erro ao carregar cartas. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Busca cartas na API
  const handleSearch = async () => {
    if (!search) {
      // Se não houver termo de busca, carrega algumas cartas populares
      try {
        setError('');
        const res = await fetch('http://localhost:5000/api/cards/search?q=supertype:pokemon rarity:rare');
        if (!res.ok) throw new Error('Falha ao buscar cartas');
        const data = await res.json();
        setSearchResults(data.data || []);
      } catch (err) {
        console.error(err);
        setError('Erro ao buscar cartas. Tente novamente.');
      }
      return;
    }

    try {
      setError('');
      // Melhora a busca adicionando filtros específicos
      const query = `name:*${search}* supertype:pokemon`;
      const res = await fetch(`http://localhost:5000/api/cards/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Falha ao buscar cartas');
      }
      const data = await res.json();
      if (!data.data || !Array.isArray(data.data)) {
        throw new Error('Resposta inválida da API');
      }
      setSearchResults(data.data);
    } catch (err) {
      console.error('Erro detalhado:', err);
      setError(err.message || 'Erro ao buscar cartas. Tente novamente.');
    }
  };

  // Executa busca ao pressionar Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Validação do deck
  const validateDeck = (deck) => {
    if (deck.length > 60) return 'Máximo de 60 cartas.';
    const counts = {};
    let acespectCount = 0;
    for (const card of deck) {
      counts[card.id] = (counts[card.id] || 0) + 1;
      if (counts[card.id] > 4) return 'Máximo de 4 cartas iguais.';
      if (card.type === 'Acespect') acespectCount++;
      if (acespectCount > 1) return 'Apenas 1 carta do tipo Acespect.';
    }
    return '';
  };

  // Drop handler
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item) => {
      const newDeck = [...deck, item.card];
      const validation = validateDeck(newDeck);
      if (validation) {
        setError(validation);
      } else {
        setDeck(newDeck);
        setError('');
      }
    },
  });

  // Salva o deck
  const handleSaveDeck = async () => {
    if (!title) {
      setError('Dê um título ao seu deck');
      return;
    }
    
    if (deck.length === 0) {
      setError('Adicione pelo menos uma carta ao deck');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/decks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title,
          description,
          cards: deck.map(card => ({
            id: card.id,
            name: card.name,
            quantity: 1,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar deck');
      }

      // Limpa o formulário
      setTitle('');
      setDescription('');
      setDeck([]);
      setError('');
      alert('Deck salvo com sucesso!');
    } catch (err) {
      setError('Erro ao salvar o deck. Verifique se está logado.');
    }
  };

  // Remove carta do deck
  const removeCard = (idx) => {
    setDeck(update(deck, { $splice: [[idx, 1]] }));
    setError('');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-2">Deck Builder</h2>
        <p className="mb-6 text-muted-foreground">
          Monte seu deck arrastando cartas do painel de busca para a área do deck. Máximo de 60 cartas por deck.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Painel de Busca */}
          <div>
            <div className="mb-6">
              <Input 
                placeholder="Título do deck" 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                className="mb-2" 
              />
              <Input 
                placeholder="Descrição do deck" 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
              />
            </div>

            <div className="mb-6 flex gap-2">
              <Input 
                placeholder="Digite o nome da carta..." 
                value={search} 
                onChange={e => setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button onClick={handleSearch}>Buscar</Button>
            </div>

            <h3 className="font-semibold mb-4">Cartas Encontradas</h3>
            <ScrollArea className="h-[600px] rounded-md border p-4">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <>
                  {error ? (
                    <div className="text-center text-red-500 py-8">
                      {error}
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {searchResults.map(card => (
                          <DraggableCard key={card.id} card={card} />
                        ))}
                      </div>
                      {searchResults.length === 0 && !isLoading && (
                        <p className="text-center text-muted-foreground py-8">
                          {search ? 'Nenhuma carta encontrada' : 'Carregando cartas...'}
                        </p>
                      )}
                    </>
                  )}
                </>
              )}
            </ScrollArea>
          </div>

          {/* Área do Deck */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Seu Deck ({deck.length}/60)</h3>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setDeck([])}
                  disabled={deck.length === 0}
                >
                  Limpar Deck
                </Button>
                <Button 
                  onClick={handleSaveDeck}
                  disabled={!title || deck.length === 0}
                >
                  Salvar Deck
                </Button>
              </div>
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-md mb-4">
                {error}
              </div>
            )}

            <div ref={drop}>
              <ScrollArea className="h-[600px] rounded-md border p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {deck.map((card, idx) => (
                    <div key={idx} className="relative">
                      <DraggableCard card={card} />
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        className="absolute top-2 right-2" 
                        onClick={() => removeCard(idx)}
                      >
                        Remover
                      </Button>
                    </div>
                  ))}
                </div>
                {deck.length === 0 && (
                  <div className="flex items-center justify-center h-32 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">
                      Arraste cartas aqui para montar seu deck
                    </p>
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default DeckBuilder;
