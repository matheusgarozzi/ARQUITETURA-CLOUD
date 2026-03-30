import React, { useState } from 'react'

type Canal = 'todos' | 'email' | 'sms' | 'push'
type Tipo  = 'Confirmação' | 'Lembrete' | 'Cancelamento' | 'Autorização'

interface Notificacao {
  id: number
  tipo: Tipo
  canal: 'email' | 'sms' | 'push'
  destinatario: string
  mensagem: string
  enviadoEm: string
  status: 'Entregue' | 'Falhou' | 'Pendente'
}

const NOTIFICACOES: Notificacao[] = [
  { id:1, tipo:'Confirmação',  canal:'email', destinatario:'maria.silva@email.com',  mensagem:'Sua consulta com Dr. Carlos Mendes foi confirmada para 02/04 às 09:00.', enviadoEm:'30/03/2026 08:12', status:'Entregue' },
  { id:2, tipo:'Lembrete',     canal:'sms',   destinatario:'+55 41 99999-0001',       mensagem:'Lembrete: você tem consulta amanhã às 09:00 com Dr. Carlos Mendes.',      enviadoEm:'30/03/2026 08:00', status:'Entregue' },
  { id:3, tipo:'Confirmação',  canal:'push',  destinatario:'app:joao-oliveira',        mensagem:'Seu exame na Clínica Saúde+ foi agendado para 05/04 às 14:30.',          enviadoEm:'29/03/2026 17:30', status:'Entregue' },
  { id:4, tipo:'Cancelamento', canal:'email', destinatario:'ana.souza@email.com',     mensagem:'Seu agendamento com Dra. Paula Ramos foi cancelado.',                     enviadoEm:'28/03/2026 11:05', status:'Falhou'   },
  { id:5, tipo:'Autorização',  canal:'sms',   destinatario:'+55 41 99999-0004',       mensagem:'Sua solicitação de Ressonância Magnética foi autorizada.',                enviadoEm:'28/03/2026 09:45', status:'Entregue' },
  { id:6, tipo:'Lembrete',     canal:'push',  destinatario:'app:carlos-nunes',         mensagem:'Lembrete: você tem exame em 2 dias — Colonoscopia na Clínica Saúde+.',   enviadoEm:'27/03/2026 08:00', status:'Pendente' },
]

const CANAL_ICON: Record<string, string> = { email: '✉', sms: '✆', push: '⬡' }
const CANAL_COLOR: Record<string, string> = {
  email: 'bg-blue-100 text-blue-700',
  sms:   'bg-purple-100 text-purple-700',
  push:  'bg-orange-100 text-orange-700',
}
const TIPO_COLOR: Record<string, string> = {
  'Confirmação':  'bg-green-100 text-green-700',
  'Lembrete':     'bg-yellow-100 text-yellow-700',
  'Cancelamento': 'bg-red-100 text-red-700',
  'Autorização':  'bg-teal-100 text-teal-700',
}
const STATUS_COLOR: Record<string, string> = {
  'Entregue': 'text-green-600',
  'Falhou':   'text-red-500',
  'Pendente': 'text-gray-400',
}

export default function HistoricoNotificacoes() {
  const [filtroCanal, setFiltroCanal] = useState<Canal>('todos')
  const [busca, setBusca] = useState('')
  const [expandido, setExpandido] = useState<number | null>(null)

  const filtradas = NOTIFICACOES.filter(n => {
    const porCanal = filtroCanal === 'todos' || n.canal === filtroCanal
    const porBusca = n.destinatario.toLowerCase().includes(busca.toLowerCase())
      || n.tipo.toLowerCase().includes(busca.toLowerCase())
    return porCanal && porBusca
  })

  const stats = {
    total:    NOTIFICACOES.length,
    entregues: NOTIFICACOES.filter(n => n.status === 'Entregue').length,
    falhas:    NOTIFICACOES.filter(n => n.status === 'Falhou').length,
    pendentes: NOTIFICACOES.filter(n => n.status === 'Pendente').length,
  }

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total enviadas',  value: stats.total,     cor: 'border-l-gray-400'         },
          { label: 'Entregues',       value: stats.entregues, cor: 'border-l-green-500'        },
          { label: 'Falhas',          value: stats.falhas,    cor: 'border-l-red-400'          },
          { label: 'Pendentes',       value: stats.pendentes, cor: 'border-l-yellow-400'       },
        ].map(({ label, value, cor }) => (
          <div key={label} className={`bg-white rounded-xl border border-gray-100 border-l-4 ${cor} shadow-sm px-4 py-3`}>
            <p className="text-2xl font-semibold text-gray-800">{value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <input
          value={busca}
          onChange={e => setBusca(e.target.value)}
          placeholder="Buscar por destinatário ou tipo..."
          className="border border-gray-200 rounded-xl px-4 py-2 text-sm w-72 focus:outline-none focus:border-unimed-teal transition-colors"
        />
        <div className="flex gap-1 bg-white rounded-xl p-1 border border-gray-100 shadow-sm">
          {(['todos','email','sms','push'] as Canal[]).map(c => (
            <button
              key={c}
              onClick={() => setFiltroCanal(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                filtroCanal === c
                  ? 'bg-unimed-teal text-white'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {c === 'todos' ? 'Todos' : `${CANAL_ICON[c]} ${c.toUpperCase()}`}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-2">
        {filtradas.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">Nenhuma notificação encontrada.</div>
        )}
        {filtradas.map(n => (
          <div
            key={n.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <button
              onClick={() => setExpandido(expandido === n.id ? null : n.id)}
              className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
            >
              {/* Canal badge */}
              <span className={`text-xs px-2 py-1 rounded-full font-medium w-16 text-center ${CANAL_COLOR[n.canal]}`}>
                {CANAL_ICON[n.canal]} {n.canal.toUpperCase()}
              </span>

              {/* Tipo badge */}
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${TIPO_COLOR[n.tipo]}`}>
                {n.tipo}
              </span>

              {/* Destinatário */}
              <span className="text-sm text-gray-700 flex-1 truncate">{n.destinatario}</span>

              {/* Data */}
              <span className="text-xs text-gray-400 whitespace-nowrap">{n.enviadoEm}</span>

              {/* Status */}
              <span className={`text-xs font-semibold whitespace-nowrap ${STATUS_COLOR[n.status]}`}>
                {n.status === 'Entregue' ? '✓ Entregue' : n.status === 'Falhou' ? '✗ Falhou' : '⏳ Pendente'}
              </span>

              <span className="text-gray-300 text-xs">{expandido === n.id ? '▲' : '▼'}</span>
            </button>

            {/* Expanded detail */}
            {expandido === n.id && (
              <div className="px-5 pb-4 border-t border-gray-50">
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">{n.mensagem}</p>
                {n.status === 'Falhou' && (
                  <button className="mt-3 text-xs text-unimed-teal font-medium hover:underline">
                    ↺ Reenviar notificação
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
