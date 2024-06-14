import { gql } from '@apollo/client';

export const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: ID!, $completed: Boolean!) {
    updateTodo(id: $id, input: { completed: $completed }) {
      id
      title
      completed
    }
  }
`;
