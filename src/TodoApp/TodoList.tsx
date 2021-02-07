import React from "react"
import { Todos } from "../interfaces/index"
import TodoItem from "./TodoItem"

type TodoListProps = {
  todos: Todos
  onCompletedChange: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void
}

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
  )
}

export default TodoList
