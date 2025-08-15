# 🎮 PokéCards - E-commerce Pokémon TCG

Um e-commerce moderno e completo para venda de cartas e decks Pokémon TCG, desenvolvido com React e Flask.

![PokéCards](https://img.shields.io/badge/PokéCards-E--commerce-blue?style=for-the-badge&logo=pokemon)
![React](https://img.shields.io/badge/React-18.0-61DAFB?style=for-the-badge&logo=react)
![Flask](https://img.shields.io/badge/Flask-2.3-000000?style=for-the-badge&logo=flask)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python)

## 🌟 Características Principais

### 🎨 Design Moderno
- **Tema escuro** com tons de azul petróleo
- **Efeitos glass** e sombras com brilho
- **Interface responsiva** para desktop e mobile
- **Animações suaves** e hover effects
- **Gradientes modernos** nos textos e botões

### 🛒 Funcionalidades E-commerce
- **Catálogo de produtos** com filtros e busca
- **Carrinho de compras** funcional
- **Sistema de pagamento PIX** integrado
- **QR Code PIX** automático para cada produto
- **Carrossel de produtos** por categoria
- **Sistema de avaliações** e comentários

### 🔐 Sistema de Usuários
- **Login diferenciado** para admin e usuários
- **Área do usuário** com histórico de compras
- **Sistema de cadastro** completo
- **Autenticação segura** com sessões

### 👑 Painel Administrativo
- **Dashboard** com métricas de vendas
- **Gerenciamento de produtos** (CRUD completo)
- **Controle de usuários** e permissões
- **Sistema de cupons** de desconto
- **Relatórios de pedidos** e vendas
- **Configurações** do sistema

### 🃏 Deck Builder
- **Construtor de decks** interativo
- **Integração com API Pokémon TCG**
- **Validação de regras** do jogo
- **Busca de cartas** por nome e tipo
- **Salvamento de decks** personalizados

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18** - Framework principal
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **Radix UI** - Componentes base

### Backend
- **Flask** - Framework web Python
- **SQLAlchemy** - ORM para banco de dados
- **Flask-CORS** - Suporte a CORS
- **SQLite** - Banco de dados
- **Requests** - Integração com APIs externas

### APIs Externas
- **Pokémon TCG API** - Dados das cartas
- **PIX API** - Sistema de pagamentos

## 📦 Estrutura do Projeto

```
pokemon-tcg-ecommerce-complete/
├── frontend/                 # Aplicação React
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductCarousel.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── LoginModal.jsx
│   │   │   └── AdminPanel.jsx
│   │   ├── App.jsx          # Componente principal
│   │   └── App.css          # Estilos globais
│   ├── package.json
│   └── vite.config.js
├── backend/                 # API Flask
│   ├── src/
│   │   ├── models/          # Modelos do banco
│   │   │   ├── user.py
│   │   │   └── product.py
│   │   ├── routes/          # Rotas da API
│   │   │   ├── auth.py
│   │   │   ├── products.py
│   │   │   ├── cart.py
│   │   │   ├── orders.py
│   │   │   └── decks.py
│   │   └── main.py          # Aplicação principal
│   ├── requirements.txt
│   └── run.py
├── docs/                    # Documentação
└── README.md               # Este arquivo
```

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- Python 3.11+
- Git

### 1. Clone o Repositório
```bash
git clone https://github.com/seu-usuario/pokemon-tcg-ecommerce.git
cd pokemon-tcg-ecommerce
```

### 2. Configuração do Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows

pip install -r requirements.txt
python src/main.py
```

### 3. Configuração do Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Build para Produção
```bash
# Frontend
cd frontend
npm run build

# Copiar build para Flask
cp -r dist/* ../backend/src/static/
```

## 🔑 Credenciais de Acesso

### Administrador
- **Email:** admin@pokecards.com
- **Senha:** admin123

### Usuário Comum
- **Email:** qualquer@email.com
- **Senha:** qualquersenha

## 🎯 Funcionalidades Detalhadas

### Para Usuários Comuns
- ✅ Navegação no catálogo de produtos
- ✅ Busca e filtros avançados
- ✅ Adicionar produtos ao carrinho
- ✅ Finalizar compras via PIX
- ✅ Histórico de pedidos
- ✅ Deck Builder para montar decks
- ✅ Avaliação de produtos

### Para Administradores
- ✅ Dashboard com métricas completas
- ✅ CRUD de produtos (criar, editar, excluir)
- ✅ Gerenciamento de usuários
- ✅ Controle de estoque
- ✅ Sistema de cupons de desconto
- ✅ Relatórios de vendas
- ✅ Configurações do sistema
- ✅ Upload de imagens de produtos

## 🎨 Capturas de Tela

### Página Inicial
![Home](screenshots/home.png)

### Painel Administrativo
![Admin](screenshots/admin-dashboard.png)

### Sistema de Login
![Login](screenshots/login-modal.png)

### Produtos
![Products](screenshots/products.png)

## 🔧 APIs Disponíveis

### Autenticação
- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/register` - Registro de usuário
- `GET /api/auth/profile` - Perfil do usuário

### Produtos
- `GET /api/products` - Listar produtos
- `POST /api/products` - Criar produto (admin)
- `PUT /api/products/:id` - Editar produto (admin)
- `DELETE /api/products/:id` - Excluir produto (admin)

### Carrinho
- `GET /api/cart` - Ver carrinho
- `POST /api/cart/add` - Adicionar ao carrinho
- `DELETE /api/cart/remove` - Remover do carrinho

### Pedidos
- `GET /api/orders` - Listar pedidos
- `POST /api/orders` - Criar pedido
- `GET /api/orders/:id/pix` - Gerar QR Code PIX

### Deck Builder
- `GET /api/cards/search` - Buscar cartas
- `POST /api/decks` - Salvar deck
- `GET /api/decks` - Listar decks do usuário

## 🚀 Deploy

### Opções de Deploy

#### 1. Heroku
```bash
# Instalar Heroku CLI
heroku create pokemon-tcg-ecommerce
git push heroku main
```

#### 2. Vercel (Frontend)
```bash
cd frontend
npm run build
vercel --prod
```

#### 3. Railway (Backend)
```bash
# Conectar repositório no Railway
# Deploy automático via Git
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ para a comunidade Pokémon TCG

## 🎮 Roadmap

### Próximas Funcionalidades
- [ ] Sistema de wishlist
- [ ] Chat de suporte ao cliente
- [ ] Integração com correios para frete
- [ ] Sistema de pontos e recompensas
- [ ] Marketplace para usuários venderem cartas
- [ ] App mobile React Native
- [ ] Integração com redes sociais
- [ ] Sistema de torneios online

### Melhorias Técnicas
- [ ] Testes automatizados (Jest + Cypress)
- [ ] CI/CD com GitHub Actions
- [ ] Monitoramento com Sentry
- [ ] Cache com Redis
- [ ] Banco PostgreSQL em produção
- [ ] CDN para imagens
- [ ] PWA (Progressive Web App)

## 📞 Suporte

Para suporte, envie um email para suporte@pokecards.com ou abra uma issue no GitHub.

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!
