import React from 'react';

function AlmacenItems({ material, soloLectura = false}) {
    return (
        <tr className="hover:bg-slate-700/30 transition-colors">
            <td className="px-3 py-2 text-sm text-gray-300">{material.codigo_interno}</td>
            <td className="px-3 py-2 text-sm text-white font-medium">{material.nombre}</td>
            <td className="px-3 py-2 text-sm text-gray-300">{material.tipo}</td>
            <td className="px-3 py-2 text-sm text-gray-300">{material.categoria}</td>
            <td className="px-3 py-2 text-sm text-blue-400 font-medium">{material.stock}</td>
            <td className="px-3 py-2 text-sm text-gray-300">{material.unidad}</td>
            {!soloLectura && (
                <td className="px-3 py-2">
                <div className="flex items-center gap-2">
                    {/* Botón Ver */}
                    <button
                        className="p-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded transition-colors"
                        title="Ver detalles"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </button>

                    {/* Botón Editar */}
                    <button
                        className="p-1.5 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 rounded transition-colors"
                        title="Editar material"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>

                    {/* Botón Eliminar */}
                    <button
                        className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition-colors"
                        title="Eliminar material"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </td>
            )}
        </tr>
    );
}

export default AlmacenItems;