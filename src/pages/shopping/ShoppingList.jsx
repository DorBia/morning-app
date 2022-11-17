import { useFirestore } from "../../hooks/useFirestore"

const ShoppingList = ({ shopping, filter }) => {

  const { deleteDocument } = useFirestore("shopping")

  const filteredShoppingList = shopping
    ? shopping.filter((item) => {
        if (filter === "all") {
          return true;
        } else {
          console.log(item.category)
          return item.category === filter;
        }
      })
    : null;

  let total = 0;

  filteredShoppingList.forEach(item => total += Number(item.amount))

  return (
    <ul className="shopping__list">
        {filteredShoppingList.map((item) => (
        <li key={item.id} className={`shopping__item shopping__item--${item.category}`}>
          <div>
            {item.link && <a href={item.link} target="_blank" rel="noreferrer" className="shopping__name">{item.name}</a>}
            {!item.link && <p className="shopping__name">{item.name}</p> }
          </div>
            <p className="shopping__amount">£{item.amount}</p>
            <button className="btn" onClick={() => deleteDocument(item.id)}>X</button>
        </li>
        ))}
        <li className={`shopping__item shopping__item--${filter}`}>
          <p className="shopping__name">Total:</p>
          <p className="shopping__amount">£{total.toFixed(2)}</p>
        </li>
    </ul>
  )
}

export default ShoppingList