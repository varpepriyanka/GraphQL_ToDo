import React, { useState } from 'react';
import { ApolloProvider, useQuery, useMutation } from '@apollo/client';
import client from './apollo-client';
import { GET_TODOS } from './graphql/queries';
import { TOGGLE_TODO } from './graphql/mutations';
import "./App.css";

const TodoApp = () => {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(GET_TODOS, {
    variables: { options: { paginate: { page, limit: 10 } } },
  });

  const [toggleTodo] = useMutation(TOGGLE_TODO, {
    refetchQueries: [{ query: GET_TODOS, variables: { options: { paginate: { page, limit: 10 } } } }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleToggleTodo = (id, completed) => {
    toggleTodo({
      variables: { id, completed: !completed },
    });
  };

  return (
    <div className='contain'>
      <h1 className='heading'>Todo List</h1>
      <ul>
        {data.todos.data.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id, todo.completed)}
              />
              {todo.title}
            </label>
          </li>
        ))}
      </ul>
      <div className='buttons'>
        <button onClick={() => setPage(page - 1)} disabled={page === 1} className='btn btn-danger'>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)} disabled={data.todos.data.length < 10} className='btn btn-success'>
          Next
        </button>
      </div>
    </div>
  );
};

const App = () => (
  <ApolloProvider client={client}>
    <TodoApp />
  </ApolloProvider>
);

export default App;