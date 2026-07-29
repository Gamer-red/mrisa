import React, { useState } from 'react';
import AlmacenLista from './components/AlmacenLista';

function AlmacenDashboard() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header con título y botón */}
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <h1 className="text-2xl font-bold text-white">Cambia de pantalla</h1>
      </div>
    </div>
  );
}

export default AlmacenDashboard;