import React from 'react';

function OrdenesItems({ orden, onVerClick }) {
  return (
    <tr className="hover:bg-slate-700/30 transition-colors">
      {/* ID Orden */}
      <td className="px-6 py-3 text-sm text-gray-300">{orden.id_orden}</td>
      
      {/* Producto */}
      <td className="px-6 py-3 text-sm text-gray-300">{orden.producto}</td>
      
      {/* Cliente */}
      <td className="px-6 py-3 text-sm text-gray-300">{orden.cliente}</td>
      
      {/* Cantidad */}
      <td className="px-6 py-3 text-sm text-gray-300">{orden.cantidad}</td>
      
      {/* Prioridad */}
      <td className="px-6 py-3 text-sm">
        <span className={`px-2 py-1 rounded-full text-xs font-medium
          ${orden.prioridad === 'Alta' ? 'bg-red-500/20 text-red-400' :
            orden.prioridad === 'Media' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-green-500/20 text-green-400'}`}
        >
          {orden.prioridad}
        </span>
      </td>
      
      {/* Fecha Inicio */}
      <td className="px-6 py-3 text-sm text-gray-300">
        {new Date(orden.fecha_inicio).toLocaleDateString()}
      </td>
      
      {/* Fecha Entrega */}
      <td className="px-6 py-3 text-sm text-gray-300">
        {new Date(orden.fecha_entrega).toLocaleDateString()}
      </td>
      
      {/* Acciones */}
      <td className="px-6 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onVerClick}
            className="p-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded transition-colors"
            title="Ver detalles"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>

          {/* Botón Actualizar */}
          <button className="p-1.5 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 rounded transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          {/* Botón Eliminar */}
          <button className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </td>

      <td className="px-6 py-3 text-sm">
  <span className={`px-2 py-1 rounded-full text-xs font-medium
    ${orden.estado === 'PENDIENTE' ? 'bg-yellow-500/20 text-yellow-400' :
      orden.estado === 'EN_PROCESO' ? 'bg-blue-500/20 text-blue-400' :
      orden.estado === 'COMPLETADA' ? 'bg-green-500/20 text-green-400' :
      orden.estado === 'CANCELADA' ? 'bg-red-500/20 text-red-400' :
      'bg-gray-500/20 text-gray-400'}`}
  >
    {orden.estado || 'PENDIENTE'}
  </span>
</td>
    </tr>
  );
}

export default OrdenesItems;