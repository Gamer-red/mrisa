import React from 'react';

function SelectorProceso({ procesos, valorSeleccionado, onChange, ordenId }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        ⚙️ Proceso <span className="text-red-400">*</span>
      </label>
      <select
        value={valorSeleccionado?.id_proceso || ''}
        onChange={(e) => {
          const procesoSeleccionado = procesos.find(
            proc => proc.id_proceso === parseInt(e.target.value)
          );
          onChange(procesoSeleccionado || null);
        }}
        className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
        disabled={!ordenId}
      >
        <option value="">
          {ordenId ? 'Selecciona un proceso' : 'Primero selecciona una orden'}
        </option>
        {procesos.map((proceso) => (
          <option key={proceso.id_proceso} value={proceso.id_proceso}>
            {proceso.nombre_operacion} ({proceso.tipo_proceso})
          </option>
        ))}
      </select>
      {ordenId && procesos.length === 0 && (
        <p className="text-xs text-yellow-400 mt-1">
          ⚠️ Esta orden no tiene procesos disponibles
        </p>
      )}
    </div>
  );
}

export default SelectorProceso;