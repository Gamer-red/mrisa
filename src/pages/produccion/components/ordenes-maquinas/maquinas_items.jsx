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
        </tr>
    );
}

export default MaquinasItems;