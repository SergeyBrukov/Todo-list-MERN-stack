export interface IRouter {
  path: string;
  element: JSX.Element;
}

export interface INavBarRouters {
  to: string;
  name: string;
}

export interface IAuthForm {
  email: string;
  password: string;
}

export interface ITodo {
  _id?: string;
  title: String;
  important: boolean;
  succsess: boolean;
}
