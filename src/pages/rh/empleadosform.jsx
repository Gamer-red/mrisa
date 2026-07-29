import React, { useState } from 'react';

function EmpleadoForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    // Información Personal
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    fechaNacimiento: '',
    telefono: '',
    correo: '',
    curp: '',
    rfc: '',
    nss: '',
    
    // Dirección
    calle: '',
    numero: '',
    colonia: '',
    codigoPostal: '',
    estado: '',
    municipio: '',
    
    // Documentos (archivos)
    docCurp: null,
    docIne: null,
    docActaNacimiento: null,
    docComprobanteDomicilio: null,
    docConstanciaFiscal: null,
    docCartaRecomendacion: null,
    docComprobanteEstudios: null,
    
    // Otros datos
    telefonoEmergencia: '',
    contactoEmergencia: '',
    sucursal: '',
    
    // Datos Laborales
    puesto: '',
    departamento: '',
    turno: '',
    contrato: ''
  });

  // Opciones para listboxes
  const opcionesEstado = ['Seleccionar...', 'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Estado de México', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'];
  
  const opcionesTurno = ['Seleccionar...', 'Matutino', 'Vespertino', 'Nocturno', 'Mixto'];
  const opcionesContrato = ['Seleccionar...', 'Tiempo Indefinido', 'Tiempo Determinado', 'Por Proyecto', 'Temporal', 'Prácticas'];
  const opcionesSucursal = ['Seleccionar...', 'Sucursal Norte', 'Sucursal Sur', 'Sucursal Este', 'Sucursal Oeste', 'Planta Central'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del empleado:', formData);
    if (onSubmit) {
      onSubmit(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700 sticky top-0 bg-slate-800 z-10">
          <h2 className="text-2xl font-bold text-white">Registro de Empleado</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Sección: Información Personal */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-blue-400 mb-4 border-b border-slate-700 pb-2">Información Personal</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Nombre"
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Apellido Paterno <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="apellidoPaterno"
                  value={formData.apellidoPaterno}
                  onChange={handleChange}
                  placeholder="Apellido Paterno"
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Apellido Materno
                </label>
                <input
                  type="text"
                  name="apellidoMaterno"
                  value={formData.apellidoMaterno}
                  onChange={handleChange}
                  placeholder="Apellido Materno"
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Fecha de Nacimiento <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Teléfono <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Ej: 555-123-4567"
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Correo Electrónico <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  placeholder="ejemplo@correo.com"
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  CURP <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="curp"
                  value={formData.curp}
                  onChange={handleChange}
                  placeholder="CURP"
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors uppercase"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  RFC <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="rfc"
                  value={formData.rfc}
                  onChange={handleChange}
                  placeholder="RFC"
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors uppercase"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  NSS <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="nss"
                  value={formData.nss}
                  onChange={handleChange}
                  placeholder="Número de Seguridad Social"
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          {/* Sección: Dirección */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-blue-400 mb-4 border-b border-slate-700 pb-2">Dirección</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Calle <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="calle"
                  value={formData.calle}
                  onChange={handleChange}
                  placeholder="Calle"
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Número <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  placeholder="Número"
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Colonia <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="colonia"
                  value={formData.colonia}
                  onChange={handleChange}
                  placeholder="Colonia"
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Código Postal <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="codigoPostal"
                  value={formData.codigoPostal}
                  onChange={handleChange}
                  placeholder="Código Postal"
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Estado <span className="text-red-400">*</span>
                </label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                >
                  {opcionesEstado.map((opcion, index) => (
                    <option key={index} value={opcion}>{opcion}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Municipio <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="municipio"
                  value={formData.municipio}
                  onChange={handleChange}
                  placeholder="Municipio"
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          {/* Sección: Documentos */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-blue-400 mb-4 border-b border-slate-700 pb-2">Documentos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  CURP <span className="text-red-400">*</span>
                </label>
                <input
                  type="file"
                  name="docCurp"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  INE <span className="text-red-400">*</span>
                </label>
                <input
                  type="file"
                  name="docIne"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Acta de Nacimiento <span className="text-red-400">*</span>
                </label>
                <input
                  type="file"
                  name="docActaNacimiento"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Comprobante de Domicilio <span className="text-red-400">*</span>
                </label>
                <input
                  type="file"
                  name="docComprobanteDomicilio"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Constancia de Situación Fiscal <span className="text-red-400">*</span>
                </label>
                <input
                  type="file"
                  name="docConstanciaFiscal"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Carta de Recomendación
                </label>
                <input
                  type="file"
                  name="docCartaRecomendacion"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Comprobante de Estudios <span className="text-red-400">*</span>
                </label>
                <input
                  type="file"
                  name="docComprobanteEstudios"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                  required
                />
              </div>
            </div>
          </div>

          {/* Sección: Otros Datos */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-blue-400 mb-4 border-b border-slate-700 pb-2">Otros Datos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Teléfono de Emergencia <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  name="telefonoEmergencia"
                  value={formData.telefonoEmergencia}
                  onChange={handleChange}
                  placeholder="Teléfono de Emergencia"
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Contacto de Emergencia <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="contactoEmergencia"
                  value={formData.contactoEmergencia}
                  onChange={handleChange}
                  placeholder="Nombre del contacto"
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Sucursal <span className="text-red-400">*</span>
                </label>
                <select
                  name="sucursal"
                  value={formData.sucursal}
                  onChange={handleChange}
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                >
                  {opcionesSucursal.map((opcion, index) => (
                    <option key={index} value={opcion}>{opcion}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Sección: Datos Laborales */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-blue-400 mb-4 border-b border-slate-700 pb-2">Datos Laborales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Puesto <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="puesto"
                  value={formData.puesto}
                  onChange={handleChange}
                  placeholder="Ej: Ingeniero de Producción"
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Departamento <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleChange}
                  placeholder="Ej: Producción"
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Turno <span className="text-red-400">*</span>
                </label>
                <select
                  name="turno"
                  value={formData.turno}
                  onChange={handleChange}
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                >
                  {opcionesTurno.map((opcion, index) => (
                    <option key={index} value={opcion}>{opcion}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Contrato <span className="text-red-400">*</span>
                </label>
                <select
                  name="contrato"
                  value={formData.contrato}
                  onChange={handleChange}
                  className="w-full bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                >
                  {opcionesContrato.map((opcion, index) => (
                    <option key={index} value={opcion}>{opcion}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-6 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/30"
            >
              Registrar Empleado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmpleadoForm;