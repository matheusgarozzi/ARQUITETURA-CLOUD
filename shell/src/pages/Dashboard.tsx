import React from 'react'
import { useNavigate } from 'react-router-dom'

const STATS = [
  { label: 'Agendamentos hoje',  value: '12',  delta: '+3 vs ontem',   color: 'bg-unimed-green' },
  { label: 'Aguard. autorização', value: '4',  delta: '2 urgentes',    color: 'bg-unimed-accent' },
  { label: 'Notificações enviadas', value: '38', delta: 'Últimas 24h', color: 'bg-unimed-teal' },
  { label: 'Fila de espera',    value: '7',    delta: 'Atualizado agora', color: 'bg-gray-600' },
]

const QUICK = [
  { label: 'Novo agendamento',    to: '/agendamento/novo',     icon: '＋', desc: 'Marcar consulta ou exame' },
  { label: 'Ver notificações',    to: '/notificacoes',         icon: '◎', desc: 'Histórico de comunicações' },
  { label: 'Fila de espera',      to: '/agendamento/fila',     icon: '≡',  desc: 'Gerenciar lista de espera' },
  { label: 'Pré-autorizações',    to: '/agendamento/autorizacao', icon: '✓', desc: 'Revisar pendências' },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h2 className="font-display text-2xl text-unimed-dark">Bom dia, Wallace ✦</h2>
        <p className="text-gray-500 text-sm mt-1">Aqui está o resumo de hoje.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map(({ label, value, delta, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={`w-2 h-2 rounded-full ${color} mb-3`} />
            <p className="text-3xl font-semibold text-gray-800">{value}</p>
            <p className="text-sm text-gray-500 mt-1">{label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{delta}</p>
          </div>
        ))}
      </div>

      {/* Quick access */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
          Acesso rápido
        </h3>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {QUICK.map(({ label, to, icon, desc }) => (
            <button
              key={to}
              onClick={() => navigate(to)}
              className="text-left bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-unimed-green hover:shadow-md transition-all group"
            >
              <span className="text-2xl text-unimed-green group-hover:scale-110 inline-block transition-transform">
                {icon}
              </span>
              <p className="font-semibold text-gray-800 mt-3 text-sm">{label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
          Agendamentos recentes
        </h3>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Beneficiário', 'Prestador', 'Data', 'Tipo', 'Status'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { ben: 'Maria Silva',   prest: 'Dr. Carlos Mendes',  data: '30/03 09:00', tipo: 'Consulta',  status: 'Confirmado' },
                { ben: 'João Oliveira', prest: 'Clínica Saúde+',     data: '30/03 10:30', tipo: 'Exame',     status: 'Aguardando' },
                { ben: 'Ana Souza',     prest: 'Dra. Paula Ramos',   data: '31/03 14:00', tipo: 'Consulta',  status: 'Pendente' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-gray-700">{row.ben}</td>
                  <td className="px-5 py-3 text-gray-500">{row.prest}</td>
                  <td className="px-5 py-3 text-gray-500">{row.data}</td>
                  <td className="px-5 py-3 text-gray-500">{row.tipo}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      row.status === 'Confirmado' ? 'bg-green-100 text-green-700' :
                      row.status === 'Aguardando' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
