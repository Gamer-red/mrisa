import React from 'react';
import Almacen_sidebar from '../components/sidebars/almacen_sidebar';

function Almacen_layaout({ children }) {
  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar fijo a la izquierda */}
      <Almacen_sidebar />
      {/* Contenido principal - se desplaza para no tapar el sidebar */}
      <main className="flex-1 ml-16 md:ml-64 transition-all duration-300 overflow-hidden">
        {/* Contenido con padding para que no toque los bordes */}
        <div className="p-6 h-full flex flex-col overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}

export default Almacen_layaout;