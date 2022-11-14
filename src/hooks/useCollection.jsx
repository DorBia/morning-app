import { useEffect, useState, useRef } from "react"

// firebase import
import { collection, onSnapshot, query, where } from "firebase/firestore"

// firestore import
import { db } from "../firebase/config"

export const useCollection = (collect, _query) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  // without a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call
  const q = useRef(_query).current

  useEffect(() => {
    let ref = collection(db, collect)

    if (q) {
      ref = query(ref, where(...q))
    }

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({ id: doc.id, ...doc.data() })
      });
      setDocuments(results)
      setError(null)
    }, error => {
      console.log(error)
      setError('could not fetch the data')
    })

    // unsubscribe on unmount
    return () => unsubscribe()

  }, [collect, q])

  return { documents, error }
}