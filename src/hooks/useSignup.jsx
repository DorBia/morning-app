import { useState, useEffect } from 'react'
import { auth, db, storage } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'


export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null)
    setIsPending(true)
  
    try {
      // signup
      const res = await createUserWithEmailAndPassword(auth, email, password)

      if (!res) {
        throw new Error('Could not complete signup')
      }

      // upload user thumbnail
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
      const storageRef = ref(storage, uploadPath)
      await uploadBytes(storageRef, thumbnail)
      const imgUrl = await getDownloadURL(storageRef)

      // add display name to user
      await updateProfile(res.user, { displayName, photoURL: imgUrl })


      // create document in firestore
      await setDoc(doc(db, "users", res.user.uid), { 
        online: true,
        displayName,
        photoURL: imgUrl,
      })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}