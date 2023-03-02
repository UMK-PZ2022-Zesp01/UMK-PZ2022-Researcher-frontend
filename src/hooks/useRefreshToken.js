import useAuth from './useAuth';
import getApiUrl from '../Common/Api';
import { useEffect } from 'react';

const REFRESH_URL = 'auth/refresh';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  useEffect(() => {}, []);

  const refresh = async () => {
    try {
      await fetch(getApiUrl() + REFRESH_URL, {
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
            console.log('Access denied');
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

export default useRefreshToken;
