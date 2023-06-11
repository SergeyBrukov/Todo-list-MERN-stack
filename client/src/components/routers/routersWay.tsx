import Todos from '../../pages/Todos';

import Register from '../../pages/Register';
import { IRouter } from '../../utils/interfases';
import Login from '../../pages/Login';

const routerUser: IRouter[] = [{ path: '/todos', element: <Todos /> }];
const routerCandidate: IRouter[] = [
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
];

export const useRouters = (isAuth: boolean): IRouter[] => {
  if (isAuth) {
    return routerUser;
  } else {
    return routerCandidate;
  }
};
