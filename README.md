# ✦ ARIAN Health — Plataforma de Monitoramento Inteligente

> *"Se não funciona em um dia de crise de fadiga, não está pronto."*

ARIAN é uma plataforma de monitoramento de saúde para pessoas com doenças crônicas e raras. Usa **Design Cognitivo** e **Gamificação Utilitária** para tornar o autocuidado simples, rápido e motivador — mesmo nos dias mais difíceis.

O nome **Arian** vem do galês para *prata* — referência ao sistema de recompensas e à comunidade zebra das doenças raras.

**Deploy:** [arion-health-9142.vercel.app](https://arion-health-9142.vercel.app)

---

## Os 3 Pilares do Produto

### 1. Semáforo Visual
Interface dinâmica que traduz dados inseridos em cores universais (**Verde / Amarelo / Vermelho**) instantaneamente. Zero interpretação, zero carga cognitiva.

### 2. Arian Star ✦
Sistema de streaks e badges prateados. Após **5 dias consecutivos** de registro, o usuário desbloqueia a Arian Star — efeito visual de brilho prateado via CSS keyframes.

### 3. Módulo de Doenças Raras
Campos personalizáveis para SED, Fibromialgia, SAMA, Disautonomia e outras condições. Dashboard exportável para compartilhar histórico com médicos.

---

## Os 4 Módulos de Monitoramento

| Módulo | Ícone | Descrição |
|--------|-------|-----------|
| **Dor & Articulações** | 🦾 | Registro de dor articular, escala 0–10 |
| **Monitoramento Cardíaco** | 💓 | Batimentos, pressão, sintomas de Disautonomia |
| **Sintomas Raros** | 🛡️ | Gatilhos de SAMA, crises, reações |
| **Energia & Fadiga** | ⚡ | Nível de energia, PEM, qualidade do sono |

---

## Stack Tecnológica

### Front-end
| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| React | 18 | Componentização e estados reativos |
| Vite | 6 | Bundler e servidor de desenvolvimento |
| React Router | 6 | Roteamento SPA |
| Zustand | 5 | Estado global por slices |
| Recharts | 2 | Gráficos de histórico |
| Lucide React | latest | Ícones |
| vite-plugin-pwa | latest | PWA / instalável / offline |

### Back-end
| Tecnologia | Uso |
|-----------|-----|
| Supabase | Banco de dados PostgreSQL, Auth, RLS |
| Supabase Auth | Cadastro, login e sessão do usuário |

### Infraestrutura
| Tecnologia | Uso |
|-----------|-----|
| Vercel | Hospedagem do front-end (deploy automático via GitHub) |
| Docker + Nginx | Build alternativo para ambiente local / self-hosted |

---

## Estrutura do Projeto

```
ARION-Health/
├── public/
│   └── assets/
│       ├── zebra.png            # Imagem do painel de cadastro/login
│       ├── favicon-192.png      # PWA icon
│       └── favicon-512.png      # PWA icon
│
├── src/
│   ├── components/
│   │   ├── gamification/
│   │   │   ├── BadgeGrid/       # Grade de conquistas
│   │   │   └── StreakCounter/   # Contador de dias consecutivos
│   │   │
│   │   ├── layout/
│   │   │   ├── AppShell/        # Shell principal com navegação
│   │   │   ├── Header/          # Cabeçalho com logo e ArianStar
│   │   │   ├── SubTabNav/       # Abas secundárias de módulos
│   │   │   └── TopNav/          # Navegação principal superior
│   │   │
│   │   ├── tracking/
│   │   │   ├── AnnotationsTracker/  # Anotações e gatilhos
│   │   │   ├── PanTrackerCard/      # Tracker de dor
│   │   │   └── SymptomsTracker/     # Tracker de sintomas raros
│   │   │
│   │   └── ui/
│   │       ├── ArianStar/           # Estrela de streak ativa
│   │       ├── CircularGauge/       # Gauge circular animado
│   │       ├── MoodPicker/          # Seletor de humor/estado
│   │       ├── PercentSlider/       # Slider de 0–100%
│   │       ├── ProgressStepper/     # Stepper de progresso
│   │       ├── QuickPicker/         # Botões de seleção rápida
│   │       └── SemaphoreIndicator/  # Indicador semáforo (dot colorido)
│   │
│   ├── hooks/
│   │   ├── useAuth.js           # Cadastro, login, logout via Supabase
│   │   └── useStreak.js         # Lógica de streak e gamificação
│   │
│   ├── lib/
│   │   └── supabase.js          # Cliente Supabase configurado
│   │
│   ├── pages/
│   │   ├── Register.jsx         # Tela de cadastro
│   │   ├── Login.jsx            # Tela de login
│   │   ├── Onboarding.jsx       # Onboarding inicial
│   │   ├── Registro.jsx         # Dashboard de registro diário
│   │   ├── History.jsx          # Histórico e linha do tempo
│   │   ├── HistoryCharts.jsx    # Gráficos de evolução
│   │   ├── Consultas.jsx        # Gestão de consultas médicas
│   │   ├── Medicamentos.jsx     # Controle de medicamentos
│   │   ├── Recomendacoes.jsx    # Recomendações personalizadas
│   │   ├── Profile.jsx          # Perfil e configurações
│   │   └── Export.jsx           # Exportar relatório para médico
│   │
│   ├── store/
│   │   ├── useStore.js          # Store Zustand principal
│   │   └── slices/
│   │       ├── authSlice.js
│   │       ├── checkInSlice.js
│   │       ├── historySlice.js
│   │       ├── profileSlice.js
│   │       ├── streakSlice.js
│   │       ├── smartwatchSlice.js
│   │       └── accessibilitySlice.js
│   │
│   ├── utils/
│   │   ├── constants.js         # Constantes globais
│   │   ├── export.js            # Geração de relatório
│   │   ├── gamification.js      # Motor de regras: streak, badges
│   │   ├── persistence.js       # Helpers de persistência
│   │   └── semaphore.js         # Lógica de cores por valores
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── supabase/
│   └── schema.sql               # Schema do banco de dados
│
├── .env.example                 # Template de variáveis de ambiente
├── Dockerfile                   # Build multi-stage (Node → Nginx)
├── docker-compose.yml           # Orquestração local com variáveis
├── nginx.conf                   # Configuração Nginx para SPA
├── vercel.json                  # Configuração de deploy na Vercel
└── package.json
```

---

## Configuração e Desenvolvimento

### Pré-requisitos
- Node.js 20+
- Conta no [Supabase](https://supabase.com)

### 1. Clonar e instalar

```bash
git clone https://github.com/Fedizko/ARION-Health.git
cd ARION-Health
npm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Edite `.env` com suas credenciais do Supabase:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key
```

### 3. Criar schema no banco

No painel do Supabase, acesse **SQL Editor** e execute o conteúdo de `supabase/schema.sql`.

### 4. Iniciar em desenvolvimento

```bash
npm run dev
```

---

## Deploy

### Vercel (recomendado)

O projeto possui `vercel.json` configurado. Para fazer deploy:

1. Importe o repositório em [vercel.com/new](https://vercel.com/new)
2. Adicione as variáveis de ambiente no painel da Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Clique em **Deploy**

A partir daí, **cada `git push origin master` dispara um novo deploy automaticamente**.

### Docker (self-hosted)

```bash
# Build e subir
docker compose up --build -d

# Acessar em http://localhost:3000
```

As variáveis de ambiente são lidas do `.env` e passadas como build args para o Vite.

---

## Design System

### Paleta de Cores

```css
--color-bg:        #000000    /* Fundo principal */
--color-bg-card:   #111111    /* Superfície de cards */
--color-bg-raised: #1A1A1A    /* Cards elevados */
--color-accent:    #CAFF00    /* Lime neon — ação principal */
--color-text:      #FFFFFF    /* Texto primário */
--color-muted:     #888888    /* Texto secundário */
--color-border:    #2A2A2A    /* Bordas sutis */

/* Sistema Semáforo */
--color-green:     #22C55E    /* Estado bom */
--color-yellow:    #EAB308    /* Atenção */
--color-red:       #EF4444    /* Crise */

/* Arian Star */
--color-silver:    #C0C0C0    /* Prata — streak ativo */
--color-gold:      #FFD700    /* Ouro — streak premium */
```

### Tipografia

```css
--font-display: 'Outfit', sans-serif   /* Títulos, logo */
--font-body:    'DM Sans', sans-serif  /* Corpo, labels */
```

---

## Persona Central: Mariana

```
Idade: 28 anos | São Paulo
Profissão: Fisioterapeuta e Recepcionista
Condições: SED, Fibromialgia, SAMA, Disautonomia
Tech level: Baixo/moderado
```

**Dores principais:**
- Fadiga crônica — o app precisa ser extremamente rápido
- Múltiplas patologias simultâneas para monitorar
- Precisa levar dados visuais organizados para vários especialistas

---

## Acessibilidade

- Inputs com área mínima de toque de **44×44px**
- Contraste mínimo **4.5:1** (WCAG AA)
- Navegação completa por **teclado**
- Labels ARIA em todos os controles interativos
- Fontes mínimas de **16px** para leitura fácil em fadiga

---

## Contexto: A Zebra

O símbolo da **zebra** representa a comunidade de doenças raras — baseado no ditado médico *"quando ouvir barulho de cascos, pense em cavalos, não em zebras"*. Pacientes com doenças raras **são** as zebras. O ARIAN foi construído por e para essa comunidade.

**Condições suportadas:**
- Síndrome de Ehlers-Danlos (SED/EDS)
- Fibromialgia
- Síndrome de Ativação de Mastócitos (SAMA/MCAS)
- Disautonomia / POTS
- Síndrome de Fadiga Crônica (SFC/ME)

---

## Licença

Projeto privado — em desenvolvimento ativo.
© 2026 ARIAN Health
