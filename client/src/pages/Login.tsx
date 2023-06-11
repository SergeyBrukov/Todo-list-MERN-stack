import React, { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { IAuthForm } from '../utils/interfases';
import AuthContext from '../context/Context';

const Login = () => {
  const { login } = useContext(AuthContext);

  const schemaValidAuthForm = yup.object({
    // email: yup.string().required('This input is required').email('You must write  format email'),
    email: yup.string().required('This input is required'),
    password: yup.string().required('This input is required').min(3, 'Value must be more 6 symbol'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm<IAuthForm>({ resolver: yupResolver(schemaValidAuthForm) });

  const handleAuthSubmit: SubmitHandler<IAuthForm> = (data) => {
    axios
      .post<{ token: string; userId: string }>('/api/auth/login', data)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          const { userId, token } = response.data;
          login(token, userId);
        }
      })
      .catch((error) => {
        const { errors } = error.response.data;

        errors.forEach(({ param, msg }: { param: keyof IAuthForm; msg: string }) => {
          setError(param, { message: msg });
        });
      });
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Todos</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Login</span>
            <form onSubmit={handleSubmit(handleAuthSubmit)}>
              <input {...register('email')} id="email" className="validate" />
              <label htmlFor="email">Email</label>
              {errors.email && (
                <span className="helper-text" data-error="wrong" data-success="right">
                  {errors.email.message}
                </span>
              )}
              <input {...register('password')} id="password" className="validate" />
              <label htmlFor="password">Password</label>
              {errors.password && (
                <span className="helper-text" data-error="wrong" data-success="right">
                  {errors.password.message}
                </span>
              )}
              <div className="card-action">
                <button className="btn grey lighten-1 black-text">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
