// MeusAgendamentos.tsx
import React from 'react'

const AGENDAMENTOS = [
  { id:1, tipo:'Consulta',  esp:'Cardiologia',  prest:'Dr. Roberto Farias', data:'02/04/2026 09:00', status:'Confirmado' },
  { id:2, tipo:'Exame',     esp:'Laboratório',  prest:'Clínica Saúde+',     data:'05/04/2026 14:30', status:'Aguardando' },
  { id:3, tipo:'Consulta',  esp:'Dermatologia', prest:'Dra. Fernanda Costa', data:'10/04/2026 11:00', status:'Pendente' },
]

export default function MeusAgendamentos() {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-gray-700">Meus Agendamentos</h2>
      {AGENDAMENTOS.map(a => (
        <div key={a.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-800">{a.tipo} — {a.esp}</p>
            <p className="text-sm text-gray-500 mt-0.5">{a.prest}</p>
            <p className="text-sm text-gray-400 mt-0.5">{a.data}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
              a.status === 'Confirmado' ? 'bg-green-100 text-green-700' :
              a.status === 'Aguardando' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'
            }`}>{a.status}</span>
            <button className="text-xs text-red-400 hover:text-red-600 transition-colors">Cancelar</button>
          </div>
        </div>
      ))}
    </div>
  )
}
