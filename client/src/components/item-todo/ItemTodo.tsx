import React, { FC, useState, KeyboardEvent } from 'react';
import { ITodo } from '../../utils/interfases';

interface IItemTodo {
  todo: ITodo;
  handleDeleteTodo: (todoId: string) => void;
  handleChangeTodoSuccsess: (todoId: string, param: string) => void;
  handleEditTodo: (todoID: string, editValue: string) => void;
}

const ItemTodo: FC<IItemTodo> = ({
  todo,
  handleDeleteTodo,
  handleChangeTodoSuccsess,
  handleEditTodo,
}) => {
  console.log(todo);
  const { title, succsess, important, _id } = todo;

  const [edit, setEdit] = useState<boolean>(false);

  const [editValue, setEditValue] = useState<string>(title as string);

  const handleSaveEdit = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleEditTodo(_id as string, editValue);
      setEdit(false);
    }
  };

  return (
    <div className="row">
      <div className="col s12 m6" style={{ width: '100%' }}>
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Card Todo</span>
            {edit ? (
              <div style={{ display: 'flex' }} onKeyUp={handleSaveEdit}>
                <input value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                <i
                  className="material-icons"
                  onClick={() => {
                    setEdit(false);
                    setEditValue(title as string);
                  }}
                  style={{ cursor: 'pointer' }}>
                  close
                </i>
              </div>
            ) : (
              <p onClick={() => setEdit(true)}>{title}</p>
            )}
          </div>
          <div className="card-action" style={{ display: 'flex', gap: '10px' }}>
            <a
              className={`btn-floating btn-large waves-effect waves-light ${
                succsess ? 'green' : 'grey'
              }`}
              onClick={() => handleChangeTodoSuccsess(_id as string, 'succsess')}>
              <i className="material-icons">assistant_photo</i>
            </a>
            <a
              className={`btn-floating btn-large waves-effect waves-light ${
                important ? 'yellow' : '#ffeb3b7a'
              }`}
              onClick={() => handleChangeTodoSuccsess(_id as string, 'important')}>
              <i className="material-icons">important_devices</i>
            </a>
            <a
              className="btn-floating btn-large waves-effect waves-light red"
              onClick={() => handleDeleteTodo(_id as string)}>
              <i className="material-icons">delete_sweep</i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemTodo;
