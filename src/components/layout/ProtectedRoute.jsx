import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export const ProtectedRoute = ({ allowedRoles = [] }) => {
    const { user, isAuthenticated } = useAuthStore();
    const location = useLocation();

    if (!isAuthenticated || !user) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        // Redirect based on role if they try to access unauthorized page
        if (user.role === 'AFFILIATE') {
            return <Navigate to="/affiliate" replace />;
        } else if (['BRAND_ADMIN', 'PLATFORM_ADMIN'].includes(user.role)) {
            return <Navigate to="/admin" replace />;
        } else {
            return <Navigate to="/unauthorized" replace />;
        }
    }

    return <Outlet />;
};
