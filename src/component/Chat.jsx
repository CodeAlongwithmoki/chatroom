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
    <div>
      <div>
        {data.map((message) => (
          <div key={message.id}>
            <img src={message.photoURL} alt="" />
            <div>
              <strong>{message.name}</strong>: {message.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={formHanlder}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button>Enter</button>
      </form>
    </div>
  );
};

export default Chat;
