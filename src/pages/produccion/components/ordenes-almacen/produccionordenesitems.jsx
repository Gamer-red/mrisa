import React from 'react';

function produccionordenesitems({ material }) {
  // Función para obtener el color del estado
  const getEstadoColor = (estado) => {
    const colores = {
      'Disponible': 'bg-green-500/20 text-green-400 border-green-500/30',
      'En Proceso': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Bajo Stock': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Agotado': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    };
    return colores[estado] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  // Función para obtener el color del tipo
  const getTipoColor = (tipo) => {
    const colores = {
      'Materia Prima': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'En Processo': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Proceso Terminado': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      'Herramienta': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Insumo': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      'Fabricable': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    };
    return colores[tipo] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <tr className="hover:bg-slate-700/30 transition-colors duration-150">
      <td className="px-4 py-3 text-sm text-gray-300 font-mono">{material.codigo}</td>
      <td className="px-4 py-3 text-sm text-gray-200 font-medium">{material.material}</td>
      <td className="px-4 py-3 text-sm">
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTipoColor(material.tipo)}`}>
          {material.tipo}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-300">{material.cantidadMaterial}</td>
      <td className="px-4 py-3 text-sm text-gray-300">{material.ruta}</td>
      <td className="px-4 py-3 text-sm text-gray-300">{material.stock}</td>
      <td className="px-4 py-3 text-sm text-gray-300">{material.costoUnitario}</td>
      <td className="px-4 py-3 text-sm">
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getEstadoColor(material.estado)}`}>
          {material.estado}
        </span>
      </td>
    </tr>
  );
}

export default produccionordenesitems;