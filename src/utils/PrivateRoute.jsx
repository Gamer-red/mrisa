import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';

const PrivateRoute = ({ children, allowedRoles = [] }) => {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // Si se especifican roles permitidos, verificar
    if (allowedRoles.length > 0 && user) {
        if (!allowedRoles.includes(user.rol)) {
            return <Navigate to="/unauthorized" />;
        }
    }

    return children;
};

export default PrivateRoute;