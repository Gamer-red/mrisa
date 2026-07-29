import React, { useState } from 'react';

function SelectOperador() {
  const [operador, setOperador] = useState('');

  const operadores = [
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'María García' },
    { id: 3, nombre: 'Carlos López' },
    { id: 4, nombre: 'Ana Martínez' },
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-1">
        Operador
      </label>
      <select
        value={operador}
        onChange={(e) => setOperador(e.target.value)}
        className="w-full bg-slate-700/50 text-white px-4 py-2.5 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
      >
        <option value="">Seleccionar operador</option>
        {operadores.map((op) => (
          <option key={op.id} value={op.id}>
            {op.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectOperador;