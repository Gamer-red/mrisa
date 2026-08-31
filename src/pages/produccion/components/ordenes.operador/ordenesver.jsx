import React, { useState, useEffect } from 'react';
import { obtenerOrdenPorId, obtenerProcesos } from '../../../../services/produccionService';
import ModalAgregarProceso from './ordenesagregarproceso';

function ModalVerOrden({ orden, onClose }) {
  const [showModalProceso, setShowModalProceso] = useState(false);
  const [ordenDetalle, setOrdenDetalle] = useState(null);
  const [procesos, setProcesos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProcesos, setLoadingProcesos] = useState(true);
  const [error, setError] = useState(null);

  // Obtener detalles de la orden
  const obtenerDetalleOrden = async () => {
    try {
      setLoading(true);
      const data = await obtenerOrdenPorId(orden.id_orden);
      
      if (data.success) {
        setOrdenDetalle(data.data);
      } else {
        setError(data.message || 'Error al cargar los detalles');
      }
    } catch (error) {
      setError(error.message || 'Error de conexión al servidor');
    } finally {
      setLoading(false);
    }
  };

  // Obtener todos los procesos
  const cargarProcesos = async () => {
    try {
        setLoadingProcesos(true);
        console.log('ID de orden para filtrar procesos:', orden.id_orden);
        const data = await obtenerProcesos(orden.id_orden);  // ← Pasar el ID
        
        if (data.success) {
            console.log('Procesos encontrados:', data.data);
            setProcesos(data.data);
        }
    } catch (error) {
        console.error('Error al cargar procesos:', error);
    } finally {
        setLoadingProcesos(false);
    }
};

  // Cargar datos cuando se abre el modal
  useEffect(() => {
    if (orden?.id_orden) {
      obtenerDetalleOrden();
      cargarProcesos();
    }
  }, [orden]);

  // Recargar procesos después de guardar uno nuevo
  const handleProcesoCreado = (nuevoProceso) => {
    setProcesos(prev => [...prev, nuevoProceso]);
    setShowModalProceso(false);
  };

  // Mostrar loading
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-4xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Cargando detalles de la orden...</p>
        </div>
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-4xl p-8 text-center">
          <p className="text-red-400">{error}</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  // Si no hay datos
  if (!ordenDetalle) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-4xl p-8 text-center">
          <p className="text-gray-400">No se encontraron datos de la orden</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        
        {/* HEADER */}
        <div className="sticky top-0 bg-slate-800/95 backdrop-blur z-10 rounded-t-2xl">
          <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-gray-400 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Orden #{ordenDetalle.id_orden}
                </h2>
                <p className="text-sm text-gray-400">Detalles de la orden de producción</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <select
                className="bg-slate-700/70 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer text-sm"
                defaultValue={ordenDetalle.estado || 'pendiente'}
              >
                <option value="pendiente">📋 Pendiente</option>
                <option value="proceso">⚙️ En Proceso</option>
                <option value="completada">✅ Completada</option>
                <option value="cancelada">❌ Cancelada</option>
              </select>
            </div>
          </div>
        </div>

        {/* CUERPO */}
        <div className="p-6 space-y-6">
          
          {/* Datos Principales */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Información General</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-700/30">
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Producto</label>
                <p className="text-white text-lg font-medium">{ordenDetalle.producto}</p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-700/30">
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Cliente</label>
                <p className="text-white text-lg font-medium">{ordenDetalle.cliente}</p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-700/30">
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Cantidad</label>
                <p className="text-white text-lg font-medium">{ordenDetalle.cantidad} <span className="text-sm text-gray-400 font-normal">unidades</span></p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-700/30">
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Scrap</label>
                <p className="text-white text-lg font-medium">{ordenDetalle.scrap || 0} <span className="text-sm text-gray-400 font-normal">unidades</span></p>
              </div>
              <div className="md:col-span-2 bg-slate-700/30 rounded-lg p-4 border border-slate-700/30">
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Fecha de Entrega</label>
                <p className="text-white text-lg font-medium">{ordenDetalle.fecha_entrega}</p>
              </div>
            </div>
          </div>

          {/* Sección: Procesos */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Procesos</h3>
                <p className="text-xs text-gray-500 mt-1">Lista de procesos para esta orden</p>
              </div>
              <button
                onClick={() => setShowModalProceso(true)}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Agregar Proceso
              </button>
            </div>

            <div className="space-y-2">
              {loadingProcesos ? (
                <div className="text-center py-4 text-gray-400">
                  <p>Cargando procesos...</p>
                </div>
              ) : procesos.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <p>No hay procesos registrados</p>
                </div>
              ) : (
                procesos.map((proceso) => (
                  <div
                    key={proceso.id_proceso}
                    className="flex items-center justify-between bg-slate-700/30 px-4 py-3 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                      <div>
                        <span className="text-white font-medium">{proceso.nombre_operacion}</span>
                        <span className="text-xs text-gray-400 ml-3">
                          {proceso.tipo_proceso}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">
                        {proceso.tiempo_estimado}h
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium
                        ${proceso.estado === 'Completado' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' :
                          proceso.estado === 'En Proceso' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/20' :
                          'bg-slate-500/20 text-slate-400 border border-slate-500/20'}`}
                      >
                        {proceso.estado || 'Pendiente'}
                      </span>
                      
                      {/* Botón Editar */}
                      <button
                        className="p-1.5 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 rounded transition-colors"
                        title="Editar proceso"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>

                      {/* Botón Eliminar */}
                      <button
                        className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition-colors"
                        title="Eliminar proceso"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Sección: Registro de Producción */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Registro de Producción</h3>
                <p className="text-xs text-gray-500 mt-1">Historial de producción registrado</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Fecha</th>
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Operador</th>
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Máquina</th>
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Piezas</th>
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Scrap</th>
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-400">
                      No hay registros de producción
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="sticky bottom-0 bg-slate-800/95 backdrop-blur rounded-b-2xl">
          <div className="flex justify-end p-6 border-t border-slate-700/50">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg font-medium transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>

      </div>

      {/* Modal Agregar Proceso */}
      <ModalAgregarProceso
        isOpen={showModalProceso}
        onClose={() => setShowModalProceso(false)}
        onSave={handleProcesoCreado}
        idOrden={ordenDetalle?.id_orden}
      />
    </div>
  );
}

export default ModalVerOrden;