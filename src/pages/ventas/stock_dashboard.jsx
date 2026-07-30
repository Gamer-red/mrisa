import React, { useState } from 'react';
import StockLista from './components/stock/Stocklista';
import StockForm from './components/stock/Stockform';

function StockDashboard() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productos, setProductos] = useState([
    {
      nombre: 'Engranaje Tipo A',
      cantidad: 25,
      fecha: '2024-01-15',
      entregado: false
    },
    {
      nombre: 'Eje Transmisión',
      cantidad: 10,
      fecha: '2024-01-14',
      entregado: true
    },
    {
      nombre: 'Sensor Térmico',
      cantidad: 50,
      fecha: '2024-01-13',
      entregado: false
    },
    {
      nombre: 'Rodamiento Principal',
      cantidad: 8,
      fecha: '2024-01-12',
      entregado: false
    },
    {
      nombre: 'Sistema Hidráulico',
      cantidad: 3,
      fecha: '2024-01-11',
      entregado: true
    }
  ]);

  // Función para manejar el click del botón Agregar Producto
  const handleAgregarProductoClick = () => {
    setMostrarFormulario(true);
  };

  // Función para cerrar el formulario
  const handleCloseForm = () => {
    setMostrarFormulario(false);
  };

  // Función para manejar el envío del formulario
  const handleSubmitForm = (data) => {
    const nuevoProducto = {
      id: Math.max(...productos.map(p => p.id), 0) + 1,
      ...data,
      fecha: new Date().toISOString().split('T')[0],
      entregado: false
    };
    setProductos(prev => [...prev, nuevoProducto]);
    setMostrarFormulario(false);
  };

  // Función para marcar como entregado
  const handleEntregado = (producto) => {
    if (window.confirm(`¿Marcar "${producto.nombre}" como entregado?`)) {
      setProductos(prev => prev.map(p => 
        p.id === producto.id 
          ? { ...p, entregado: true }
          : p
      ));
    }
  };

  // Función para borrar producto
  const handleBorrar = (producto) => {
    if (window.confirm(`¿Eliminar "${producto.nombre}" del stock?`)) {
      setProductos(prev => prev.filter(p => p.id !== producto.id));
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header con título y botón */}
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <h1 className="text-2xl font-bold text-white">Stock de Productos</h1>
        
        <button 
          onClick={handleAgregarProductoClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 text-sm flex-shrink-0"
        >
          <span className="text-lg leading-none">+</span>
          Agregar Producto
        </button>
      </div>

      {/* Lista de productos */}
      <StockLista 
        productos={productos}
        onEntregado={handleEntregado}
        onBorrar={handleBorrar}
      />

      {/* Modal del formulario */}
      {mostrarFormulario && (
        <StockForm 
          onClose={handleCloseForm}
          onSubmit={handleSubmitForm}
        />
      )}
    </div>
  );
}

export default StockDashboard;