import { createContext } from 'react';
import { TAuthContext } from '../utils/types';

const AuthContext = createContext<TAuthContext>({
  login: () => {},
  userData: null,
  logout: () => {},
  isAuthenticated: false,
  setSearchValueDebounce: () => {},
  searchValueDebounce: '',
});

export default AuthContext;
