import React, { useState, useEffect } from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import Chat from "./Chat";

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
        <div className="text-3xl h-screen  text-[#fff] bg-[#1e1e1e]  flex flex-col  items-center justify-center">
          <h1 className="pb-80 text-5xl">MokiChat</h1>
          <button
            className="  rounded-lg bg-[#713DC5] w-40 h-14"
            onClick={signInWithPopupAsync}
          >
            Sign In
          </button>
        </div>
      )}
    </>
  );
};

export default Auth;
