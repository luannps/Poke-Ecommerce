# 🚀 Guia de Instalação - PokéCards E-commerce

Este guia te ajudará a configurar e executar o projeto PokéCards em sua máquina local.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
  - Download: https://nodejs.org/
  - Verificar: `node --version`

- **Python** (versão 3.11 ou superior)
  - Download: https://python.org/
  - Verificar: `python --version`

- **Git**
  - Download: https://git-scm.com/
  - Verificar: `git --version`

## 📥 1. Baixar o Projeto

### Opção A: Clone do GitHub
```bash
git clone https://github.com/seu-usuario/pokemon-tcg-ecommerce.git
cd pokemon-tcg-ecommerce
```

### Opção B: Download ZIP
1. Baixe o arquivo ZIP do repositório
2. Extraia para uma pasta de sua escolha
3. Abra o terminal na pasta extraída

## ⚙️ 2. Configuração do Backend (Flask)

### 2.1. Navegar para a pasta do backend
```bash
cd backend
```

### 2.2. Criar ambiente virtual Python
```bash
# Linux/Mac
python -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
```

### 2.3. Instalar dependências
```bash
pip install -r requirements.txt
```

### 2.4. Inicializar banco de dados
```bash
python src/main.py
```

O backend estará rodando em: `http://localhost:5000`

## 🎨 3. Configuração do Frontend (React)

### 3.1. Abrir novo terminal e navegar para frontend
```bash
cd frontend
```

### 3.2. Instalar dependências
```bash
npm install
```

### 3.3. Iniciar servidor de desenvolvimento
```bash
npm run dev
```

O frontend estará rodando em: `http://localhost:5173`

## 🏗️ 4. Build para Produção

### 4.1. Build do Frontend
```bash
cd frontend
npm run build
```

### 4.2. Integrar com Backend
```bash
# Copiar build para Flask
cp -r dist/* ../backend/src/static/

# Ou no Windows
xcopy dist\* ..\backend\src\static\ /E /Y
```

### 4.3. Executar versão integrada
```bash
cd ../backend
python src/main.py
```

Acesse: `http://localhost:5000`

## 🔑 5. Credenciais de Teste

### Administrador
- **Email:** admin@pokecards.com
- **Senha:** admin123

### Usuário Comum
- **Email:** qualquer@email.com
- **Senha:** qualquersenha

## 🐛 6. Solução de Problemas

### Erro: "Module not found"
```bash
# Backend
pip install -r requirements.txt

# Frontend
npm install
```

### Erro: "Port already in use"
```bash
# Matar processo na porta 5000
sudo lsof -t -i tcp:5000 | xargs kill -9

# Matar processo na porta 5173
sudo lsof -t -i tcp:5173 | xargs kill -9
```

### Erro: "CORS policy"
- Certifique-se que o backend está rodando
- Verifique se as URLs estão corretas no frontend

### Erro: "Database locked"
```bash
# Deletar banco e recriar
rm backend/src/database.db
python backend/src/main.py
```

## 📱 7. Desenvolvimento

### Estrutura de Pastas
```
pokemon-tcg-ecommerce/
├── frontend/          # React App
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
├── backend/           # Flask API
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   └── main.py
│   └── requirements.txt
└── README.md
```

### Scripts Úteis

#### Frontend
```bash
npm run dev      # Desenvolvimento
npm run build    # Build produção
npm run preview  # Preview build
```

#### Backend
```bash
python src/main.py           # Executar servidor
pip freeze > requirements.txt # Atualizar dependências
```

## 🚀 8. Deploy

### Heroku
```bash
# Instalar Heroku CLI
heroku create pokemon-tcg-ecommerce
git push heroku main
```

### Vercel (Frontend apenas)
```bash
cd frontend
npm run build
npx vercel --prod
```

### Railway (Backend)
1. Conecte seu repositório no Railway
2. Deploy automático via Git

## 🔧 9. Configurações Avançadas

### Variáveis de Ambiente
Crie arquivo `.env` no backend:
```
FLASK_ENV=development
SECRET_KEY=sua-chave-secreta
DATABASE_URL=sqlite:///database.db
```

### Banco de Dados Externo
Para usar PostgreSQL:
```bash
pip install psycopg2-binary
```

Altere a URL no `.env`:
```
DATABASE_URL=postgresql://user:pass@localhost/dbname
```

## 📞 10. Suporte

Se encontrar problemas:

1. Verifique os logs no terminal
2. Consulte a documentação no README.md
3. Abra uma issue no GitHub
4. Entre em contato: suporte@pokecards.com

## ✅ 11. Checklist de Instalação

- [ ] Node.js instalado
- [ ] Python instalado
- [ ] Git instalado
- [ ] Projeto clonado/baixado
- [ ] Backend configurado e rodando
- [ ] Frontend configurado e rodando
- [ ] Credenciais de teste funcionando
- [ ] Build de produção testado

---

🎉 **Parabéns!** Seu e-commerce Pokémon TCG está pronto para uso!

