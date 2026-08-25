import React, { useState, useEffect } from 'react';
import ModalRegistroLote from './ModalRegistroLote';

function PanelEjecucion({
  orden,
  empleado,
  proceso,
  totalPiezas,
  totalScrap,
  tiempoTranscurrido,
  ejecucionPausada,
  onPausar,
  onReanudar,
  onRegistrar,
  onTerminar
}) {
  const [showModalRegistro, setShowModalRegistro] = useState(false);
  const [tiempo, setTiempo] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  // Formatear tiempo en HH:MM:SS
  const formatearTiempo = (segundos) => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segs = segundos % 60;
    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segs).padStart(2, '0')}`;
  };

  // Iniciar/Detener timer
  useEffect(() => {
    if (!ejecucionPausada && tiempoTranscurrido >= 0) {
      const id = setInterval(() => {
        setTiempo(prev => prev + 1);
      }, 1000);
      setIntervalId(id);
      return () => clearInterval(id);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }
  }, [ejecucionPausada]);

  // Sincronizar tiempo con el padre
  useEffect(() => {
    if (tiempoTranscurrido !== undefined) {
      setTiempo(tiempoTranscurrido);
    }
  }, [tiempoTranscurrido]);

  // Calcular piezas restantes
  const piezasRestantes = Math.max(0, (orden?.cantidad || 0) - totalPiezas);
  const porcentajeAvance = orden?.cantidad ? Math.round((totalPiezas / orden.cantidad) * 100) : 0;

  // Manejar registro de lote
  const handleRegistrarLote = (piezas, scrap) => {
    onRegistrar(piezas, scrap);
    setShowModalRegistro(false);
  };

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
      
      {/* Encabezado del panel */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">⚡ Ejecución en Curso</h2>
          <p className="text-sm text-gray-400">
            Orden #{orden?.id_orden} - {orden?.producto}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${ejecucionPausada ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
            {ejecucionPausada ? '⏸ Pausado' : '▶ En ejecución'}
          </span>
        </div>
      </div>

      {/* Información de la orden y proceso */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-700/30">
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Orden</label>
          <p className="text-white font-medium">#{orden?.id_orden}</p>
          <p className="text-sm text-gray-400">{orden?.producto}</p>
        </div>
        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-700/30">
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Proceso Actual</label>
          <p className="text-white font-medium">{proceso?.nombre_operacion}</p>
          <p className="text-sm text-gray-400">{proceso?.tipo_proceso}</p>
        </div>
        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-700/30">
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Operador</label>
          <p className="text-white font-medium">{empleado?.nombre}</p>
          <p className="text-sm text-gray-400">{empleado?.puesto || 'Operador'}</p>
        </div>
      </div>

      {/* Progreso y contadores */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-700/30 text-center">
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Objetivo</label>
          <p className="text-2xl font-bold text-white">{orden?.cantidad || 0}</p>
          <p className="text-xs text-gray-500">piezas</p>
        </div>
        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-700/30 text-center">
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Producidas</label>
          <p className="text-2xl font-bold text-green-400">{totalPiezas}</p>
          <p className="text-xs text-gray-500">piezas buenas</p>
        </div>
        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-700/30 text-center">
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Scrap</label>
          <p className="text-2xl font-bold text-red-400">{totalScrap}</p>
          <p className="text-xs text-gray-500">piezas defectuosas</p>
        </div>
        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-700/30 text-center">
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">⏱ Tiempo</label>
          <p className="text-2xl font-bold text-blue-400">{formatearTiempo(tiempo)}</p>
          <p className="text-xs text-gray-500">tiempo efectivo</p>
        </div>
      </div>

      {/* Botones de control */}
      <div className="flex flex-wrap gap-3">
        {!ejecucionPausada ? (
          <button
            onClick={onPausar}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-yellow-500/25 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Pausar
          </button>
        ) : (
          <button
            onClick={onReanudar}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/25 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Reanudar
          </button>
        )}

        <button
          onClick={() => setShowModalRegistro(true)}
          className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-purple-500/25 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Registrar Lote
        </button>

        <button
          onClick={onTerminar}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-red-500/25 flex items-center gap-2 ml-auto"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Terminar Proceso
        </button>
      </div>

      {/* Modal Registrar Lote */}
      <ModalRegistroLote
        isOpen={showModalRegistro}
        onClose={() => setShowModalRegistro(false)}
        onRegistrar={handleRegistrarLote}
        totalPiezas={totalPiezas}
        totalScrap={totalScrap}
        objetivo={orden?.cantidad || 0}
      />
    </div>
  );
}

export default PanelEjecucion;