import React from 'react';
import SelectOperador from './selectoperador';
import SelectTurno from './selectturno';
import SelectMaquina from './selectmaquina';
import SelectOrden from './selectorden';

function ConfiguracionForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí irá la lógica para guardar la configuración
    console.log('Configuración guardada');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
      <h2 className="text-xl font-semibold text-white mb-6">Configuración de Producción</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Operador */}
        <SelectOperador />
        
        {/* Turno */}
        <SelectTurno />
        
        {/* Máquina */}
        <SelectMaquina />
        
        {/* Orden de Producción */}
        <SelectOrden />
      </div>

      {/* Botón de guardar */}
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-colors font-medium"
        >
          Guardar Configuración
        </button>
      </div>
    </form>
  );
}

export default ConfiguracionForm;