import * as React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Compras_sidebar(){
  const [isOpen, setIsOpen] = useState(true);
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
              operaciones
              </h3>
              <ul className='mt-2 space-y-1'>
                <li>
                  <Link  to = "/compras"className={`px-3 py-2.5 hover:bg-slate-700/50 rounded-lg cursor-pointer text-gray-300 hover:text-white transition-all flex items-center ${!isOpen ? 'justify-center' : ''} ${location.pathname === '/compras' ? 'bg-slate-700/50 text-white' : ''}`}>
                    <span className={`flex items-center ${isOpen ? 'gap-3' : 'gap-0'}`}>
                      <span>📋</span>
                      <span className={`${!isOpen && 'hidden'} transition-all`}>compras</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link  to = "/calidad/proveedores"className={`px-3 py-2.5 hover:bg-slate-700/50 rounded-lg cursor-pointer text-gray-300 hover:text-white transition-all flex items-center ${!isOpen ? 'justify-center' : ''} ${location.pathname === '/calidad/proveedores' ? 'bg-slate-700/50 text-white' : ''}`}>
                    <span className={`flex items-center ${isOpen ? 'gap-3' : 'gap-0'}`}>
                      <span>📋</span>
                      <span className={`${!isOpen && 'hidden'} transition-all`}>Proveedores</span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </aside>
    </>
  )
}
export default Compras_sidebar;