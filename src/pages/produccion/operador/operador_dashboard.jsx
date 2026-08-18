import React from 'react';
import ConfiguracionForm from './components/VistaOperadorform';

function OperadorDashboard() {
  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">Vista Operador</h1>
      <p className="text-gray-400 mb-6">
        Configura los parámetros de producción para el operador
      </p>
      
      {/* Formulario de configuración */}
      <ConfiguracionForm />
    </div>
  );
}

export default OperadorDashboard;