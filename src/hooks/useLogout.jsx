import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { auth, db } from '../firebase/config'

// firebase import
import { signOut } from "firebase/auth"
import { doc, updateDoc } from 'firebase/firestore'

export const useLogout = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch, user } = useAuthContext()
  
  const logout = async () => {
    setError(null)
    setIsPending(true)

    try {
      // update online status
      const { uid } = user
      await updateDoc(doc(db, "users", uid), { online: false })

      // sign the user out
      await signOut(auth)
      
      // dispatch logout action
      dispatch({ type: 'LOGOUT' })

      // update state
        setIsPending(false)
        setError(null)
    } 
    catch(err) {
        setError(err.message)
        setIsPending(false)
    }
  }

  return { logout, error, isPending }
}