import React, { ChangeEvent, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import AuthContext from '../../context/Context';
import { examinationAuthRout } from './navBarRouters';

const NavBar = () => {
  const { isAuthenticated, logout, setSearchValueDebounce, userData } = useContext(AuthContext);

  const examinationAuthRoutMemo = useMemo(
    () => examinationAuthRout(isAuthenticated),
    [isAuthenticated],
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const [searchValue, setSearchValue] = useState(searchParams.get('searchTodo') || '');

  const customSearchParamsFun = () => {
    const params: any = {};
    if (searchValue.length > 0) params!.searchTodo = searchValue;
    setSearchParams(params);
  };

  useEffect(() => {
    console.log('searchValue dsfsdfsdf');

    // && window.location.search
    // if (!isMounting.current && window.location.search) {
    //   setSearchValue(searchParams.get('searchTodo') || '');
    // }

    customSearchParamsFun();

    const searchDebounce = setTimeout(() => {
      setSearchValueDebounce(searchValue);
    }, 500);
    // isMounting.current = true;

    return () => clearTimeout(searchDebounce);
  }, [searchValue]);

  const handleChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <nav>
        <div
          className="nav-wrapper blue darken-1"
          style={{ padding: '0 15px', display: 'flex', justifyContent: 'space-between' }}>
          <NavLink
            to={isAuthenticated ? '/todos' : '/login'}
            className="brand-logo"
            style={{ position: 'relative' }}>
            Logo
          </NavLink>
          <div>
            <div className="input-field">
              <input
                id="search"
                type="search"
                value={searchValue}
                onChange={handleChangeSearchValue}
              />
              <label className="label-icon" htmlFor="search">
                <i className="material-icons">search</i>
              </label>
              <i className="material-icons" onClick={() => setSearchValue('')}>
                close
              </i>
            </div>
          </div>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {examinationAuthRoutMemo.map(({ to, name }) => (
              <li key={to}>
                <NavLink to={to}>{name}</NavLink>
              </li>
            ))}
            {userData?.token && (
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
