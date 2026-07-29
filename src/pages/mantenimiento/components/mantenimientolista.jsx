import React from 'react';
import MantenimientoItems from './MantenimientoItems';

function MantenimientoLista({ maquinas, onProgramar }) {
  return (
    <div className="bg-slate-800/30 rounded-lg border border-slate-700 flex-1 flex flex-col overflow-hidden min-h-0">
      <div className="flex-1 overflow-auto">
        <div className="min-w-max">
          <table className="w-full text-sm">
            <thead className="bg-slate-800/50 sticky top-0 z-10">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Máquina</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Tipo</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Descripción</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Frecuencia</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Estado</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Fecha</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Próxima</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Costo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {maquinas.length > 0 ? (
                maquinas.map((maquina) => (
                  <MantenimientoItems 
                    key={maquina.id} 
                    maquina={maquina}
                    onProgramar={onProgramar}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-4 py-8 text-center text-gray-400">
                    No se encontraron máquinas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MantenimientoLista;