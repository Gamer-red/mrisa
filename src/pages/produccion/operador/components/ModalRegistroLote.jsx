import React, { useState, useEffect } from 'react';

function ModalRegistroLote({
  isOpen,
  onClose,
  onRegistrar,
  totalPiezas,
  totalScrap,
  objetivo
}) {
  const [piezas, setPiezas] = useState('');
  const [scrap, setScrap] = useState('');

  // Resetear formulario cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setPiezas('');
      setScrap('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const piezasNum = parseInt(piezas) || 0;
    const scrapNum = parseInt(scrap) || 0;
    
    // Validar que al menos haya una pieza o scrap
    if (piezasNum === 0 && scrapNum === 0) {
      alert('Debes registrar al menos una pieza o scrap');
      return;
    }

    // Validar que no exceda el objetivo
    if (totalPiezas + piezasNum > objetivo) {
      alert(`No puedes superar el objetivo de ${objetivo} piezas`);
      return;
    }

    onRegistrar(piezasNum, scrapNum);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
      <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 w-full max-w-md p-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">📦 Registrar Producción</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Información actual */}
        <div className="bg-slate-700/30 rounded-lg p-4 mb-4 border border-slate-700/30">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <label className="text-gray-400">Producidas:</label>
              <p className="text-white font-medium">{totalPiezas} piezas</p>
            </div>
            <div>
              <label className="text-gray-400">Scrap:</label>
              <p className="text-white font-medium">{totalScrap} piezas</p>
            </div>
            <div className="col-span-2">
              <label className="text-gray-400">Objetivo:</label>
              <p className="text-white font-medium">{objetivo} piezas</p>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Piezas producidas
              </label>
              <input
                type="number"
                value={piezas}
                onChange={(e) => setPiezas(e.target.value)}
                placeholder="Ej: 10, 20, 50..."
                min="0"
                step="1"
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Scrap (piezas defectuosas)
              </label>
              <input
                type="number"
                value={scrap}
                onChange={(e) => setScrap(e.target.value)}
                placeholder="Ej: 0, 1, 2..."
                min="0"
                step="1"
                className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <p className="text-xs text-gray-500 mt-1">
                Opcional. Registra las piezas que salieron defectuosas
              </p>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-700/50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-purple-500/25"
            >
              Registrar
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default ModalRegistroLote;