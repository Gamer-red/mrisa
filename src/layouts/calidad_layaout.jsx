import React from 'react';
import Calidad_sidebar from '../components/sidebars/calidad_sidebar';

function Calidad_layaout({ children }) {
  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar fijo a la izquierda */}
      <Calidad_sidebar />
      {/* Contenido principal - se desplaza para no tapar el sidebar */}
      <main className="flex-1 ml-16 md:ml-64 transition-all duration-300">
        {/* Contenido con padding para que no toque los bordes */}
        <div className="p-6 h-full overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
export default Calidad_layaout;