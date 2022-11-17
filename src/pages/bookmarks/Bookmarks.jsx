import copy from "copy-to-clipboard";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";

import "./Bookmarks.scss"

const Bookmarks = () => {

  const { user } = useAuthContext();
  const { addDocument, response, deleteDocument } = useFirestore("bookmarks")
  const [bookmark, setBookmark] = useState({
    title: "",
    link: ""
  })

  const { documents: bookmarks, error } = useCollection(
    "bookmarks",
    ["uid", "==", user.uid],
    ["timestamp", "desc"]
  );

  const handleSubmit = (e) => {
    e.preventDefault()

    addDocument({
        uid: user.uid,
        title: bookmark.title,
        link: bookmark.link
    })
}

useEffect(() => {
    if(response.success) {
        setBookmark({ title:"", link:"" })
    }
}, [response.success])


  return (
    <>
    <div className="form">
      <h3>Add bookmark</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title:</span>
          <input type="text" required onChange={(e) => setBookmark({ ...bookmark, title: e.target.value})} value={bookmark.title}/>
        </label>
        <label>
            <span>Link:</span>
            <input type="text" onChange={(e) => setBookmark({ ...bookmark, link: e.target.value})} value={bookmark.link}/>
        </label>
        <button className="btn">Add item</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
    <ul className="bookmarks">
      {bookmarks && bookmarks.map((b) => (
        <li key={b.id} className="bookmarks__item">
          <button className="btn" onClick={() => copy(b.link)}>Copy link</button>
          <a href={b.link} className="bookmarks__title">{b.title}</a>
          <button className="btn bookmarks__delete" onClick={() => deleteDocument(b.id)}>X</button>
        </li>
      ))}
    </ul>
    </>
  )
}

export default Bookmarks