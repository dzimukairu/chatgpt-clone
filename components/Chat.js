"use client";

import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import { useSession } from "next-auth/react";
import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";

function Chat({ chatId }) {
  const { data: session } = useSession();

  const [messages] = useCollection(
    session && query(collection(db, "users", session.user.email, "chats", chatId, "messages"), orderBy("createdAt", "asc"))
  );

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {messages && messages.empty && (
        <>
          <p className="mt-10 text-center text-white">Type a prompt in below to get started!</p>
          <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
        </>
      )}

      {messages && messages.docs.map((message) => <Message key={message.id} message={message.data()} />)}

      <div ref={messagesEndRef} />
    </div>
  );
}

export default Chat;
