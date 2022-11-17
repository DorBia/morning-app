const FilterTodos = ({ allCategories, handleFilterChange, filter }) => {
  return (
    <div className="todo__filters">
      <p>Filter by:</p>
      <button
        onClick={() => handleFilterChange("all")}
        className={filter === "all" ? "btn btn--active" : "btn"}
      >
        All
      </button>
      {allCategories.map((category) => (
        <button
          onClick={() => handleFilterChange(category.value)}
          key={category.label}
          className={filter === category.value ? "btn btn--active" : "btn"}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default FilterTodos;
