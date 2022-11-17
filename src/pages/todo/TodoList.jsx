import TodoItem from "./TodoItem";

const TodoList = ({ todos, filter }) => {
  const filteredTodos = todos
    ? todos.filter((todo) => {
        if (filter === "all") {
          return true;
        } else {
          return todo.categories.some((one) => one.value === filter);
        }
      })
    : null;

  return (
    <>
      <ul className="todo__list">
        {filteredTodos.map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </ul>
      {filteredTodos.length === 0 && <h2 className="todo__empty">Nothing to do.</h2> }
    </>
  );
};

export default TodoList;
