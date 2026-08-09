const API_URL = 'http://localhost:5000/api';

export const calidadService = {
    // Crear nueva inspección
    crearInspeccion: async (data) => {
    try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
            }

            // ✅ FORZAR que sea array (lo más seguro)
            const tolerancias = (data.tolerancias && Array.isArray(data.tolerancias)) 
                ? data.tolerancias 
                : [];
                
            const caracteristicas = (data.caracteristicasCriticas && Array.isArray(data.caracteristicasCriticas)) 
                ? data.caracteristicasCriticas 
                : [];

            const payload = {
                orden_produccion: data.ordenProduccion || '',
                tipo_inspeccion: data.tipoInspeccion || '',
                producto: data.producto || '',
                operador: data.operador || '',
                maquina: data.maquina || '',
                turno: data.turno || '',
                notas: data.notas || '',
                tolerancias: tolerancias.map(tol => ({
                    dimension: parseFloat(tol.dimension) || 0,
                    minimo: parseFloat(tol.min) || 0,
                    maximo: parseFloat(tol.max) || 0,
                    nominal: parseFloat(tol.nominal) || 0
                })),
                caracteristicas: caracteristicas.map(car => ({
                    caracteristica: car
                }))
            };

            const response = await fetch(`${API_URL}/calidad/inspeccion`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Error al crear inspección');
            }

            return result;
        } catch (error) {
            throw error;
        }
    },

    // Obtener todas las inspecciones
    obtenerInspecciones: async () => {
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                throw new Error('No hay sesión activa');
            }

            const response = await fetch(`${API_URL}/calidad/inspeccion`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Error al obtener inspecciones');
            }

            return result;
        } catch (error) {
            throw error;
        }
    },

    // Obtener una inspección por ID
    obtenerInspeccionPorId: async (id) => {
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                throw new Error('No hay sesión activa');
            }

            const response = await fetch(`${API_URL}/calidad/inspeccion/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Error al obtener inspección');
            }

            return result;
        } catch (error) {
            throw error;
        }
    }
};