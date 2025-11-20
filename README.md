# MIB History - História Viva

https://mib-history.vercel.app/

![PWA Ready](https://img.shields.io/badge/PWA-Ready-success)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![React](https://img.shields.io/badge/React-19.0-61dafb)
![Vite](https://img.shields.io/badge/Vite-7.1-646cff)

**História Viva** é um Progressive Web App (PWA) que permite descobrir fatos históricos fascinantes do dia de hoje e explorar a rica história dos lugares ao seu redor. Disponível em português, inglês e italiano.

## ✨ Funcionalidades

### 📅 Hoje na História
- Visualize eventos históricos significativos que aconteceram no dia de hoje
- Descubra aniversários de pessoas famosas
- Informações detalhadas extraídas da Wikipedia em tempo real
- Suporte multilíngue (Português, English, Italiano)

### 📍 Aqui na História
- Use geolocalização para descobrir locais históricos próximos a você
- Veja a distância até cada local histórico
- Leia resumos detalhados de cada lugar
- Links diretos para artigos completos da Wikipedia

### 🌐 PWA Features
- **Instalável**: Funciona como um app nativo no seu smartphone
- **Offline**: Cache inteligente para acesso sem internet
- **Responsivo**: Interface otimizada para mobile e desktop
- **Rápido**: Performance otimizada com Vite e React 19

## 🚀 Tecnologias

### Frontend
- **React 19.0** - Framework UI moderno
- **TypeScript 5.8** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **React Router** - Navegação SPA
- **Lucide React** - Ícones elegantes
- **Vite 7.1** - Build tool ultrarrápido

### Backend/API
- **Hono** - Framework web leve e rápido
- **Cloudflare Workers** - Edge computing
- **Wikipedia API** - Dados históricos em tempo real
- **Zod** - Validação de schemas

### PWA
- **Service Worker** - Cache offline e estratégias de rede
- **Web Manifest** - Instalação como app
- **Geolocation API** - Localização do usuário
- **Cache API** - Armazenamento offline

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/Arynelson/Mib_History.git
cd Mib_History
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em desenvolvimento:
```bash
npm run dev:vite
```

O app estará disponível em `http://localhost:5173`

## 🏗️ Scripts Disponíveis

```bash
# Desenvolvimento (apenas frontend)
npm run dev:vite

# Build de produção
npm run build

# Lint
npm run lint

# Desenvolvimento com Cloudflare Workers
npm run dev

# Type checking
npm run check
```

## 📁 Estrutura do Projeto

```
MIB_History/
├── public/               # Arquivos estáticos
│   ├── icons/           # Ícones PWA
│   ├── manifest.json    # Web App Manifest
│   └── sw.js           # Service Worker
├── src/
│   ├── react-app/      # Código React
│   │   ├── components/ # Componentes React
│   │   ├── contexts/   # Context API (i18n)
│   │   ├── hooks/      # Custom Hooks
│   │   ├── pages/      # Páginas/Views
│   │   ├── utils/      # Utilitários
│   │   └── App.tsx     # Componente raiz
│   ├── worker/         # Cloudflare Worker
│   │   ├── index.ts    # API Routes
│   │   └── wikipedia.ts # Integração Wikipedia
│   └── shared/         # Código compartilhado
│       └── types.ts    # TypeScript types
├── index.html
├── vite.config.ts
├── wrangler.json       # Cloudflare config
└── package.json
```

## 🎨 Design

O app usa uma paleta de cores inspirada em tons terrosos e históricos:

- **Historia Dark**: `#000706` - Preto profundo
- **Historia Teal**: `#0C7E7E` - Verde-azulado histórico
- **Historia Turquoise**: `#4DD7D7` - Turquesa vibrante
- **Historia Sand**: `#FFF8DC` - Cor de areia antiga

## 🌍 Internacionalização

O app suporta três idiomas através de um sistema de tradução customizado:
- 🇧🇷 Português (padrão)
- 🇺🇸 English
- 🇮🇹 Italiano

A preferência de idioma é salva localmente e persiste entre sessões.

## 🔌 API Endpoints

### GET `/api/today-in-history`
Retorna eventos históricos e aniversários do dia atual.

**Query Parameters:**
- `lang`: pt | en | it (padrão: pt)

**Response:**
```json
{
  "events": [...],
  "births": [...]
}
```

### GET `/api/location-history`
Retorna locais históricos próximos às coordenadas fornecidas.

**Query Parameters:**
- `lat`: latitude (obrigatório)
- `lon`: longitude (obrigatório)
- `lang`: pt | en | it (padrão: pt)

**Response:**
```json
{
  "history": [
    {
      "title": "...",
      "extract": "...",
      "url": "...",
      "distance": 1.5,
      "coordinates": { "lat": ..., "lon": ... }
    }
  ]
}
```

## 📱 PWA Installation

O app pode ser instalado em dispositivos mobile e desktop:

1. Acesse o app no navegador
2. Um prompt de instalação aparecerá automaticamente
3. Clique em "Instalar" para adicionar à tela inicial
4. O app funcionará offline após a instalação

## 🚀 Deploy

### Vercel (Recomendado para SPA)

1. Instale a CLI da Vercel:
```bash
npm i -g vercel
```

2. Execute o deploy:
```bash
vercel
```

### Cloudflare Pages

1. Faça build do projeto:
```bash
npm run build
```

2. Deploy via Wrangler:
```bash
npx wrangler pages deploy dist
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fork o projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 👨‍💻 Autor

**Ary Nelson**
- GitHub: [@Arynelson](https://github.com/Arynelson)

## 🙏 Agradecimentos

- Wikipedia API por fornecer dados históricos ricos e acessíveis
- Comunidade React por ferramentas incríveis
- Cloudflare por infraestrutura edge moderna

