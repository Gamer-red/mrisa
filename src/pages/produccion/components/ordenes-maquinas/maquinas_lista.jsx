import React from 'react';
import MaquinasItems from './maquinas_items';

function MaquinasLista({ maquinas, loading, error }) {
    return (
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-800/90">
                        <tr className="border-b border-slate-700/50">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Tipo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Notas</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/30">
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-400">
                                    Cargando máquinas...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-red-400">
                                    {error}
                                </td>
                            </tr>
                        ) : maquinas.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-400">
                                    No hay máquinas registradas
                                </td>
                            </tr>
                        ) : (
                            maquinas.map((maquina) => (
                                <MaquinasItems 
                                    key={maquina.id_maquina} 
                                    maquina={maquina} 
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MaquinasLista;