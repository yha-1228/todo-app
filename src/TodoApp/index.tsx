import React from "react"
import axios from "axios"
import { Todos, Todo } from "../types/index"
import { TODO_URL } from "../constants"
import TodoAddForm from "./TodoAddForm"
import TodoList from "./TodoList"

type TodoAppState = { loaded: boolean; error: any; todos: Todos; newTodoText: string }

const initialState = { loaded: false, error: null, todos: [], newTodoText: "" }

class TodoApp extends React.Component<{}, TodoAppState> {
  constructor(props: Readonly<{}>) {
    super(props)
    this.state = initialState
    this.handleAddTodoChange = this.handleAddTodoChange.bind(this)
    this.handleAddTodoSubmit = this.handleAddTodoSubmit.bind(this)
    this.handleCompletedChange = this.handleCompletedChange.bind(this)
  }

  loadTodos(url: string) {
    axios
      .get(url)
      .then((result) => {
        this.setState({ loaded: true, error: null, todos: result.data })
      })
      .catch((result) => {
        this.setState({ loaded: true, error: result, todos: [] })
      })
  }

  componentDidMount() {
    this.loadTodos(TODO_URL)
  }

  handleAddTodoChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ newTodoText: e.target.value })
  }

  handleAddTodoSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const newTodo = { id: null, text: this.state.newTodoText.trim(), completed: false }

    if (newTodo.text.length === 0) return

    axios.post(TODO_URL, newTodo).then((result) => {
      const addedTodo = result.data
      this.setState({ todos: [...this.state.todos, addedTodo], newTodoText: "" })
    })
  }

  handleCompletedChange(e: React.ChangeEvent<HTMLInputElement>, id: number) {
    e.preventDefault()

    const text = (this.state.todos.find((todo) => todo.id === id) as Todo).text

    console.log("id :>> ", id)

    axios.put(`${TODO_URL}/${id}`, { id, text, completed: e.target.checked }).then(() => {
      const todos = this.state.todos.map((todo) => ({
        ...todo,
        completed: todo.id === id ? e.target.checked : todo.completed,
      }))

      this.setState({ todos: todos })
    })
  }

  render() {
    return (
      <>
        {!this.state.loaded ? (
          <p>Loading...</p>
        ) : (
          <>
            <TodoList onCompletedChange={this.handleCompletedChange} todos={this.state.todos} />
            <TodoAddForm
              onAddTodoChange={this.handleAddTodoChange}
              newTodoText={this.state.newTodoText}
              onAddTodoSubmit={this.handleAddTodoSubmit}
            />
          </>
        )}
      </>
    )
  }
}

export default TodoApp
