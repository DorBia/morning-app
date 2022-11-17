import { useAuthContext } from "../../hooks/useAuthContext"
import { useCollection } from "../../hooks/useCollection"

import "./Shopping.scss"
import "../../components/FilterList/FilterList.scss"
import AddItemForm from "./AddItemForm"
import ShoppingList from "./ShoppingList"
import { useState } from "react"
import FilterList from "../../components/FilterList/FilterList"

const ShoppingHome = ({screenSize}) => {
  const [filter, setFilter] = useState("all");
  const [isAddActive, setAddActive] = useState(false)
  const { user } = useAuthContext()
  const { documents, error } = useCollection(
    "shopping", 
    ["uid", "==", user.uid],
    ["timestamp", "desc"]
  )

  const allCategories = [
    { value: "electronics", label: "Electronics" },
    { value: "fashion", label: "Fashion" },
    { value: "grocery", label: "Grocery" },
    { value: "health", label: "Health/Beauty" },
    { value: "hobby", label: "Hobby" },
    { value: "home-item", label: "Home" },
    { value: "other", label: "Other" },
    { value: "travel-item", label: "Travel" },
  ];

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="shopping">
      <div className="shopping__content">
      <FilterList
          allCategories={allCategories}
          handleFilterChange={handleFilterChange}
          filter={filter}
        />
        {error && <p>{error}</p>}
        {documents && <ShoppingList shopping={documents} filter={filter}/>}
      </div>
      <div>
        {(screenSize.dynamicWidth > 1219 || isAddActive) && <AddItemForm uid={user.uid} allCategories={allCategories}/>}
        <div className="shopping__button">
          {screenSize.dynamicWidth < 1220 && <button className="btn" onClick={() => setAddActive(!isAddActive)}>{isAddActive ? "Hide" : "Add item"}</button>}
        </div>
      </div>
    </div>
  )
}

export default ShoppingHome