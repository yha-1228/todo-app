//TODO: POST実装

import React, { Component } from 'react';
import axios from 'axios';
import classNames from 'classnames';

function AddTodo({ onAddTodoChange, newTodo, onAddTodoClick }) {
  return (
    <div>
      <form method="post">
        <input type="text" onChange={onAddTodoChange} value={newTodo} />
        <button type="submit" onClick={onAddTodoClick}>
          Add Todo
        </button>
      </form>
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
    this.handleAddTodoChange = this.handleAddTodoChange.bind(this);
    this.handleAddTodoClick = this.handleAddTodoClick.bind(this);
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

  handleAddTodoChange(e) {
    this.setState({ newTodo: e.target.value });
  }

  handleAddTodoClick(e) {
    e.preventDefault();
    console.log('Clicked!');
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
          <AddTodo
            onAddTodoChange={this.handleAddTodoChange}
            newTodo={this.state.newTodo}
            onAddTodoClick={this.handleAddTodoClick}
          />
          <TodoList
            onCompletedChange={this.handleCompletedChange}
            todos={this.state.todos}
          />
        </div>
      );
  }
}

export default TodoView;
