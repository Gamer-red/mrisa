import React from 'react';

function CotizacionesItems({ cotizacion, onVer, onConfirmar, onEliminar }) {
  // Función para manejar el click en Ver
  const handleVer = () => {
    if (onVer) {
      onVer(cotizacion);
    }
  };

  // Función para manejar el click en Confirmar
  const handleConfirmar = () => {
    if (onConfirmar) {
      onConfirmar(cotizacion);
    }
  };

  // Función para manejar el click en Eliminar
  const handleEliminar = () => {
    if (onEliminar) {
      onEliminar(cotizacion);
    }
  };

  // Verificar si la cotización ya está confirmada
  const estaConfirmada = cotizacion.confirmado === true;

  return (
    <tr className="hover:bg-slate-700/30 transition-colors">
      <td className="px-3 py-2 whitespace-nowrap text-sm text-white font-medium">{cotizacion.numero}</td>
      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-300">{cotizacion.cliente}</td>
      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-300">{cotizacion.fecha}</td>
      <td className="px-3 py-2 whitespace-nowrap">
        <div className="flex items-center justify-center gap-2">
          {/* Botón Ver */}
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

          {/* Botón Confirmar - Deshabilitado si ya está confirmada */}
          <button
            onClick={handleConfirmar}
            disabled={estaConfirmada}
            className={`p-1.5 rounded-lg transition-colors ${
              estaConfirmada 
                ? 'bg-green-500/10 text-green-400/50 cursor-not-allowed' 
                : 'bg-green-500/20 hover:bg-green-500/40 text-green-400'
            }`}
            title={estaConfirmada ? 'Ya confirmada' : 'Confirmar cotización'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>

          {/* Botón Eliminar - Deshabilitado si ya está confirmada */}
          <button
            onClick={handleEliminar}
            disabled={estaConfirmada}
            className={`p-1.5 rounded-lg transition-colors ${
              estaConfirmada 
                ? 'bg-red-500/10 text-red-400/50 cursor-not-allowed' 
                : 'bg-red-500/20 hover:bg-red-500/40 text-red-400'
            }`}
            title={estaConfirmada ? 'No se puede eliminar una cotización confirmada' : 'Eliminar cotización'}
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

export default CotizacionesItems;