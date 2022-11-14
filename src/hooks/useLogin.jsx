import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

// firebase imports
import { db, auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

export const useLogin = () => {
  const { dispatch } = useAuthContext();

  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      // login
      const res = await signInWithEmailAndPassword(auth, email, password);

      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      // update online status
      await updateDoc(doc(db, "users", res.user.uid), { online: true });

      setIsPending(false);
      setError(null);
    } catch (err) {
      // set custom error messages
      if (err.message.includes("not-found")) {
        setError("User with this email doesn't exist");
      } else if (err.message.includes("wrong-password")) {
        setError("Wrong password");
      } else {
        setError(err.message);
      }
      setIsPending(false);
    }
  };

  return { login, isPending, error };
};
