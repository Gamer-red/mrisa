import React from 'react';
import AlmacenItems from '../../almacen/components/almacenitems';
import EmpleadosItems from './empleadositems';

function EmpleadosLista(){
    return(
    <div className="bg-slate-800/30 rounded-lg border border-slate-700 flex-1 flex flex-col overflow-hidden min-h-0">
        <div className="flex-1 overflow-auto">
          <div className="min-w-max">
            <table className="w-full text-sm">
              <thead className="bg-slate-800/50 sticky top-0 z-10">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">No.</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Nombre</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Puesto</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Departamento</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Teléfono</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Correo</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Estado</th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                 <EmpleadosItems/>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}

export default EmpleadosLista;