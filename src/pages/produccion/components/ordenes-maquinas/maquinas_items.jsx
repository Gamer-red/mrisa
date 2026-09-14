import React from 'react';

function MaquinasItems({ maquina }) {
    // Obtener color del estado
    const getColorEstado = (estado) => {
        switch (estado) {
            case 'ACTIVA':
                return 'bg-green-500/20 text-green-400 border-green-500/20';
            case 'EN_MANTENIMIENTO':
                return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20';
            case 'INACTIVA':
                return 'bg-red-500/20 text-red-400 border-red-500/20';
            default:
                return 'bg-gray-500/20 text-gray-400 border-gray-500/20';
        }
    };

    // Obtener ícono del estado
    const getIconoEstado = (estado) => {
        switch (estado) {
            case 'ACTIVA': return '✅';
            case 'EN_MANTENIMIENTO': return '🔧';
            case 'INACTIVA': return '❌';
            default: return '❓';
        }
    };

    return (
        <tr className="hover:bg-slate-700/30 transition-colors">
            <td className="px-6 py-3 text-sm text-gray-300">{maquina.id_maquina}</td>
            <td className="px-6 py-3 text-sm text-white font-medium">{maquina.nombre}</td>
            <td className="px-6 py-3 text-sm text-gray-300">{maquina.tipo}</td>
            <td className="px-6 py-3 text-sm">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getColorEstado(maquina.estado_operativo)}`}>
                    {getIconoEstado(maquina.estado_operativo)} {maquina.estado_operativo?.replace('_', ' ')}
                </span>
            </td>
            <td className="px-6 py-3 text-sm text-gray-400 max-w-xs truncate">
                {maquina.notas || '-'}
            </td>
            <td className="px-6 py-3">
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
                        title="Editar máquina"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default MaquinasItems;