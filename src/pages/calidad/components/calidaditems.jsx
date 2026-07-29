import React from 'react';

function CalidadItems({ inspeccion, onVer, onAceptar, onRechazar }) {
  // Función para obtener el color del estado
  const getEstadoColor = (estado) => {
    const colores = {
      'Pendiente': 'bg-yellow-500/20 text-yellow-400',
      'Aceptado': 'bg-green-500/20 text-green-400',
      'Rechazado': 'bg-red-500/20 text-red-400'
    };
    return colores[estado] || 'bg-gray-500/20 text-gray-400';
  };

  // Función para obtener el color del tipo de inspección
  const getTipoColor = (tipo) => {
    const colores = {
      'Primera Pieza (Setup)': 'bg-blue-500/20 text-blue-400',
      'Final de Producción (Lote)': 'bg-purple-500/20 text-purple-400'
    };
    return colores[tipo] || 'bg-gray-500/20 text-gray-400';
  };

  // Función para manejar el click en Ver
  const handleVer = () => {
    if (onVer) {
      onVer(inspeccion);
    }
  };

  // Función para manejar el click en Aceptar
  const handleAceptar = () => {
    if (onAceptar) {
      onAceptar(inspeccion);
    }
  };

  // Función para manejar el click en Rechazar
  const handleRechazar = () => {
    if (onRechazar) {
      onRechazar(inspeccion);
    }
  };

  // Verificar si la inspección ya está aceptada o rechazada
  const estaFinalizada = inspeccion.estado === 'Aceptado' || inspeccion.estado === 'Rechazado';

  return (
    <tr className="hover:bg-slate-700/30 transition-colors">
      <td className="px-3 py-2 whitespace-nowrap text-sm text-white">{inspeccion.orden}</td>
      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-300">{inspeccion.producto}</td>
      <td className="px-3 py-2 whitespace-nowrap">
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTipoColor(inspeccion.tipo)}`}>
          {inspeccion.tipo}
        </span>
      </td>
      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300">{inspeccion.operador}</td>
      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300">{inspeccion.maquina}</td>
      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300">{inspeccion.fecha}</td>
      <td className="px-3 py-2 whitespace-nowrap">
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(inspeccion.estado)}`}>
          {inspeccion.estado}
        </span>
      </td>
      <td className="px-3 py-2 whitespace-nowrap">
        <div className="flex items-center justify-center gap-2">
          {/* Botón Ver - Siempre visible */}
          <button
            onClick={handleVer}
            className="p-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 transition-colors"
            title="Ver detalles"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>

          {/* Botón Aceptar - Deshabilitado si ya está finalizada */}
          <button
            onClick={handleAceptar}
            disabled={estaFinalizada}
            className={`p-1.5 rounded-lg transition-colors ${
              estaFinalizada 
                ? 'bg-green-500/10 text-green-400/50 cursor-not-allowed' 
                : 'bg-green-500/20 hover:bg-green-500/40 text-green-400'
            }`}
            title={estaFinalizada ? 'Inspección ya finalizada' : 'Aceptar inspección'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>

          {/* Botón Rechazar - Deshabilitado si ya está finalizada */}
          <button
            onClick={handleRechazar}
            disabled={estaFinalizada}
            className={`p-1.5 rounded-lg transition-colors ${
              estaFinalizada 
                ? 'bg-red-500/10 text-red-400/50 cursor-not-allowed' 
                : 'bg-red-500/20 hover:bg-red-500/40 text-red-400'
            }`}
            title={estaFinalizada ? 'Inspección ya finalizada' : 'Rechazar inspección'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default CalidadItems;