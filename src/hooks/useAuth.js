import { useContext } from 'react';
import AuthContext from '../Common/AuthProvider';

export const useAuth = () => {
    return useContext(AuthContext);
};

export const useUsername = () => {
    return useContext(AuthContext)?.auth?.username;
};

export default useAuth;
