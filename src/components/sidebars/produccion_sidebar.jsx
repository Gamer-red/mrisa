import * as React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // 👈 Agregamos Link y useLocation

function ProduccionSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation(); // 👈 Para saber en qué ruta estamos

  return(
    <>
      <aside className={`h-screen ${isOpen ? 'w-64' : 'w-16'} fixed left-0 top-0 transition-all duration-300 ease-in-out z-50`}>
        <nav className='h-full flex flex-col bg-slate-800 border-r border-slate-700 shadow-xl'>
          {/* Header con logo y botón - IGUAL */}
          <div className='p-4 pb-2 flex justify-between items-center border-b border-slate-700'>
            <img 
              src="https://img.logoipsum.com/243.svg" 
              className={`${isOpen ? 'w-32' : 'w-0 opacity-0'} transition-all duration-300 filter brightness-0 invert`} 
              alt="Logo" 
            />
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className='p-1.5 rounded-lg hover:bg-slate-700/50 text-gray-400 hover:text-white transition-colors'
            >
              {isOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </div>
          
          {/* Menú de navegación con secciones */}
          <div className='flex-1 px-3 py-4 overflow-y-auto'>
            {/* SECCIÓN 1: PRODUCCIÓN */}
            <div className='mb-4'>
              <h3 className={`px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider ${!isOpen && 'hidden'}`}>
                Producción
              </h3>
              <ul className='mt-2 space-y-1'>
                <li>
                  <Link 
                    to="/produccion" 
                    className={`px-3 py-2.5 hover:bg-slate-700/50 rounded-lg cursor-pointer text-gray-300 hover:text-white transition-all flex items-center ${!isOpen ? 'justify-center' : ''} ${location.pathname === '/produccion' ? 'bg-slate-700/50 text-white' : ''}`}
                  >
                    <span className={`flex items-center ${isOpen ? 'gap-3' : 'gap-0'}`}>
                      <span>📊</span>
                      <span className={`${!isOpen && 'hidden'} transition-all`}>Dashboard</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/produccion/ordenes" 
                    className={`px-3 py-2.5 hover:bg-slate-700/50 rounded-lg cursor-pointer text-gray-300 hover:text-white transition-all flex items-center ${!isOpen ? 'justify-center' : ''} ${location.pathname === '/produccion/ordenes' ? 'bg-slate-700/50 text-white' : ''}`}
                  >
                    <span className={`flex items-center ${isOpen ? 'gap-3' : 'gap-0'}`}>
                      <span>📋</span>
                      <span className={`${!isOpen && 'hidden'} transition-all`}>Órdenes</span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* SECCIÓN 2: OPERACIONES - DESACTIVADA EN PRODUCCIÓN */}
            <div className='mb-4 '>
              <h3 className={`px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider ${!isOpen && 'hidden'}`}>
                Operaciones
              </h3>
              <ul className='mt-2 space-y-1'>
                <li>
                  <Link to="/produccion/inventario" 
                    className={`px-3 py-2.5 hover:bg-slate-700/50 rounded-lg cursor-pointer text-gray-300 hover:text-white transition-all flex items-center ${!isOpen ? 'justify-center' : ''} ${location.pathname === '/produccion/inventario' ? 'bg-slate-700/50 text-white' : ''}`}>
                  
                    <span className={`flex items-center ${isOpen ? 'gap-3' : 'gap-0'}`}>
                      <span>📦</span>
                      <span className={`${!isOpen && 'hidden'} transition-all`}>Inventario</span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className='mb-4 '>
              <h3 className={`px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider ${!isOpen && 'hidden'}`}>
                Maquinas
              </h3>
              <ul className='mt-2 space-y-1'>
                <li>
                  <Link to="/produccion/maquinas" 
                    className={`px-3 py-2.5 hover:bg-slate-700/50 rounded-lg cursor-pointer text-gray-300 hover:text-white transition-all flex items-center ${!isOpen ? 'justify-center' : ''} ${location.pathname === '/produccion/maquinas' ? 'bg-slate-700/50 text-white' : ''}`}>
                  
                    <span className={`flex items-center ${isOpen ? 'gap-3' : 'gap-0'}`}>
                      <span>📦</span>
                      <span className={`${!isOpen && 'hidden'} transition-all`}>maquinas</span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className='mb-4'>
              <h3 className={`px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider ${!isOpen && 'hidden'}`}>
                Gestión
              </h3>
              <ul className='mt-2 space-y-1'>
                <li>
                  <Link to="/produccion/operador" 
                    className={`px-3 py-2.5 hover:bg-slate-700/50 rounded-lg cursor-pointer text-gray-300 hover:text-white transition-all flex items-center ${!isOpen ? 'justify-center' : ''} ${location.pathname === '/produccion/operador' ? 'bg-slate-700/50 text-white' : ''}`}>

                    <span className={`flex items-center ${isOpen ? 'gap-3' : 'gap-0'}`}>
                      <span>👥</span>
                      <span className={`${!isOpen && 'hidden'} transition-all`}>Vista operador</span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer con información del usuario - IGUAL */}
          <div className='border-t border-slate-700 p-4'>
            <div className={`flex items-center ${isOpen ? 'gap-3' : 'justify-center'}`}>
              <span>👤</span>
              <div className={`${!isOpen && 'hidden'} transition-all`}>
                <p className='text-sm text-white'>Usuario</p>
                <p className='text-xs text-gray-400'>user@email.com</p>
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </>
  )
}

export default ProduccionSidebar;