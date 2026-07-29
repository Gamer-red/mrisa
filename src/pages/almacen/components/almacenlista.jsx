import React from 'react';
import AlmacenItems from './AlmacenItems';

function AlmacenLista({ materiales }) {
  return (
    <div className="bg-slate-800/30 rounded-lg border border-slate-700 flex-1 flex flex-col overflow-hidden min-h-0">
      <div className="flex-1 overflow-auto">
        <div className="min-w-max">
          <table className="w-full text-sm">
            <thead className="bg-slate-800/50 sticky top-0 z-10">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Código</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Material</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Tipo</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Cantidad</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Ubicación</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Stock Mínimo</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Stock Máximo</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Estado</th>
                <th className="px-3 py-2 text-center text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {materiales.length > 0 ? (
                materiales.map((material) => (
                  <AlmacenItems key={material.id} material={material} />
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-4 py-8 text-center text-gray-400">
                    No se encontraron materiales
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

export default AlmacenLista;