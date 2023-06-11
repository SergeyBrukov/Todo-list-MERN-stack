import axios from 'axios';
import React, { useState, KeyboardEvent, useContext, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ItemTodo from '../components/item-todo/ItemTodo';
import AuthContext from '../context/Context';
import { ITodo } from '../utils/interfases';

const Todos = () => {
  const [valueTodo, setValueTodo] = useState<string>('');
  const [todos, setTodos] = useState<ITodo[]>([]);

  const isMounting = useRef(false);

  const { userData, searchValueDebounce } = useContext(AuthContext);

  const location = useLocation();
  console.log('location', location);

  const createNewTodo = () => {
    const newTodo: ITodo = {
      title: valueTodo,
      important: false,
      succsess: false,
    };
    try {
      axios
        .post('/api/todos', newTodo, {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        })
        .then((response) => {
          // setFetch(!fetch);
          setTodos((prev) => [...prev, newTodo]);
          setValueTodo('');
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyAddTodo = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && valueTodo.length > 0) {
      createNewTodo();
    }
  };

  const fetchTodos = () => {
    axios
      .get<ITodo[]>('/api/todos', {
        headers: {
          Authorization: `Bearer ${userData?.token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setTodos(response.data);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteTodo = (id: string) => {
    axios
      .delete(`/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${userData?.token}`,
        },
      })
      .then((resp) => {
        if (resp.status === 200) {
          setTodos((prev) => prev.filter((item) => item._id !== id));
        }
      })
      .catch((error) => console.log(error));
  };

  const handleChangeTodoSuccsess = (id: string, param: string) => {
    axios
      .patch(
        `/api/todos/succsess/${id}/${param}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        },
      )
      .then((resp) => {
        if (resp.status === 200) {
          setTodos((prev) =>
            prev.map((todo) => {
              if (todo._id === id) {
                return {
                  ...todo,
                  [param]: !todo[param as keyof ITodo],
                };
              }
              return todo;
            }),
          );
        }
      });
  };

  const handleEditTodo = (id: string, editValue: string) => {
    axios
      .patch(
        `/api/todos-edit-text/${id}`,
        { editValue },
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        },
      )
      .then((response) => {
        if (response.status === 200) {
          setTodos((prev) =>
            prev.map((todo) => {
              if (todo._id === id) {
                return {
                  ...todo,
                  title: editValue,
                };
              }
              return todo;
            }),
          );
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (searchValueDebounce.length > 0) {
      axios
        .get(`/api/todos-search/${searchValueDebounce}`, {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
          params: {
            searchValue: searchValueDebounce,
          },
        })
        .then((response) => {
          console.log('response', response);

          if (response.status === 200) {
            setTodos(response.data);
          }
        });
    } else if (isMounting.current && searchValueDebounce.length === 0) {
      fetchTodos();
    }
    isMounting.current = true;
  }, [searchValueDebounce]);

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <div className="row add-todo">
        <input
          id="password"
          value={valueTodo}
          onKeyUp={handleKeyAddTodo}
          onChange={(e) => setValueTodo(e.target.value)}
          className="validate"
        />
        <label htmlFor="password">Add Todo</label>
        {valueTodo.length > 0 && (
          <i className="material-icons add-todo-icon" onClick={createNewTodo}>
            add
          </i>
        )}
      </div>
      {todos.length > 0 ? (
        todos.map((item, index) => (
          <ItemTodo
            handleEditTodo={handleEditTodo}
            handleDeleteTodo={handleDeleteTodo}
            handleChangeTodoSuccsess={handleChangeTodoSuccsess}
            key={index}
            todo={item}
          />
        ))
      ) : (
        <div className="row">
          <div className="col s12 m6" style={{ width: '100%' }}>
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <p>You don't have any assignments yet</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todos;
