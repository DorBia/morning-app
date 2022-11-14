import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { auth, db, storage } from "../firebase/config";

// firebase imports
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const useSignup = () => {
    const { dispatch } = useAuthContext();

  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      // signup
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res) {
        throw new Error("Could not complete signing up");
      }

      // upload user thumbnail
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
      const storageRef = ref(storage, uploadPath);
      await uploadBytes(storageRef, thumbnail);
      const imgUrl = await getDownloadURL(storageRef);

      // add display name to user
      await updateProfile(res.user, { displayName, photoURL: imgUrl });

      // create document in firestore
      await setDoc(doc(db, "users", res.user.uid), {
        online: true,
        displayName,
        photoURL: imgUrl,
      });

      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      setIsPending(false);
      setError(null);

    } catch (err) {
      if(err.message.includes("weak-password")){
        setError("Password should be at least 6 characters long")
      } else {
        setError(err.message);
      }
      
      setIsPending(false);
    }
  };

  return { signup, error, isPending };
};
