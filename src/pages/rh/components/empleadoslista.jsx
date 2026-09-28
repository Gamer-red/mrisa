import React from 'react';
import EmpleadosItems from './empleadositems';

function EmpleadosLista({empleados, loading, error}){
    return(
    <div className="bg-slate-800/30 rounded-lg border border-slate-700 flex-1 flex flex-col overflow-hidden min-h-0">
        <div className="flex-1 overflow-auto">
          <div className="min-w-max">
            <table className="w-full text-sm">
              <thead className="bg-slate-800/50 sticky top-0 z-10">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Nombre</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Apellido Paterno</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Apellido Materno</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Puesto</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Estado</th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                        {loading ? (
                            <tr>
                                <td className="px-6 py-4 text-center text-gray-400">
                                    Cargando empleados...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td className="px-6 py-4 text-center text-red-400">
                                    {error}
                                </td>
                            </tr>
                        ) : empleados.length === 0 ? (
                            <tr>
                                <td className="px-6 py-4 text-center text-gray-400">
                                    No hay empleados registrados
                                </td>
                            </tr>
                        ) : (
                            empleados.map((empleados) => (
                                <EmpleadosItems 
                                    key={empleados.id_empleado} 
                                    empleado={empleados} 
                                />
                            ))
                        )}
                    </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}

export default EmpleadosLista;