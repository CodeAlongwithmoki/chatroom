import React, { useState, useEffect } from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import Chat from "./Chat";
import "./auth.css";

const Auth = () => {
  const [info, setInfo] = useState(null);

  const signInWithPopupAsync = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setInfo(result.user);
    } catch (error) {
      console.error("error signing in:", error);
    }
  };

  return (
    <>
      {info ? (
        <Chat info={info} />
      ) : (
        <div>
          <button onClick={signInWithPopupAsync}>Sign In</button>
        </div>
      )}
    </>
  );
};

export default Auth;
