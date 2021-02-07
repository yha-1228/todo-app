import React from "react";
import classnames from "classnames";
import { Todo } from "../../interfaces/index";
import List from "../List";
import Checkbox from "@material-ui/core/Checkbox";
import { CheckboxProps, withStyles } from "@material-ui/core";

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
          className={classnames("align-middle")}
          checked={todo.completed}
          onChange={(e) => onCompletedChange(e, todo.id)}
        />
        <span
          className={classnames(
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

export default TodoItem;
