import React from "react";
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
import "./chat.css";

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

    const dataContent = {
      text: value,
      name: info.displayName,
      photoURL: info.photoURL,
      timestamp: serverTimestamp(),
    };
    addDoc(collection(db, "messages"), dataContent);

    setValue("");
  };

  return (
    <div className=" overflow-x-auto relative  h-screen bg-[#1e1e1e] text-[#fff]">
      <div className="pb-20">
        {data.map((message) => (
          <div className="  flex  flex-row items-center" key={message.id}>
            <img className="rounded-full h-12 " src={message.photoURL} alt="" />
            <div className="pl-2">
              <strong>{message.name}</strong>: {message.text}
            </div>
          </div>
        ))}
      </div>
      <form
        className=" fixed bottom-0 flex items-center row-col"
        onSubmit={formHanlder}
      >
        <input
          className="h-12"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="  bg-[#452956] h-12 w-[8rem]">Enter</button>
      </form>
    </div>
  );
};

export default Chat;
