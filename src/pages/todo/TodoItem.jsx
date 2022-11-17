import { useFirestore } from "../../hooks/useFirestore";
import formatDistance from "date-fns/formatDistance";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const TodoItem = ({ todo }) => {
  const { deleteDocument } = useFirestore("todos");
  const currentDate = new Date();

  return (
    <li
      className={
        new Date(todo.date) > currentDate
          ? "todo__item"
          : "todo__item todo__item--overdue"
      }
    >
      <button
        className="btn todo__delete"
        onClick={() => deleteDocument(todo.id)}
      >
        X
      </button>
      <div className="todo__main">
        {todo.categories.some((one) => one.value === "urgent") && (
          <h2 className="todo--urgent">!! {todo.name}</h2>
        )}
        {todo.categories.some((one) => one.value === "important") && (
          <h2 className="todo--important">! {todo.name}</h2>
        )}
        {!todo.categories.some(
          (one) => one.value === "urgent" || one.value === "important"
        ) && <h2>{todo.name}</h2>}
        {todo.timestamp && (
          <p className="todo__timestamp">
            {formatDistanceToNow(todo.timestamp.toDate(), {
              addSuffix: true,
            })}
          </p>
        )}
        <ul className="todo__categories">
          {todo.categories.map((category) => (
            <li className="todo__category" key={category.value}>
              {category.value}
            </li>
          ))}
        </ul>
      </div>
      <div className="todo__time">
        <p>{new Date(todo.date).toLocaleString()}</p>
        {new Date(todo.date) > currentDate && (
          <p style={{ color: "#999" }}>
            {formatDistance(currentDate, new Date(todo.date))} left
          </p>
        )}
        {new Date(todo.date) < currentDate && (
          <p className="todo--urgent">Overdue</p>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
