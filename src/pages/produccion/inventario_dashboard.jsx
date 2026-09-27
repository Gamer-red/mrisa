import React from 'react';
import Produccionordeneslista from './components/ordenes-almacen/produccionordeneslista';

function InvenatarioProduccionDashboard(){
      return (
    <div className="text-white h-full flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0">
        <Produccionordeneslista />
      </div>
    </div>
  );
}

export default InvenatarioProduccionDashboard;
