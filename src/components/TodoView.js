import React, { Component } from 'react';
import axios from 'axios';
import classNames from 'classnames';

const TodoList = ({ todos, onCompletedChange }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <Todo todo={todo} onCompletedChange={onCompletedChange} key={todo.id} />
      ))}
    </ul>
  );
};

const Todo = ({ todo, onCompletedChange }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onCompletedChange}
        data-id={todo.id}
      />{' '}
      <span
        className={classNames(
          { 'line-through': todo.completed },
          { 'text-gray-500': todo.completed }
        )}
      >
        {todo.text}
      </span>
    </li>
  );
};

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.handleAddTodoClick = this.handleAddTodoClick.bind(this);
  }

  handleAddTodoClick(e) {
    this.props.onAddTodoClick(e);
  }

  render() {
    return (
      <form method="post">
        <input
          type="text"
          onChange={this.props.onAddTodoChange}
          value={this.props.newTodoText}
          placeholder="Add item"
          ref={this.props.todoInputRef}
        />
        <button type="submit" onClick={this.handleAddTodoClick}>
          Add
        </button>
      </form>
    );
  }
}

class TodoView extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false, error: null, todos: [], newTodoText: '' };
    this.url = 'https://5e6736691937020016fed762.mockapi.io/todos';
    this.todoInputRef = React.createRef();
    this.handleAddTodoChange = this.handleAddTodoChange.bind(this);
    this.handleAddTodoClick = this.handleAddTodoClick.bind(this);
    this.handleCompletedChange = this.handleCompletedChange.bind(this);
  }

  loadTodos(url) {
    axios
      .get(url)
      .then((result) => {
        this.setState({ loaded: true, error: null, todos: result.data });
      })
      .catch((result) => {
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
    const newTodo = {
      id: null,
      text: this.state.newTodoText.trim(),
      completed: false,
    };

    if (newTodo.text.length === 0) {
      return;
    }

    axios
      .post(this.url, newTodo)
      .then((result) => {
        const addedTodo = result.data;
        console.log(`Added ${addedTodo.text}.`);
        this.setState({ newTodoText: '' });
        this.loadTodos(this.url);
      })
      .then(() => {
        this.todoInputRef.current.focus();
      });
  }

  handleCompletedChange(e) {
    const checked = e.target.checked;
    const id = e.target.dataset.id;
    axios
      .put(`${this.url}/${id}`, { completed: checked })
      .then((result) => {
        const changedTodo = result.data;
        console.log(`Updated ${changedTodo.text}.`);
        this.loadTodos(this.url);
      });
  }

  render() {
    return (
      <>
        {!this.state.loaded ? (
          <p>Loading...</p>
        ) : (
          <TodoList
            onCompletedChange={this.handleCompletedChange}
            todos={this.state.todos}
          />
        )}
        <AddTodo
          onAddTodoChange={this.handleAddTodoChange}
          newTodoText={this.state.newTodoText}
          onAddTodoClick={this.handleAddTodoClick}
          todoInputRef={this.todoInputRef}
        />
      </>
    );
  }
}

export default TodoView;
