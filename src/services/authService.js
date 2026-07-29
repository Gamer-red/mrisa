const API_URL = 'http://localhost:5000/api';

export const authService = {
    // Iniciar sesión
    login: async (correo, contrasenia) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo, contrasenia })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al iniciar sesión');
            }

            // Guardar token y usuario en localStorage
            if (data.success && data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('usuario', JSON.stringify(data.usuario));
            }

            return data;
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    },

    // Verificar si el usuario está autenticado
    isAuthenticated: () => {
        const token = localStorage.getItem('token');
        return !!token; // Retorna true si hay token
    },

    // Obtener el usuario actual
    getCurrentUser: () => {
        const usuario = localStorage.getItem('usuario');
        return usuario ? JSON.parse(usuario) : null;
    },

    // Obtener el token
    getToken: () => {
        return localStorage.getItem('token');
    },

    // Cerrar sesión
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        window.location.href = '/login';
    },

    // Verificar el token con el backend
    verifyToken: async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return false;

            const response = await fetch(`${API_URL}/auth/verify`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.ok;
        } catch (error) {
            console.error('Error verificando token:', error);
            return false;
        }
    },
    
};