import React, { Component } from 'react';
import axios from 'axios';
import classNames from 'classnames';

function AddTodo({ onAddTodoChange, onNewTodoSubmit }) {
  return (
    <div>
      <input type="text" onChange={onAddTodoChange} />
      <button type="submit" onSubmit={onNewTodoSubmit}>
        Add Todo
      </button>
    </div>
  );
}

function TodoList({ todos, onCompletedChange }) {
  return (
    <ul>
      {todos.map(todo => (
        <Todo todo={todo} onCompletedChange={onCompletedChange} key={todo.id} />
      ))}
    </ul>
  );
}

function Todo({ todo, onCompletedChange }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onCompletedChange}
        data-id={todo.id}
      />{' '}
      <span
        className={classNames({
          'line-through': todo.completed,
          'text-lightgray': todo.completed,
        })}
      >
        {todo.text}
      </span>
    </li>
  );
}

class TodoView extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false, error: null, todos: [], newTodo: '' };
    this.url = 'https://5e6736691937020016fed762.mockapi.io/todos';
    this.handleCompletedChange = this.handleCompletedChange.bind(this);
  }

  loadTodos(url) {
    axios
      .get(url)
      .then(result => {
        this.setState({ loaded: true, error: null, todos: result.data });
      })
      .catch(result => {
        this.setState({ loaded: true, error: result, todos: [] });
      });
  }

  componentDidMount() {
    this.loadTodos(this.url);
  }

  handleCompletedChange(e) {
    const checked = e.target.checked;
    const changedId = e.target.dataset.id;
    axios
      .put(`${this.url}/${changedId}`, { completed: checked })
      .then(result => {
        const changedTodo = result.data;
        console.log(`Updated ${changedTodo.text}.`);
        this.loadTodos(this.url);
      });
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading...</div>;
    } else
      return (
        <div>
          <AddTodo />
          <TodoList
            todos={this.state.todos}
            onCompletedChange={this.handleCompletedChange}
          />
        </div>
      );
  }
}

export default TodoView;
