import { INavBarRouters } from '../../utils/interfases';

export const examinationAuthRout = (isAuth: boolean): INavBarRouters[] => {
  if (isAuth) {
    return [{ to: '/todos', name: 'Todos' }];
  } else {
    return [
      { to: '/login', name: 'Login' },
      { to: '/register', name: 'Registration' },
    ];
  }
};
