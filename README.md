# Unimed — Sistema de Agendamento (Microfrontends)

> **Stack:** React 18 · Vite 5 · Tailwind CSS 3 · Module Federation (`@originjs/vite-plugin-federation`)

---
**URL do site na Azure:** https://lively-flower-0baca9210.4.azurestaticapps.net/

## 1. Visão Geral da Solução

A solução é composta por **três aplicações Vite independentes** que colaboram em tempo de execução via **Module Federation**:

| App | Papel |
|-----|-------|
| `shell` |  Host/orquestrador — layout, roteamento global, autenticação |
| `mfe-agendamento` | Remote — Domínio de Agendamento |
| `mfe-notificacao` | Remote — Domínio de Notificação e Comunicação |

---

## 2. Arquitetura de Microfrontends

```
                        ┌─────────────────────────────┐
                        │         Browser              │
                        └──────────────┬──────────────┘
                                       │
                        ┌──────────────▼────────────── ┐
                        │   Shell (Host)               │
                        │  ┌─────────────────────────┐ │
                        │  │  Layout (Sidebar+Header) │ │
                        │  │  BrowserRouter           │ │
                        │  │  AuthContext             │ │
                        │  └──────────┬──────────────┘ │
                        └────────────┼────────────────-┘
                 ┌───────────────────┼──────────────────┐
                 ▼                                       ▼
  ┌──────────────────────────┐         ┌──────────────────────────┐
  │  mfe-agendamento         │         │  mfe-notificacao         │
  │  expõe: ./App            │         │  expõe: ./App            │
  │  rotas: /agendamento/*   │         │  rotas: /notificacoes/*  │
  └──────────────────────────┘         └──────────────────────────┘
```

### Como o Module Federation funciona aqui

- Cada MFE usa `@originjs/vite-plugin-federation` para **expor** seu `App.tsx` como `remoteEntry.js`.
- O Shell declara os dois remotes e os **importa dinamicamente** via `React.lazy()`.
- As bibliotecas `react`, `react-dom` e `react-router-dom` são marcadas como **shared** — carregadas apenas uma vez pelo Shell.
- O Shell passa o `BrowserRouter` para ambos os MFEs. Cada MFE usa apenas `Routes` internamente (sem `BrowserRouter` próprio), evitando conflito de contexto de roteamento.

---

## 3. Estrutura de Pastas

```
unimed-mfe/
├── shell/                          # Host
│   ├── index.html
│   ├── vite.config.ts              # Module Federation (remotes)
│   ├── tailwind.config.ts
│   └── src/
│       ├── main.tsx                # Entrypoint
│       ├── App.tsx                 # Rotas globais + lazy imports
│       ├── index.css
│       ├── remotes.d.ts            # Tipos TypeScript dos remotes
│       ├── layout/
│       │   └── Shell.tsx           # Sidebar + Header
│       └── pages/
│           └── Dashboard.tsx       # Tela inicial
│
├── mfe-agendamento/                # Remote — Domínio Agendamento
│   ├── vite.config.ts              # Module Federation (exposes)
│   ├── tailwind.config.ts
│   └── src/
│       ├── App.tsx                 # Sub-rotas do domínio
│       ├── index.css
│       └── pages/
│           ├── MeusAgendamentos.tsx
│           ├── NovoAgendamento.tsx  # Wizard 3 etapas
│           ├── BuscarHorarios.tsx
│           ├── FilaEspera.tsx
│           └── Autorizacao.tsx
│
└── mfe-notificacao/                # Remote — Domínio Notificação
    ├── vite.config.ts
    ├── tailwind.config.ts
    └── src/
        ├── App.tsx
        ├── index.css
        └── pages/
            ├── HistoricoNotificacoes.tsx
            ├── Preferencias.tsx
            └── Templates.tsx
```

---

## 4. Tecnologias e Justificativas

| Tecnologia | Justificativa |
|---|---|
| **React 18** | Componentes funcionais, Suspense para lazy loading dos MFEs |
| **Vite 5** | Build ultra-rápido, suporte nativo a ESM — exigido pelo Module Federation |
| **Tailwind CSS 3** | Utilitários compartilhados via configuração idêntica nos três projetos |
| **@originjs/vite-plugin-federation** | Implementação de Module Federation para Vite |
| **React Router v6** | Roteamento declarativo; Shell controla o `BrowserRouter`, MFEs usam `Routes` |

---

## 5. Telas por Domínio

### Shell
| Rota | Tela |
|------|------|
| `/dashboard` | Dashboard com estatísticas e acesso rápido |

### Domínio Agendamento (`/agendamento/*`)
| Rota | Tela |
|------|------|
| `/agendamento` | Lista de agendamentos do beneficiário |
| `/agendamento/novo` | Wizard 3 etapas: tipo → horário → confirmação |
| `/agendamento/buscar` | Busca de horários por prestador/especialidade |
| `/agendamento/fila` | Fila de espera gerenciada pelo operador |
| `/agendamento/autorizacao` | Pré-autorizações pendentes (Auditor Médico) |

### Domínio Notificação (`/notificacoes/*`)
| Rota | Tela |
|------|------|
| `/notificacoes` | Histórico com filtros por canal e status |
| `/notificacoes/preferencias` | Toggles de canal por tipo de evento |
| `/notificacoes/templates` | Edição de templates por evento e canal |
