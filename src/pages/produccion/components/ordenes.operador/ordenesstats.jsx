import React from 'react';

function OrdenesStats() {
  const stats = [
    { titulo: 'Total', valor: 156, color: 'bg-blue-500' },
    { titulo: 'Pendientes', valor: 24, color: 'bg-yellow-500' },
    { titulo: 'En Proceso', valor: 12, color: 'bg-purple-500' },
    { titulo: 'Completadas', valor: 120, color: 'bg-green-500' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <p className="text-sm text-gray-400">{stat.titulo}</p>
          <p className="text-2xl font-bold">{stat.valor}</p>
          <div className={`h-1 w-full ${stat.color} rounded-full mt-2`}></div>
        </div>
      ))}
    </div>
  );
}

export default OrdenesStats;