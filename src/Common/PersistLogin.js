import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useRefreshToken } from '../hooks/useRefreshToken';
import { useAuth } from '../hooks/useAuth';
import { LoadingDots } from '../Components/LoadingDots/LoadingDots';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
        return () => (isMounted = false);
    }, []);

    return (
        <>
            {isLoading ? (
                <div className={'container'}>
                    <LoadingDots></LoadingDots>
                    <p>Wczytywanie</p>
                </div>
            ) : (
                <Outlet />
            )}
        </>
    );
};

export default PersistLogin;
