import getApiUrl from '../Common/Api';
import useAuth from './useAuth';

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      await fetch(getApiUrl() + 'logout', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json; charset:UTF-8',
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return logout;
};

export default useLogout;
