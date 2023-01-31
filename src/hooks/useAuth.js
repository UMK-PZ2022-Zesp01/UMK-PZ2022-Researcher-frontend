import { useContext } from 'react';
import AuthContext from '../Common/AuthProvider';

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
