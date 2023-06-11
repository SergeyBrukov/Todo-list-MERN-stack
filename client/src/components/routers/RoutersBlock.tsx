import { Routes, Route } from 'react-router-dom';
import React, { useContext } from 'react';
import Layout from './Layout';
import { useRouters } from './routersWay';
import NotFound404 from '../notFound404/NotFound404';
import AuthContext from '../../context/Context';

const RoutersBlock = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const routers = useRouters(isAuthenticated);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {routers.map(
            ({ path, element }): JSX.Element => (
              <Route path={path} element={element} key={path} />
            ),
          )}
        </Route>
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </>
  );
};

export default RoutersBlock;
