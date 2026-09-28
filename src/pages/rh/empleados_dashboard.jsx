import React, { useEffect, useState } from 'react';
import EmpleadoForm from '../rh/components/empleadosform';
import EmpleadosLista from '../rh/components/empleadoslista';
import { obtenerEmpleados } from '../../services/empleadosService';

function EmpleadosDashboard() {
    const [empleados, setEmpleados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const cargarEmpleados = async () => {
        try {
            setLoading(true);
            const data = await obtenerEmpleados();
            console.log('Respuesta del backend:', data);

            if (data.success) {
                setEmpleados(data.data);
            }
        } catch (error) {
            setError(error.message || 'Error al cargar los empleados');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarEmpleados();
    }, []);

    const handleCloseForm = () => {
        setMostrarFormulario(false);
    };

    const handleSubmitForm = async () => {
        await cargarEmpleados();
        setMostrarFormulario(false);
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">👥 Empleados</h1>
                    <p className="text-gray-400 text-sm">Gestión de empleados</p>
                </div>
                <button
                    onClick={() => setMostrarFormulario(true)}
                    className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/25"
                >
                    Agregar Empleado
                </button>
            </div>

            {/* Tabla de empleados */}
            <EmpleadosLista
                empleados={empleados}
                loading={loading}
                error={error}
            />

            {/* Modal del formulario */}
            {mostrarFormulario && (
                <EmpleadoForm
                    onClose={handleCloseForm}
                    onSubmit={handleSubmitForm}
                />
            )}
        </div>
    );
}

export default EmpleadosDashboard;