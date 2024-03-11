import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

// querey that connets to my database
const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));

const Chat = ({ info }) => {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) =>
        messages.push({ id: doc.id, ...doc.data() })
      );
      setData(messages);
    });

    return () => unsub();
  }, []);

  const formHanlder = (e) => {
    e.preventDefault();

    const messageContent = {
      text: value,
      name: info.displayName,
      photoURL: info.photoURL,
      timestamp: serverTimestamp(),
    };
    addDoc(collection(db, "messages"), messageContent);

    setValue("");
    setTimeout(() => {
      scrollBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // ref to scroll into view when chat sends a message
  const scrollBottomRef = useRef();

  return (
    <div className=" overflow-x-auto  h-screen bg-[#1e1e1e] text-[#fff] ">
      <div className=" h-full lg:m-auto lg:max-w-7xl">
        <div className="pb-2">
          {data.map((message) => (
            <div className=" p-1 flex  flex-row items-center" key={message.id}>
              <img
                className="rounded-full h-12 "
                src={message.photoURL}
                alt=""
              />
              <div className="pl-2">
                <strong>{message.name}</strong>: {message.text}
              </div>
            </div>
          ))}
          <div ref={scrollBottomRef}></div>
        </div>

        <form className="  flex items-center row-col" onSubmit={formHanlder}>
          <input
            className="w-full h-12 text-black outline-none"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button className=" w-64  bg-[#452956] h-12 ">Enter</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
