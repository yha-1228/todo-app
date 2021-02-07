import React from "react"
import axios from "axios"
import { Todos, Todo } from "../interfaces/index"
import { TODO_URL } from "../constants"
import TodoAddForm from "./TodoAddForm"
import TodoList from "./TodoList"

type TodoAppState = { loaded: boolean; error: any; todos: Todos; newTodoText: string }

export default class TodoApp extends React.Component<{}, TodoAppState> {
  constructor(props: Readonly<{}>) {
    super(props)
    this.state = { loaded: false, error: null, todos: [], newTodoText: "" }
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
    const checked = e.target.checked
    const text = (this.state.todos.find((todo) => todo.id === id) as Todo).text

    axios.put(`${TODO_URL}/${id}`, { id: null, text: text, completed: checked }).then(() => {
      const todos = [...this.state.todos]

      todos.forEach((todo) => {
        if (todo.id === id) todo.completed = checked
      })

      this.setState({ todos: todos })
    })
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
    )
  }
}
