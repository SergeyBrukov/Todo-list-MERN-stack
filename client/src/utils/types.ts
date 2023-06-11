import { Dispatch, SetStateAction } from 'react';

export type TypeSetState<T> = Dispatch<SetStateAction<T>>;

export type TUserData = {
  token: string | null;
  id: string | null;
};

export type TAuthContext = {
  login: (token: string, id: string) => void;
  userData: TUserData | null | undefined;
  logout: () => void;
  isAuthenticated: boolean;
  setSearchValueDebounce: TypeSetState<string>;
  searchValueDebounce: string;
};
