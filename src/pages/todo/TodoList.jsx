import TodoItem from "./TodoItem";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

const TodoList = ({ todos, filter }) => {
  const [date, setDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const filteredTodos = todos
    ? todos.filter((todo) => {
        if (filter === "all") {
          return true;
        } else {
          return todo.categories.some((one) => one.value === filter);
        }
      })
    : null;

  const datedTodos =
    filteredTodos && date
      ? filteredTodos.filter(
          (todo) =>
            todo.date.substring(0, 10) ===
            `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        )
      : null;

  return (
    <>
      <div>
        {!showCalendar && (
          <button onClick={() => setShowCalendar(true)} className="btn">
            Show calendar
          </button>
        )}
        {showCalendar && (
          <>
            <Calendar view="month" onClickDay={(e) => setDate(e)} />
            <button
              className="btn"
              onClick={() => {
                setDate(null);
                setShowCalendar(false);
              }}
            >
              Reset date and hide calendar
            </button>
          </>
        )}
      </div>
      <ul className="todo__list">
        {datedTodos
          ? datedTodos.map((todo) => <TodoItem todo={todo} key={todo.id} />)
          : filteredTodos.map((todo) => <TodoItem todo={todo} key={todo.id} />)}
      </ul>
      {((filteredTodos.length === 0 && !datedTodos ) || datedTodos?.length === 0 )&& (
        <h2 className="todo__empty">Nothing to do.</h2>
      )}
    </>
  );
};

export default TodoList;
