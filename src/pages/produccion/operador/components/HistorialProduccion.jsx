import React from 'react';

function HistorialProduccion({ historial, totalPiezas, totalScrap }) {
  // Formatear fecha
  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleString('es-MX', {
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Obtener color según tipo de acción
  const getColorAccion = (accion) => {
    switch (accion) {
      case 'produccion':
        return 'text-green-400';
      case 'pausa':
        return 'text-yellow-400';
      case 'reanudacion':
        return 'text-blue-400';
      case 'fin':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">📜 Historial de Producción</h3>
          <p className="text-xs text-gray-500 mt-1">Registros de producción en tiempo real</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-green-400">✅ {totalPiezas} piezas</span>
          <span className="text-red-400">❌ {totalScrap} scrap</span>
        </div>
      </div>

      <div className="overflow-x-auto max-h-60 overflow-y-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-slate-800/95 backdrop-blur">
            <tr className="border-b border-slate-700/50">
              <th className="text-left py-2 px-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Fecha/Hora</th>
              <th className="text-left py-2 px-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Piezas</th>
              <th className="text-left py-2 px-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Scrap</th>
              <th className="text-left py-2 px-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Total</th>
              <th className="text-left py-2 px-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {historial.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-400 text-sm">
                  No hay registros de producción
                </td>
              </tr>
            ) : (
              historial.map((registro, index) => {
                // Calcular total acumulado
                const totalAcumulado = historial
                  .slice(0, index + 1)
                  .reduce((acc, r) => acc + (r.piezas || 0), 0);

                return (
                  <tr key={index} className="hover:bg-slate-700/20 transition-colors">
                    <td className="py-2 px-3 text-sm text-gray-300">
                      {formatearFecha(registro.fecha)}
                    </td>
                    <td className="py-2 px-3 text-sm text-green-400 font-medium">
                      {registro.piezas || '-'}
                    </td>
                    <td className="py-2 px-3 text-sm text-red-400 font-medium">
                      {registro.scrap || '-'}
                    </td>
                    <td className="py-2 px-3 text-sm text-white font-medium">
                      {totalAcumulado}
                    </td>
                    <td className="py-2 px-3 text-sm">
                      <span className={`font-medium ${getColorAccion(registro.accion)}`}>
                        {registro.accion === 'produccion' && '🔧 Producción'}
                        {registro.accion === 'pausa' && '⏸ Pausa'}
                        {registro.accion === 'reanudacion' && '▶ Reanudación'}
                        {registro.accion === 'fin' && '🏁 Finalizado'}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistorialProduccion;