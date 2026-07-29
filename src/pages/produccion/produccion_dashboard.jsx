import React from 'react';

function ProduccionDashboard() {
  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-4">Dashboard de Producción</h1>
      <p className="text-gray-400">Bienvenido al panel de producción. Aquí se mostrarán las órdenes de producción, métricas y más.</p>
      
      {/* Cards de ejemplo para visualizar mejor el espacio */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h3 className="text-sm font-semibold text-gray-400 uppercase">Órdenes Activas</h3>
          <p className="text-3xl font-bold mt-2">24</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h3 className="text-sm font-semibold text-gray-400 uppercase">En Proceso</h3>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h3 className="text-sm font-semibold text-gray-400 uppercase">Completadas</h3>
          <p className="text-3xl font-bold mt-2">156</p>
        </div>
      </div>

      {/* Texto adicional para pruebas */}
      <div className="mt-8 bg-slate-800/50 p-4 rounded-lg border border-slate-700">
        <p className="text-gray-300">📋 Esta es una vista de prueba. Más adelante se agregarán gráficos, tablas y más funcionalidades.</p>
      </div>
    </div>
  );
}

export default ProduccionDashboard;