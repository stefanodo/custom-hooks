import { useEffect, useReducer } from 'react';
import { todoReducer } from '../08-useReducer/todoReducer';

const init = () => {
  const storedTodos = localStorage.getItem('todos');
  try {
    return JSON.parse(storedTodos) || [];
  } catch (error) {
    console.error("Error parsing stored todos:", error);
    return [];
  }
}

const initialValue = [];

export const useTodos = () => {

  const [ todos, dispatch ] = useReducer( todoReducer, initialValue, init );

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])
  
  const handleNewTodo = ( todo ) => {
      const action = {
          type: '[TODO] Add Todo',
          payload: todo,
      }
      dispatch( action );
  }

  const handleToggleTodo = ( id ) => {
      dispatch({
          type: '[TODO] Toggle Todo',
          payload: id,
      });
  }

  const handleDeleteTodo = ( id ) => {
      dispatch({
          type: '[TODO] Remove Todo',
          payload: id,
      });
  }

  return {
    todos,
    todosCount: todos.length,
    pendingTodosCount: todos.filter(todo => !todo.done).length,
    handleNewTodo,
    handleToggleTodo,
    handleDeleteTodo,
  }
}