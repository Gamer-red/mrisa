import React, { useState } from 'react';

function SelectTurno() {
  const [turno, setTurno] = useState('');

  const turnos = [
    { id: 1, nombre: 'Matutino (06:00 - 14:00)' },
    { id: 2, nombre: 'Vespertino (14:00 - 22:00)' },
    { id: 3, nombre: 'Nocturno (22:00 - 06:00)' },
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-1">
        Turno
      </label>
      <select
        value={turno}
        onChange={(e) => setTurno(e.target.value)}
        className="w-full bg-slate-700/50 text-white px-4 py-2.5 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
      >
        <option value="">Seleccionar turno</option>
        {turnos.map((t) => (
          <option key={t.id} value={t.id}>
            {t.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectTurno;