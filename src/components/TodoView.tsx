import React from "react";
import axios from "axios";
import classNames from "classnames";
import { Todos, Todo } from "../interfaces/index";
import List from "./List";
import Button from "./Button";
import TextField from "./TextField";
import { TODO_URL } from "../properties";
import Checkbox from "@material-ui/core/Checkbox";
import { CheckboxProps, withStyles } from "@material-ui/core";

type TodoAddFormProps = {
  onAddTodoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddTodoSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  newTodoText: string;
};

const TodoAddForm: React.FC<TodoAddFormProps> = (props) => {
  const { onAddTodoChange, onAddTodoSubmit, newTodoText } = props;

  const handleAddTodoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onAddTodoSubmit(e);
  };

  return (
    <List>
      <form onSubmit={handleAddTodoSubmit}>
        <div className={classNames("inline-block", "pr-3")}>
          <TextField onChange={onAddTodoChange} value={newTodoText} placeholder="New ToDo" />
        </div>
        <div className={classNames("inline-block")}>
          <Button type="submit">Add</Button>
        </div>
      </form>
    </List>
  );
};

type TodoItemProps = {
  todo: Todo;
  onCompletedChange: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void;
};

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const { todo, onCompletedChange } = props;

  const colors = {
    "gray-400": "#CBD5E0",
    "apple-default-blue": "rgb(0, 122, 255)",
  };

  const TodoItemCheckbox = withStyles({
    root: { color: colors["gray-400"], "&$checked": { color: colors["apple-default-blue"] } },
    checked: {},
  })((props: CheckboxProps) => <Checkbox color="default" {...props} />);

  return (
    <li>
      <List>
        <TodoItemCheckbox
          className={classNames("align-middle")}
          checked={todo.completed}
          onChange={(e) => onCompletedChange(e, todo.id)}
        />
        <span
          className={classNames(
            "align-middle",
            todo.completed && ["line-through", "text-gray-500"]
          )}
        >
          {todo.text}
        </span>
      </List>
    </li>
  );
};

type TodoListProps = {
  todos: Todos;
  onCompletedChange: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void;
};

const TodoList: React.FC<TodoListProps> = ({ todos, onCompletedChange }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onCompletedChange={(e) => onCompletedChange(e, todo.id)}
        />
      ))}
    </ul>
  );
};

type TodoViewProps = {};

type TodoViewState = { loaded: boolean; error: any; todos: Todos; newTodoText: string };

class TodoView extends React.Component<TodoViewProps, TodoViewState> {
  constructor(props: Readonly<TodoViewProps>) {
    super(props);
    this.state = { loaded: false, error: null, todos: [], newTodoText: "" };
    this.handleAddTodoChange = this.handleAddTodoChange.bind(this);
    this.handleAddTodoSubmit = this.handleAddTodoSubmit.bind(this);
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
    this.setState({ newTodoText: e.target.value });
  }

  handleAddTodoSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newTodo = { id: null, text: this.state.newTodoText.trim(), completed: false };

    if (newTodo.text.length === 0) return;

    axios.post(TODO_URL, newTodo).then((result) => {
      const addedTodo = result.data;
      this.setState({ todos: [...this.state.todos, addedTodo], newTodoText: "" });
    });
  }

  handleCompletedChange(e: React.ChangeEvent<HTMLInputElement>, id: number) {
    const checked = e.target.checked;
    const text = (this.state.todos.find((todo) => todo.id === id) as Todo).text;

    axios.put(`${TODO_URL}/${id}`, { id: null, text: text, completed: checked }).then(() => {
      const todos = [...this.state.todos];

      todos.forEach((todo) => {
        if (todo.id === id) todo.completed = checked;
      });

      this.setState({ todos: todos });
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
        <TodoAddForm
          onAddTodoChange={this.handleAddTodoChange}
          newTodoText={this.state.newTodoText}
          onAddTodoSubmit={this.handleAddTodoSubmit}
        />
      </>
    );
  }
}

export default TodoView;
