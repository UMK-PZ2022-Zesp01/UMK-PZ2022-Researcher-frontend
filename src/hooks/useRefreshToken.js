import { useAuth } from './useAuth';
import getApiUrl from '../Common/Api';

const REFRESH_URL = getApiUrl() + 'auth/refresh';

export const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            await fetch(REFRESH_URL, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json; charset:UTF-8',
                },
            })
                .then(async response => {
                    if (response.ok) {
                        await response.json().then(async result => {
                            await setAuth(result);
                        });
                    } else {
                        setAuth({});
                        // console.log('Access denied');
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        } catch (e) {
            console.log(e);
        }
    };

    return refresh;
};
