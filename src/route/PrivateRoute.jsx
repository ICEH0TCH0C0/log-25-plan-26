import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';
import { ROUTES } from '../route/RouteList';

const PrivateRoute = () => {
    const { currentUser } = useUserStore();
    // Also check localStorage directly in case store isn't hydrated yet (though store should handle it)
    const token = localStorage.getItem('accessToken');

    if (!token) {
        // Not logged in, redirect to login page
        return <Navigate to={ROUTES.login} replace />;
    }

    // Authorized
    return <Outlet />;
};

export default PrivateRoute;
