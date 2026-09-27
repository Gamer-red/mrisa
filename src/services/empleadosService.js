const API_URL = 'http://localhost:5000/api/rh';

export const empleadosService = {
    // Crear nuevo empleado
    crear: async (formData) => {
        try {
            const token = localStorage.getItem('token');
            
            // Verificar que hay token
            if (!token) {
                throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
            }
            
            const response = await fetch(`${API_URL}/CrearEmpleado`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                    // NO pongas 'Content-Type' porque FormData lo maneja automáticamente
                },
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al crear empleado');
            }

            return data;
        } catch (error) {
            console.error('Error en crear empleado:', error);
            throw error;
        }
    },
    
    // Obtener todos los empleados (para la tabla)
    obtenerEmpleados: async () => {
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                throw new Error('No hay sesión activa');
            }
            
            const response = await fetch(`${API_URL}/ObtenerEmpleados`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al obtener empleados');
            }

            return data;
        } catch (error) {
            console.error('Error en obtener empleados:', error);
            throw error;
        }
    }
};