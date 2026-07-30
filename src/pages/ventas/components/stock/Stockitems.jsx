import React from 'react';

function StockItems({ producto, onEntregado, onBorrar }) {
  // Función para manejar el click en Entregado
  const handleEntregado = () => {
    if (onEntregado) {
      onEntregado(producto);
    }
  };

  // Función para manejar el click en Borrar
  const handleBorrar = () => {
    if (onBorrar) {
      onBorrar(producto);
    }
  };

  // Verificar si el producto ya fue entregado
  const estaEntregado = producto.entregado === true;

  return (
    <tr className="hover:bg-slate-700/30 transition-colors">
      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-300">{producto.nombre}</td>
      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-300">{producto.cantidad}</td>
      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-300">{producto.fecha}</td>
      <td className="px-3 py-2 whitespace-nowrap">
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
          estaEntregado 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-yellow-500/20 text-yellow-400'
        }`}>
          {estaEntregado ? 'Entregado' : 'Pendiente'}
        </span>
      </td>
      <td className="px-3 py-2 whitespace-nowrap">
        <div className="flex items-center justify-center gap-2">
          {/* Botón Entregado - Deshabilitado si ya está entregado */}
          <button
            onClick={handleEntregado}
            disabled={estaEntregado}
            className={`p-1.5 rounded-lg transition-colors ${
              estaEntregado 
                ? 'bg-green-500/10 text-green-400/50 cursor-not-allowed' 
                : 'bg-green-500/20 hover:bg-green-500/40 text-green-400'
            }`}
            title={estaEntregado ? 'Ya entregado' : 'Marcar como entregado'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>

          {/* Botón Borrar */}
          <button
            onClick={handleBorrar}
            className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-colors"
            title="Borrar producto"
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

export default StockItems;