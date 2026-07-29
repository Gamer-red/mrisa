import React from 'react';
import OrdenesItems from './ordenesitems';

function OrdenesLista() {
  // Datos de ejemplo
  const ordenes = [
    { id: 1, titulo: 'Orden #001', estado: 'pendiente', prioridad: 'alta', fecha: '2024-01-15' },
    { id: 2, titulo: 'Orden #002', estado: 'proceso', prioridad: 'normal', fecha: '2024-01-14' },
    { id: 3, titulo: 'Orden #003', estado: 'completada', prioridad: 'baja', fecha: '2024-01-13' },
  ];
  return (
    <div className="bg-slate-800/30 rounded-lg border border-slate-700 h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-slate-800/90 backdrop-blur z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Orden</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Prioridad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Fecha</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {ordenes.map((orden) => (
              <OrdenesItems key={orden.id} orden={orden} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default OrdenesLista;