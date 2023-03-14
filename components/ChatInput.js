"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import useSWR from "swr";
import ModelSelection from "./ModelSelection";

function ChatInput({ chatId }) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();

  //TODO: useSWR to get model

  const { data: model } = useSWR("model", { fallbackData: "text-davinci-003" });

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!prompt || !db) return;
    if (!session || !session.user) return;

    const input = prompt.trim();
    setPrompt("");

    const message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session.user.email,
        name: session.user.name,
        avatar: session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}`,
      },
    };

    await addDoc(collection(db, "users", session.user.email, "chats", chatId, "messages"), message);

    const notification = toast.loading("ChatGPT is thinking ...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      // toast notif to say success!
      toast.success("ChatGPT has responded!", {
        id: notification,
      });
    });
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
      {db && (
        <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
          <input
            autoFocus
            className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
            disabled={!session}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            type="text"
            placeholder="Type your message here..."
          />

          <button
            disabled={!prompt || !session || !db}
            className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:cursor-not-allowed disabled:bg-gray-300"
            type="submit"
          >
            <PaperAirplaneIcon className="h-4 w-4  -rotate-45" />
          </button>
        </form>
      )}

      {/* <div className="md:hidden">
        <ModelSelection />
      </div> */}
    </div>
  );
}

export default ChatInput;
