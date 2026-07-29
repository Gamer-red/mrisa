import React, { useState } from 'react';

function SelectMaquina() {
  const [maquina, setMaquina] = useState('');

  const maquinas = [
    { id: 1, nombre: 'Máquina CNC-01' },
    { id: 2, nombre: 'Máquina CNC-02' },
    { id: 3, nombre: 'Máquina de Inyección' },
    { id: 4, nombre: 'Máquina de Corte' },
    { id: 5, nombre: 'Máquina de Ensamble' },
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-1">
        Máquina
      </label>
      <select
        value={maquina}
        onChange={(e) => setMaquina(e.target.value)}
        className="w-full bg-slate-700/50 text-white px-4 py-2.5 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
      >
        <option value="">Seleccionar máquina</option>
        {maquinas.map((m) => (
          <option key={m.id} value={m.id}>
            {m.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectMaquina;