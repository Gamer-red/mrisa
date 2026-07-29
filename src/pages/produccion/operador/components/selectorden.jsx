import React, { useState } from 'react';

function SelectOrden() {
  const [orden, setOrden] = useState('');

  const ordenes = [
    { id: 1, folio: 'OP-188', producto: 'GUIA, NK-1032 DET 4' },
    { id: 2, folio: 'OP-189', producto: 'BASE, MT-2034 DET 2' },
    { id: 3, folio: 'OP-190', producto: 'EJE, RK-1025 DET 8' },
    { id: 4, folio: 'OP-191', producto: 'SOPORTE, MK-3021 DET 3' },
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-1">
        Orden de Producción
      </label>
      <select
        value={orden}
        onChange={(e) => setOrden(e.target.value)}
        className="w-full bg-slate-700/50 text-white px-4 py-2.5 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
      >
        <option value="">Seleccionar orden</option>
        {ordenes.map((o) => (
          <option key={o.id} value={o.id}>
            {o.folio} - {o.producto}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectOrden;