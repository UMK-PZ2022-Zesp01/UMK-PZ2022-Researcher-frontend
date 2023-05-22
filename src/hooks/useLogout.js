import getApiUrl from '../Common/Api';
import { useAuth } from './useAuth';

export const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        let retry = false;

        const requestCookieDeletion = async () => {
            try {
                setAuth({});
                const response = await fetch(getApiUrl() + 'logout', {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json; charset:UTF-8',
                    },
                });

                if (!response.ok) throw new Error();
            } catch (e) {
                retry = true;
            }
        };

        requestCookieDeletion();
        if (retry) requestCookieDeletion();
    };

    return logout;
};
