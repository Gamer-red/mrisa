import React from 'react';
import MantenimientoItems from './mantenimientoitems';

function MantenimientoLista({ mantenimientos, loading, error }) {
    return (
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-800/90">
                        <tr className="border-b border-slate-700/50">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Máquina</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Tipo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Frecuencia</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Fecha</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Costo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/30">
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="px-6 py-4 text-center text-gray-400">
                                    Cargando mantenimientos...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan="7" className="px-6 py-4 text-center text-red-400">
                                    {error}
                                </td>
                            </tr>
                        ) : mantenimientos.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="px-6 py-4 text-center text-gray-400">
                                    No hay mantenimientos registrados
                                </td>
                            </tr>
                        ) : (
                            mantenimientos.map((mantenimiento) => (
                                <MantenimientoItems 
                                    key={mantenimiento.id_mantenimiento} 
                                    mantenimiento={mantenimiento} 
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MantenimientoLista;