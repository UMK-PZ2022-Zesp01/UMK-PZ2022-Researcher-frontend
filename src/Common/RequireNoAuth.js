import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RequireNoAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    const from = location?.state?.from ? location.state.from : '/';

    return auth?.accessToken ? (
        <Navigate to={from} state={{ from: location }} replace />
    ) : (
        <Outlet />
    );
};

export default RequireNoAuth;
