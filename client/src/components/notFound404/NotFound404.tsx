import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound404 = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   setTimeout(() => {
  //     navigate('/')
  //   }, 2000);
  // }, []);

  return <div>NotFound404</div>;
};

export default NotFound404;
