import { useEffect, useState } from "react"
import { useFirestore } from "../../hooks/useFirestore"

import Select from "react-select";

const AddItemForm = ({ uid, allCategories }) => {

    const [error, setError] = useState(null)
    const [item, setItem] = useState({
        name: "",
        amount: "",
        link: "",
        category: ""
    })
    const { addDocument, response } = useFirestore("shopping")

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!item.category) {
            setError("Please choose a category")
            return
        }

        addDocument({
            uid,
            name: item.name, 
            amount: Number(item.amount).toFixed(2),
            category: item.category.value,
            link: item.link
        })
        setError(null)
    }

    useEffect(() => {
        if(response.success) {
            setItem(prevItem => ({ ...prevItem, name: "", amount: "", category: "", link: "" }))
        }
    }, [response.success])

  return (
    <div className="form shopping__add">
        <h3>Add item to buy</h3>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Name<span className="shopping__required">*</span>:</span>
                <input type="text" required onChange={(e) => setItem({ ...item, name: e.target.value})} value={item.name}/>
            </label>
            <label>
                <span>Link:</span>
                <input type="text" onChange={(e) => setItem({ ...item, link: e.target.value})} value={item.link}/>
            </label>
            <label>
                <span>Category<span className="shopping__required">*</span>:</span>
                <Select
                    onChange={(option) => setItem({ ...item, category: option})}
                    options={allCategories}
                />
            </label>
            {error && <p className="error">{error}</p>}
            <label>
                <span>Amount (£)<span className="shopping__required">*</span>:</span>
                <input type="number" required onChange={(e) => setItem({ ...item, amount: e.target.value})} value={item.amount}/>
            </label>
            <button className="btn">Add item</button>
        </form>
    </div>
  )
}

export default AddItemForm