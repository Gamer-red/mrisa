import React from 'react';
import Rh_sidebar from '../components/sidebars/rh_sidebar';

function RH_layaout({ children }) {
  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar fijo a la izquierda */}
      <Rh_sidebar />
      {/* Contenido principal - se desplaza para no tapar el sidebar */}
      <main className="flex-1 ml-16 md:ml-64 flex flex-col overflow-hidden">
    <div className="flex-1 min-h-0 p-6">
        {children}
    </div>
</main>
    </div>
  );
}
export default RH_layaout;