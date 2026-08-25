import React from 'react';

function SelectorEmpleado({ empleados, valorSeleccionado, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        👤 Operador <span className="text-red-400">*</span>
      </label>
      <select
        value={valorSeleccionado?.id_empleado || ''}
        onChange={(e) => {
          const empleadoSeleccionado = empleados.find(
            emp => emp.id_empleado === parseInt(e.target.value)
          );
          onChange(empleadoSeleccionado || null);
        }}
        className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
      >
        <option value="">Selecciona un operador</option>
        {empleados.map((empleado) => (
          <option key={empleado.id_empleado} value={empleado.id_empleado}>
            {empleado.nombre} {empleado.apellido || ''}
          </option>
        ))}
      </select>
      {empleados.length === 0 && (
        <p className="text-xs text-yellow-400 mt-1">
          ⚠️ No hay empleados registrados
        </p>
      )}
    </div>
  );
}

export default SelectorEmpleado;