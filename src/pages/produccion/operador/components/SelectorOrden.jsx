import React from 'react';

function SelectorOrden({ ordenes, valorSeleccionado, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        📋 Orden de Producción <span className="text-red-400">*</span>
      </label>
      <select
        value={valorSeleccionado?.id_orden || ''}
        onChange={(e) => {
          const ordenSeleccionada = ordenes.find(
            orden => orden.id_orden === parseInt(e.target.value)
          );
          onChange(ordenSeleccionada || null);
        }}
        className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
      >
        <option value="">Selecciona una orden</option>
        {ordenes.map((orden) => (
          <option key={orden.id_orden} value={orden.id_orden}>
            #{orden.id_orden} - {orden.producto} ({orden.cliente})
          </option>
        ))}
      </select>
      {ordenes.length === 0 && (
        <p className="text-xs text-yellow-400 mt-1">
          ⚠️ No hay órdenes disponibles en estado "En Proceso"
        </p>
      )}
    </div>
  );
}

export default SelectorOrden;