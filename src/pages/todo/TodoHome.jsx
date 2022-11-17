import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";

import "./Todo.scss";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import FilterTodos from "./FilterTodos";

const TodoHome = () => {
  const [isAddActive, setAddActive] = useState(false);
  const [filter, setFilter] = useState("all");
  const { user } = useAuthContext();
  const { documents: todos, error } = useCollection(
    "todos",
    ["uid", "==", user.uid],
    ["date", "asc"]
  );

  const allCategories = [
    { value: "work", label: "Work" },
    { value: "home", label: "Home" },
    { value: "travel", label: "Travel" },
    { value: "family", label: "Family" },
    { value: "important", label: "Important" },
    { value: "urgent", label: "Urgent" },
  ];

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="todo">
      {isAddActive && <AddTodo allCategories={allCategories} />}
      <div className="todo__container">
        <button
          className="btn todo__add"
          onClick={() => setAddActive(!isAddActive)}
        >
          {isAddActive ? "Hide" : "Add something to do"}
        </button>
        <FilterTodos
          allCategories={allCategories}
          handleFilterChange={handleFilterChange}
          filter={filter}
        />
        {error && <p className="error">{error}</p>}
        {todos && <TodoList todos={todos} filter={filter} />}
      </div>
    </div>
  );
};

export default TodoHome;
