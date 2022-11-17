import { useReducer } from "react";
import { db } from "../firebase/config";
import { addDoc, collection, deleteDoc, doc, serverTimestamp } from "firebase/firestore";

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case "IS_PENDING": 
            return { isPending: true, document: null, success: false, error: null }
        case "ADDED_DOC": 
            return { isPending: false, document: action.payload, success: true, error: null }
        case "DELETED_DOC":
            return { isPending: false, document: null, success: true, error: null }
        case "ERROR": 
            return { isPending: false, document: null, success: true, error: action.payload }
        default: 
            return state
    }
}

export const useFirestore = (collect) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)

    // collection reference
    const ref = collection(db, collect)


    // add document
    const addDocument = async (doc) => {
        dispatch({ type: "IS_PENDING"})
        try {
            const addedDocument = await addDoc(ref, { ...doc, timestamp: serverTimestamp()})
            dispatch({ type: "ADDED_DOC", payload: addedDocument })
        } catch(err) {
            dispatch({ type: "ERROR", payload: err.message })
        }
    }

    const deleteDocument = async (id) => {
        dispatch({ type: "IS_PENDING"})

        try {
            await deleteDoc(doc(db, collect, id))
            dispatch({ type: "DELETED_DOC" })
        } catch(err) {
            dispatch({ type: "ERROR", payload: err.message })
        }
    }

    return { addDocument, deleteDocument, response }

}