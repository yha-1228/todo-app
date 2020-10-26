import React from "react";
import axios from "axios";
import classNames from "classnames";
import { Todos, Todo } from "../interfaces/index";
import List from "./List";
import Button from "./Button";
import TextField from "./TextField";
import { TODO_URL } from "../application.properties";

type AddTodoProps = {
  onAddTodoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAddTodoClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  newTodoText: string;
  todoInputRef: any;
};

type AddTodoState = {};

class AddTodo extends React.Component<AddTodoProps, AddTodoState> {
  constructor(props: Readonly<AddTodoProps>) {
    super(props);
    this.handleAddTodoClick = this.handleAddTodoClick.bind(this);
  }

  handleAddTodoClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    this.props.onAddTodoClick(e);
  }

  render() {
    return (
      <List>
        <form method="post">
          <div className={classNames("inline-block", "pr-3")}>
            <TextField
              onChange={this.props.onAddTodoChange}
              value={this.props.newTodoText}
              placeholder="Add item"
              ref={this.props.todoInputRef}
            />
          </div>
          <div className={classNames("inline-block")}>
            <Button type="submit" onClick={this.handleAddTodoClick}>
              Add
            </Button>
          </div>
        </form>
      </List>
    );
  }
}

type TodoItemProps = {
  todo: Todo;
  onCompletedChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onCompletedChange }) => {
  return (
    <li>
      <List>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onCompletedChange}
          data-id={todo.id}
        />{" "}
        <span className={classNames(todo.completed && ["line-through", "text-gray-500"])}>
          {todo.text}
        </span>
      </List>
    </li>
  );
};

type TodoListProps = {
  todos: Todos;
  onCompletedChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TodoList: React.FC<TodoListProps> = ({ todos, onCompletedChange }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onCompletedChange={onCompletedChange} />
      ))}
    </ul>
  );
};

type TodoViewProps = {};

type TodoViewState = { loaded: boolean; error: any; todos: Todos; newTodoText: string };

class TodoView extends React.Component<TodoViewProps, TodoViewState> {
  todoInputRef: React.RefObject<HTMLInputElement>;

  constructor(props: Readonly<TodoViewProps>) {
    super(props);
    this.state = { loaded: false, error: null, todos: [], newTodoText: "" };
    this.todoInputRef = React.createRef<HTMLInputElement>();
    this.handleAddTodoChange = this.handleAddTodoChange.bind(this);
    this.handleAddTodoClick = this.handleAddTodoClick.bind(this);
    this.handleCompletedChange = this.handleCompletedChange.bind(this);
  }

  loadTodos(url: string) {
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
    this.loadTodos(TODO_URL);
  }

  handleAddTodoChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ newTodoText: e.currentTarget.value });
  }

  handleAddTodoClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const newTodo = { id: null, text: this.state.newTodoText.trim(), completed: false };

    if (newTodo.text.length === 0) return;

    axios
      .post(TODO_URL, newTodo)
      .then((result) => {
        const addedTodo = result.data;
        this.setState({ todos: [...this.state.todos, addedTodo], newTodoText: "" });
      })
      .then(() => {
        if (!this.todoInputRef.current) return;
        this.todoInputRef.current.focus();
      });
  }

  handleCompletedChange(e: React.ChangeEvent<HTMLInputElement>) {
    const checked = e.currentTarget.checked;
    const id = e.currentTarget.dataset.id;
    axios.put(`${TODO_URL}/${id}`, { completed: checked }).then((result) => {
      const copiedTodos = [...this.state.todos];
      copiedTodos.forEach((todo) => {
        if (todo.id === id) todo.completed = checked;
      });
      this.setState({ todos: copiedTodos });
    });
  }

  render() {
    return (
      <>
        {!this.state.loaded ? (
          <p>Loading...</p>
        ) : (
          <TodoList onCompletedChange={this.handleCompletedChange} todos={this.state.todos} />
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
