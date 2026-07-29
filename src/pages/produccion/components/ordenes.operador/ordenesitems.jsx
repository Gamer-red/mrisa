import React from 'react';

function OrdenesItems({ orden }) {
  const getEstadoColor = (estado) => {
    const colores = {
      pendiente: 'bg-yellow-500/20 text-yellow-400',
      proceso: 'bg-blue-500/20 text-blue-400',
      pausado: 'bg-orange-500/20 text-orange-400',
      completada: 'bg-green-500/20 text-green-400',
    };
    return colores[estado] || 'bg-gray-500/20 text-gray-400';
  };

  const getPrioridadColor = (prioridad) => {
    const colores = {
      baja: 'text-green-400',
      normal: 'text-blue-400',
      alta: 'text-red-400',
    };
    return colores[prioridad] || 'text-gray-400';
  };

  return (
    <tr className="hover:bg-slate-700/30 transition-colors cursor-pointer">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">#{orden.id}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">{orden.titulo}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(orden.estado)}`}>
          {orden.estado.charAt(0).toUpperCase() + orden.estado.slice(1)}
        </span>
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getPrioridadColor(orden.prioridad)}`}>
        {orden.prioridad.charAt(0).toUpperCase() + orden.prioridad.slice(1)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{orden.fecha}</td>
    </tr>
  );
}

export default OrdenesItems;