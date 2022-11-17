import { useEffect, useState } from "react"
import { useFirestore } from "../../hooks/useFirestore"

import Select from "react-select";

const AddItemForm = ({ uid, allCategories }) => {

    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const [link, setLink] = useState("")
    const [category, setCategory] = useState("")
    const [error, setError] = useState(null)
    const { addDocument, response } = useFirestore("shopping")

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!category) {
            setError("Please choose a category")
            return
        }

        addDocument({
            uid,
            name, 
            amount: Number(amount).toFixed(2),
            category: category.value,
            link
        })
        setError(null)
    }

    useEffect(() => {
        if(response.success) {
            setName("")
            setAmount("")
            setLink("")
        }
    }, [response.success])

  return (
    <div className="form shopping__add">
        <h3>Add item to buy</h3>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Name<span className="shopping__required">*</span>:</span>
                <input type="text" required onChange={(e) => setName(e.target.value)} value={name}/>
            </label>
            <label>
                <span>Link:</span>
                <input type="text" onChange={(e) => setLink(e.target.value)} value={link}/>
            </label>
            <label>
                <span>Category<span className="shopping__required">*</span>:</span>
                <Select
                    onChange={(option) => setCategory(option)}
                    options={allCategories}
                />
            </label>
            {error && <p className="error">{error}</p>}
            <label>
                <span>Amount (£)<span className="shopping__required">*</span>:</span>
                <input type="number" required onChange={(e) => setAmount(e.target.value)} value={amount}/>
            </label>
            <button className="btn">Add item</button>
        </form>
    </div>
  )
}

export default AddItemForm