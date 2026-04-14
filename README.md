# ✦ ARION Health — Plataforma de Monitoramento Inteligente

> *"Se não funciona em um dia de crise de fadiga, não está pronto."*

ARIAN é uma plataforma MVP de monitoramento de saúde para pessoas com doenças crônicas e raras. Usa **Design Cognitivo** e **Gamificação Utilitária** para tornar o autocuidado simples, rápido e motivador — mesmo nos dias mais difíceis.

O nome **Arian** vem do galês para *prata* — referência ao sistema de recompensas e à comunidade zebra das doenças raras.

---

## Os 3 Pilares do Produto

### 1. Semáforo Visual
Interface dinâmica que traduz dados inseridos em cores universais (**Verde / Amarelo / Vermelho**) instantaneamente. Zero interpretação, zero carga cognitiva.

### 2. Arion Star ✦
Sistema de streaks e badges prateados. Após **5 dias consecutivos** de registro, o usuário desbloqueia a Arion Star — efeito visual de brilho prateado via CSS keyframes.

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
```
React 18          → Componentização, estados reativos
JavaScript ES2022 → Lógica de gamificação, LocalStorage
HTML5 semântico   → Acessibilidade, inputs grandes, ARIA
CSS3              → Variáveis CSS, Flexbox/Grid, animações
PWA               → Instalável, offline-first, notificações
```

### Back-end (MVP)
```
Node.js + Express → API REST para registros diários
LocalStorage      → Persistência local (fase 1)
Motor de Regras   → Verifica streaks → ARIAN_SILVER / ARIAN_GOLD
```

### Integrações (protótipo/mock)
```
setInterval mock  → Simulação de dados de smartwatch
HealthKit mock    → Sincronização passiva simulada
Google Fit mock   → Integração futura
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

/* Arion Star */
--color-silver:    #C0C0C0    /* Prata — streak ativo */
--color-gold:      #FFD700    /* Ouro — streak premium */
```

### Tipografia

```css
--font-display: 'Outfit', sans-serif   /* Títulos, logo */
--font-body:    'DM Sans', sans-serif  /* Corpo, labels */
```

### Animações

```css
/* Arian Glow — brilho prateado ao atingir streak */
@keyframes arianGlow {
  0%, 100% { box-shadow: 0 0 8px rgba(192,192,192,0.4); }
  50%       { box-shadow: 0 0 24px rgba(192,192,192,0.9), 
                           0 0 48px rgba(192,192,192,0.4); }
}

/* Semáforo pulse — feedback ao registrar */
@keyframes statusPulse {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.05); }
  100% { transform: scale(1); }
}
```

---

## Estrutura do Projeto

```
arion-health/
├── public/
│   ├── favicon.ico            # Ícone 4 pétalas neon
│   ├── manifest.json          # PWA manifest
│   └── assets/
│       ├── logo-accent.png    # Logo fundo neon
│       ├── logo-branco.png    # Logo branco
│       └── logo-preto.png     # Logo preto
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.jsx       # Shell principal, nav, layout
│   │   │   ├── BottomNav.jsx      # Navegação mobile
│   │   │   └── Header.jsx         # Cabeçalho com logo
│   │   │
│   │   ├── dashboard/
│   │   │   ├── StatusCard.jsx     # Card semáforo principal
│   │   │   ├── ModuleGrid.jsx     # Grid 4 módulos (pétalas)
│   │   │   ├── ModuleCard.jsx     # Card individual de módulo
│   │   │   └── QuickCheckIn.jsx   # Check-in rápido 1-tap
│   │   │
│   │   ├── tracking/
│   │   │   ├── PainTracker.jsx    # Módulo dor/articulações
│   │   │   ├── HeartTracker.jsx   # Módulo cardíaco
│   │   │   ├── RareTracker.jsx    # Módulo doenças raras
│   │   │   └── EnergyTracker.jsx  # Módulo energia/fadiga
│   │   │
│   │   ├── gamification/
│   │   │   ├── ArianStar.jsx      # Componente da estrela
│   │   │   ├── StreakCounter.jsx  # Contador de dias consecutivos
│   │   │   └── BadgeGrid.jsx      # Grade de conquistas
│   │   │
│   │   └── ui/
│   │       ├── SemaphoreIndicator.jsx  # Dot colorido semáforo
│   │       ├── ScaleInput.jsx          # Input escala 0–10
│   │       ├── QuickPicker.jsx         # Botões de seleção rápida
│   │       └── ExportButton.jsx        # Exportar para médico
│   │
│   ├── hooks/
│   │   ├── useStreak.js       # Lógica de streak/gamificação
│   │   ├── useCheckIn.js      # Lógica de check-in diário
│   │   ├── useSemaphore.js    # Lógica de cores semáforo
│   │   └── useSmartwatch.js   # Mock de dados wearable
│   │
│   ├── store/
│   │   ├── useStore.js        # Estado global (Zustand ou Context)
│   │   └── persistence.js     # LocalStorage helpers
│   │
│   ├── utils/
│   │   ├── gamification.js    # Motor de regras: streak, badges
│   │   ├── semaphore.js       # Lógica de cores por valores
│   │   ├── export.js          # Geração de relatório PDF/imagem
│   │   └── constants.js       # Constantes do projeto
│   │
│   ├── pages/
│   │   ├── Home.jsx           # Dashboard principal
│   │   ├── CheckIn.jsx        # Tela de check-in diário
│   │   ├── History.jsx        # Histórico e gráficos
│   │   ├── Profile.jsx        # Perfil e configurações
│   │   └── Export.jsx         # Relatório para médico
│   │
│   ├── styles/
│   │   ├── globals.css        # CSS variables, reset, base
│   │   ├── animations.css     # Keyframes: arianGlow, etc.
│   │   └── semaphore.css      # Classes utilitárias semáforo
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── vite.config.js
├── README.md
└── CLAUDE.md
```

---

## Instalação e Desenvolvimento

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

### Dependências Principais

```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x",
  "zustand": "^4.x",
  "recharts": "^2.x",
  "lucide-react": "^0.x",
  "vite": "^5.x"
}
```

---

## Hipóteses do Produto

| # | Hipótese | Métricas |
|---|----------|----------|
| H1 | **Check-in de 3s** via widget one-tap aumenta retenção | DAU, taxa de check-in |
| H2 | **Sync passiva** de smartwatch reduz esforço manual | % registros automáticos |
| H3 | **Diário de Gatilhos** com ícones melhora adesão | entradas/semana |
| H4 | **Arian Star** transforma monitoramento em validação emocional | streak médio, churn |

---

## Contexto de Doenças Raras

O símbolo da **zebra** 🦴 representa a comunidade de doenças raras — baseado no ditado médico *"quando ouvir barulho de cascos, pense em cavalos, não em zebras"*. Pacientes com doenças raras **são** as zebras. O ARIAN foi construído por e para essa comunidade.

**Condições suportadas no MVP:**
- Síndrome de Ehlers-Danlos (SED/EDS)
- Fibromialgia
- Síndrome de Ativação de Mastócitos (SAMA/MCAS)
- Disautonomia / POTS
- Síndrome de Fadiga Crônica (SFC/ME)

---

## Acessibilidade

- Inputs com área mínima de toque de **44×44px**
- Contraste mínimo **4.5:1** (WCAG AA)
- Suporte a **modo de alto contraste** do sistema
- Navegação completa por **teclado**
- Labels ARIA em todos os controles interativos
- Fontes mínimas de **16px** para leitura fácil em fadiga

---

## Licença

Projeto privado — MVP em desenvolvimento.  
© 2025 ARIAN Health
