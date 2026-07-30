import React from 'react';

function MetrologiaItems({ instrumento, onVer, onEditar, onEliminar }) {
  // Función para obtener el color del estado
  const getEstadoColor = (estado) => {
    const colores = {
      'Activo': 'bg-green-500/20 text-green-400',
      'Inactivo': 'bg-red-500/20 text-red-400',
      'En Calibración': 'bg-yellow-500/20 text-yellow-400'
    };
    return colores[estado] || 'bg-gray-500/20 text-gray-400';
  };

  // Función para obtener el color del tipo de instrumento
  const getTipoColor = (tipo) => {
    const colores = {
      'Calibrador': 'bg-blue-500/20 text-blue-400',
      'Micrómetro': 'bg-purple-500/20 text-purple-400',
      'Galga': 'bg-orange-500/20 text-orange-400',
      'Medidor': 'bg-green-500/20 text-green-400'
    };
    return colores[tipo] || 'bg-gray-500/20 text-gray-400';
  };

  return (
    <tr className="hover:bg-slate-700/30 transition-colors">
      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-400 font-mono">{instrumento.codigoInterno}</td>
      <td className="px-3 py-2 whitespace-nowrap text-sm text-white">{instrumento.nombre}</td>
      <td className="px-3 py-2 whitespace-nowrap">
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTipoColor(instrumento.tipo)}`}>
          {instrumento.tipo}
        </span>
      </td>
      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300">{instrumento.ubicacion}</td>
      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300">{instrumento.marca}</td>
      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300">{instrumento.modelo}</td>
      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300">{instrumento.nSerie}</td>
      <td className="px-3 py-2 whitespace-nowrap">
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(instrumento.estado)}`}>
          {instrumento.estado}
        </span>
      </td>
      <td className="px-3 py-2 whitespace-nowrap">
        <div className="flex items-center justify-center gap-2">
          {/* Botón Ver */}
          <button
            onClick={() => onVer(instrumento)}
            className="p-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 transition-colors"
            title="Ver detalles"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>

          {/* Botón Editar */}
          <button
            onClick={() => onEditar(instrumento)}
            className="p-1.5 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-400 transition-colors"
            title="Editar instrumento"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          {/* Botón Eliminar */}
          <button
            onClick={() => onEliminar(instrumento)}
            className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-colors"
            title="Eliminar instrumento"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default MetrologiaItems;