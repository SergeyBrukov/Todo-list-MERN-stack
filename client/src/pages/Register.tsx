import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { IAuthForm } from '../utils/interfases';

const Register = () => {
  const navigate = useNavigate();

  const schemaValidateAuthForm = yup.object({
    email: yup.string().required('This input is required').email('You must write  format email'),
    password: yup.string().required('This input is required').min(3, 'Value must be more 6 symbol'),
  });

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setError,
  } = useForm<IAuthForm>({ resolver: yupResolver(schemaValidateAuthForm) });

  const handleAuthSubmit: SubmitHandler<IAuthForm> = async (data) => {
    axios
      .post('/api/auth/register', data)
      .then((response) => {
        if (response.status === 201 || 200) {
          console.log(response);
          navigate('/login');
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
            <span className="card-title">Register</span>
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
                <button className="btn grey lighten-1 black-text">Registration</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
