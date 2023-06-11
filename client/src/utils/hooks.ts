import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TUserData } from './types';

export const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userData, setUSerData] = useState<TUserData | null>(null);

  console.log(userData);

  const login = (token: string, userID: string) => {
    console.log('login', location);

    setUSerData({ token, id: userID });
    localStorage.setItem('userData', JSON.stringify({ token, id: userID }));
    if (location.search) {
      navigate({ pathname: '/todos', search: location.search });
    } else {
      navigate('/todos');
    }
  };
  const logout = () => {
    setUSerData(null);
    localStorage.removeItem('userData');
    navigate('/login');
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData') as string);
    console.log(userData);

    if (userData && userData.token) {
      setUSerData(userData);
      login(userData.token, userData.id);
      // navigate('/todos');
    } else {
      navigate('/login');
    }
  }, []);

  return { login, userData, logout };
};
