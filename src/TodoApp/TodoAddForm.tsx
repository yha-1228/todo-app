import React from "react";
import classnames from "classnames";
import List from "../components/List";
import Button from "../components/Button";
import TextField from "../components/TextField";

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
        <div className={classnames("inline-block", "pr-3")}>
          <TextField onChange={onAddTodoChange} value={newTodoText} placeholder="New Todo" />
        </div>
        <div className={classnames("inline-block")}>
          <Button type="submit">Add</Button>
        </div>
      </form>
    </List>
  );
};

export default TodoAddForm;
