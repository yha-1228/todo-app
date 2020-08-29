//TODO: POST実装

import React, { Component } from 'react';
import axios from 'axios';
import classNames from 'classnames';

function AddTodo({ onAddTodoChange, newTodoText, onAddTodoClick }) {
  return (
    <form method="post">
      <input type="text" onChange={onAddTodoChange} value={newTodoText} />
      <button type="submit" onClick={onAddTodoClick}>
        Add Todo
      </button>
    </form>
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
    this.state = { loaded: false, error: null, todos: [], newTodoText: '' };
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
    this.setState({ newTodoText: e.target.value });
  }

  handleAddTodoClick(e) {
    e.preventDefault();
    console.log(this.state);
    axios
      .post(this.url, {
        id: '',
        text: (this.state.newTodoText).trim(),
        completed: false,
      })
      .then(result => {
        const addedTodo = result.data;
        console.log(`Added ${addedTodo.text}.`);
        this.setState({ newTodoText: '' });
        this.loadTodos(this.url);
      });
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
    return (
      <div>
        <AddTodo
          onAddTodoChange={this.handleAddTodoChange}
          newTodoText={this.state.newTodoText}
          onAddTodoClick={this.handleAddTodoClick}
        />
        {!this.state.loaded ? (
          <div>Loading...</div>
        ) : (
          <TodoList
            onCompletedChange={this.handleCompletedChange}
            todos={this.state.todos}
          />
        )}
      </div>
    );
  }
}

export default TodoView;
