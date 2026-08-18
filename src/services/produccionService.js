// services/ordenProduccionService.js

// 1. URL base de tu API
const API_URL = 'http://localhost:5000/api';

// 2. Función principal que crea la orden
export const crearOrdenProduccion = async (formData) => {
    try {
        // 3. Obtener el token del localStorage
        //const token = localStorage.getItem('token');
        
        // 4. Verificar que existe el token
        //if (!token) {
        //    throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
        //}

        console.log('URL:', `${API_URL}/orden`);
        console.log('Datos a enviar:', formData);

        // 5. Hacer la petición fetch
        const response = await fetch(`${API_URL}/produccion/orden`, {
            method: 'POST',                    // Método HTTP
            headers: {
                'Content-Type': 'application/json'//,  // Tipo de dato que envías
                //'Authorization': `Bearer ${token}`    // Token de autenticación
            },
            body: JSON.stringify(formData)     // Convierte los datos a JSON
        });

        // 6. Convertir la respuesta a JSON
        const data = await response.json();

        // 7. Verificar si la respuesta fue exitosa
        if (!response.ok) {
            // Si el backend devuelve un mensaje de error, lo usamos
            throw new Error(data.message || 'Error al crear la orden');
        }

        // 8. Retornar los datos de la respuesta
        return data;

    } catch (error) {
        // 9. Capturar y relanzar el error para manejarlo en el componente
        console.error('Error en crearOrdenProduccion:', error);
        throw error;
    }
};

// Obtener una orden por ID
export const obtenerOrdenPorId = async (id) => {
    try {
        //const token = localStorage.getItem('token');
        
        //if (!token) {
           // throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
        //}

        const response = await fetch(`http://localhost:5000/api/produccion/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'//,
                //'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al obtener la orden');
        }

        return data;

    } catch (error) {
        console.error('Error en obtenerOrdenPorId:', error);
        throw error;
    }
};

// Obtener todas las máquinas
export const obtenerMaquinas = async () => {
    try {
        //const token = localStorage.getItem('token');
        
        //if (!token) {
           // throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
        //}

        const response = await fetch('http://localhost:5000/api/maquinas', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'//,
                //'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al obtener las máquinas');
        }

        return data;

    } catch (error) {
        console.error('Error en obtenerMaquinas:', error);
        throw error;
    }
};

// Crear un nuevo proceso
export const crearProceso = async (datosProceso) => {
    try {
        const token = localStorage.getItem('token');
        
        //if (!token) {
           // throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
        //}

        const response = await fetch('http://localhost:5000/api/produccion/proceso', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'//,
                //'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(datosProceso)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al crear el proceso');
        }

        return data;

    } catch (error) {
        console.error('Error en crearProceso:', error);
        throw error;
    }
};

// Obtener todos los procesos
export const obtenerProcesos = async (id_Orden) => {
    try {
        //const token = localStorage.getItem('token');
        
        //if (!token) {
         //   throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
        //}

        const response = await fetch(`http://localhost:5000/api/produccion/proceso/${id_Orden}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'//,
                //'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al obtener los procesos');
        }

        return data;

    } catch (error) {
        console.error('Error en obtenerProcesos:', error);
        throw error;
    }
};