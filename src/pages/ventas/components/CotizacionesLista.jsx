import React from 'react';
import CotizacionesItems from './CotizacionesItems';

function CotizacionesLista({ cotizaciones, onVer, onConfirmar, onEliminar }) {
  return (
    <div className="bg-slate-800/30 rounded-lg border border-slate-700 flex-1 flex flex-col overflow-hidden min-h-0">
      <div className="flex-1 overflow-auto">
        <div className="min-w-max">
          <table className="w-full text-sm">
            <thead className="bg-slate-800/50 sticky top-0 z-10">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Número</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Cliente</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Fecha</th>
                <th className="px-3 py-2 text-center text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {cotizaciones.length > 0 ? (
                cotizaciones.map((cotizacion) => (
                  <CotizacionesItems
                    key={cotizacion.id}
                    cotizacion={cotizacion}
                    onVer={onVer}
                    onConfirmar={onConfirmar}
                    onEliminar={onEliminar}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-8 text-center text-gray-400">
                    No hay cotizaciones registradas
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

export default CotizacionesLista;