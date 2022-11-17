import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

import Select from "react-select";

const AddTodo = ({ allCategories, uid }) => {
  const [error, setError] = useState(null);
  const [todo, setTodo] = useState({
    name: "",
    date: "",
    categories: [],
  });

  const { addDocument, response } = useFirestore("todos");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (todo.categories.length < 1 || todo.categories.length > 3) {
      setError("Please add 1-3 categories");
      return;
    }

    addDocument({
      uid,
      name: todo.name,
      date: todo.date,
      categories: todo.categories,
    });
  };

  useEffect(() => {
    if (response.success) {
      setTodo((prevTodo) => ({ ...prevTodo, name: "" }));
    }
  }, [response.success]);

  return (
    <div className="form todo__add">
      <h3>Add what to do</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>To do:</span>
          <input
            type="text"
            required
            onChange={(e) => setTodo({ ...todo, name: e.target.value })}
            value={todo.name}
            placeholder="type what you have to do"
          />
        </label>
        <label>
          <span>Category/categories:</span>
          <Select
            onChange={(option) => setTodo({ ...todo, categories: option })}
            options={allCategories}
            isMulti
          />
        </label>
        <label>
          <span>Due date:</span>
          <input
            type="datetime-local"
            required
            onChange={(e) => setTodo({ ...todo, date: e.target.value })}
            value={todo.date}
          />
        </label>
        <button className="btn">Add to-do</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default AddTodo;
