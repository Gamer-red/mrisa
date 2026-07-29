import React from 'react';
import CalidadItems from './calidaditems';

function CalidadLista({ inspecciones, onVer, onAceptar, onRechazar }) {
  return (
    <div className="bg-slate-800/30 rounded-lg border border-slate-700 flex-1 flex flex-col overflow-hidden min-h-0">
      <div className="flex-1 overflow-auto">
        <div className="min-w-max">
          <table className="w-full text-sm">
            <thead className="bg-slate-800/50 sticky top-0 z-10">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Orden</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Producto</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Tipo Inspección</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Operador</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Máquina</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Fecha</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Estado</th>
                <th className="px-3 py-2 text-center text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {inspecciones.length > 0 ? (
                inspecciones.map((inspeccion) => (
                  <CalidadItems
                    key={inspeccion.id}
                    inspeccion={inspeccion}
                    onVer={onVer}
                    onAceptar={onAceptar}
                    onRechazar={onRechazar}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="px-4 py-8 text-center text-gray-400">
                    No hay inspecciones registradas
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

export default CalidadLista;