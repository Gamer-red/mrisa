import React, { useState, useEffect } from 'react';
import OrdenesItems from './ordenesitems';
import ModalVerOrden from './ordenesver';

function OrdenesLista() {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);

   const obtenerOrdenes = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/produccion/orden');
      const data = await response.json();
      
      if (data.success) {
        setOrdenes(data.data);
      } else {
        setError(data.message || 'Error al cargar las órdenes');
      }
    } catch (error) {
      setError('Error de conexión al servidor');
    } finally {
      setLoading(false);
    }
  };

  // Cargar órdenes cuando el componente se monta
  useEffect(() => {
    obtenerOrdenes();
  }, []);

  return (
    <>
      <div className="bg-slate-800/30 rounded-lg border border-slate-700 h-full flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-slate-800/90 backdrop-blur z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID Orden</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Producto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Cantidad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Prioridad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Fecha Inicio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Fecha Entrega</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Acciones</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
           <tbody className="divide-y divide-slate-700/50">
              {ordenes.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-6 py-4 text-center text-gray-400">
                    No hay órdenes registradas
                  </td>
                </tr>
              ) : (
                ordenes.map((orden) => (
                  <OrdenesItems
                    key={orden.id_orden}
                    orden={orden}
                    onVerClick={() => setOrdenSeleccionada(orden)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal - FUERA de la tabla y del tbody */}
      {ordenSeleccionada && (
        <ModalVerOrden 
          orden={ordenSeleccionada} 
          onClose={() => setOrdenSeleccionada(null)} 
        />
      )}
    </>
  );
}

export default OrdenesLista;