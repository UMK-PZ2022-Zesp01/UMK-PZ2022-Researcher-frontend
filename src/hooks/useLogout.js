import getApiUrl from '../Common/Api';
import { useAuth } from './useAuth';

export const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        const requestCookieDeletion = async () => {
            await fetch(getApiUrl() + 'logout', {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json; charset:UTF-8',
                },
            });
        };

        try {
            const response = await requestCookieDeletion();
            if (!response.ok) throw new Error();
        } catch (e) {
            try {
                await requestCookieDeletion();
            } catch (e) {
                console.log(e);
            }
        }
    };

    return logout;
};
