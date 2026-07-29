import React from 'react';

function MantenimientoItems({ maquina, onProgramar }) {
  // Función para obtener el color del estado
  const getEstadoColor = (estado) => {
    const colores = {
      'Pendiente': 'bg-yellow-500/20 text-yellow-400',
      'En Proceso': 'bg-blue-500/20 text-blue-400',
      'Completado': 'bg-green-500/20 text-green-400'
    };
    return colores[estado] || 'bg-gray-500/20 text-gray-400';
  };

  // Función para obtener el color del tipo
  const getTipoColor = (tipo) => {
    const colores = {
      'Mecánico': 'bg-orange-500/20 text-orange-400',
      'Eléctrico': 'bg-yellow-500/20 text-yellow-400',
      'Hidráulico': 'bg-blue-500/20 text-blue-400',
      'Robótico': 'bg-purple-500/20 text-purple-400'
    };
    return colores[tipo] || 'bg-gray-500/20 text-gray-400';
  };

  return (
    <tr className="hover:bg-slate-700/30 transition-colors cursor-pointer" onClick={() => onProgramar(maquina)}>
      <td className="px-3 py-2 whitespace-nowrap text-sm text-white font-medium">{maquina.maquina}</td>
      <td className="px-3 py-2 whitespace-nowrap">
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTipoColor(maquina.tipo)}`}>
          {maquina.tipo}
        </span>
      </td>
      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300">{maquina.descripcion}</td>
      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300">{maquina.frecuencia}</td>
      <td className="px-3 py-2 whitespace-nowrap">
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(maquina.estado)}`}>
          {maquina.estado}
        </span>
      </td>
      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300">{maquina.fecha}</td>
      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300">{maquina.proxima}</td>
      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300">{maquina.costo}</td>
    </tr>
  );
}

export default MantenimientoItems;