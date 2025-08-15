import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function DeckCadastro() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImagem = (e) => {
    const file = e.target.files[0];
    setImagem(file);
    setPreview(URL.createObjectURL(file));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', titulo);
    formData.append('set_name', '');
    formData.append('category', 'Deck Pronto');
    formData.append('description', descricao);
    formData.append('price', 0);
    if (imagem) formData.append('image', imagem);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        alert('Deck cadastrado com sucesso!');
        setTitulo('');
        setDescricao('');
        setImagem(null);
        setPreview(null);
      } else {
        alert('Erro ao cadastrar deck: ' + (data.error || 'Erro desconhecido'));
      }
    } catch (err) {
      alert('Erro ao cadastrar deck.');
    }
  };

  return (
    <form className="max-w-md mx-auto p-4 border rounded" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-2">Cadastrar Deck Pronto</h2>
      <Input placeholder="Título do deck" value={titulo} onChange={e => setTitulo(e.target.value)} className="mb-2" />
      <Input placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} className="mb-2" />
      <Input type="file" accept="image/*" onChange={handleImagem} className="mb-2" />
      {preview && <img src={preview} alt="Preview" className="mb-2 w-32 h-32 object-cover" />}
      <Button type="submit">Cadastrar</Button>
    </form>
  );
}

export default DeckCadastro;
