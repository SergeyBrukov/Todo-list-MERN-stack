import React, { useEffect, useState } from 'react';
import RoutersBlock from './components/routers/RoutersBlock';
import { useNavigate } from 'react-router-dom';
import AuthContext from './context/Context';
import { useAuth } from './utils/hooks';

function App() {
  const navigate = useNavigate();
  const { userData, logout, login } = useAuth();
  const isAuthenticated = !!userData;
  console.log(isAuthenticated);

  const [searchValueDebounce, setSearchValueDebounce] = useState('');

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate('/todos');
  //   } else {
  //     navigate('/login');
  //   }
  // }, []);
  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          login,
          userData,
          logout,
          isAuthenticated,
          setSearchValueDebounce,
          searchValueDebounce,
        }}>
        <RoutersBlock />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
