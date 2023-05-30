import { useAuth } from './useAuth';
import getApiUrl from '../Common/Api';

const REFRESH_URL = getApiUrl() + 'auth/refresh';

export const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await fetch(REFRESH_URL, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json; charset:UTF-8',
                },
            });

            if (!response.ok) {
                throw new Error();
            }
            const json = await response.json();

            setAuth(() => json);
        } catch (e) {
            setAuth({});
        }
    };

    return refresh;
};
