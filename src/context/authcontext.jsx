import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Verificar si hay sesión al cargar la aplicación
        const checkAuth = async () => {
            try {
                const token = authService.getToken();
                if (token) {
                    // Verificar token con el backend
                    const isValid = await authService.verifyToken();
                    if (isValid) {
                        const usuario = authService.getCurrentUser();
                        setUser(usuario);
                        setIsAuthenticated(true);
                    } else {
                        // Token inválido, limpiar sesión
                        authService.logout();
                    }
                }
            } catch (error) {
                console.error('Error verificando autenticación:', error);
                authService.logout();
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (correo, contrasenia) => {
        try {
            const data = await authService.login(correo, contrasenia);
            if (data.success) {
                setUser(data.usuario);
                setIsAuthenticated(true);
                return { success: true, usuario: data.usuario };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
    };

    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};