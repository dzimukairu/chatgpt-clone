"use client";

import { useSession, signOut } from "next-auth/react";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";

import NewChat from "./NewChat";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  const router = useRouter();
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session && query(collection(db, "users", session.user.email, "chats"), orderBy("createdAt", "asc"))
  );

  const logOut = () => {
    router.push("/");
    signOut();
  };

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <NewChat />

        {/* <div className="hidden sm:inline">
          <ModelSelection />
        </div> */}

        <div className="flex flex-col space-y-2 mt-2">
          {chats && chats.empty && (
            <div className="mt-5 text-center text-gray-400">
              <ArrowUpCircleIcon className="h-10 w-10 mx-auto animate-bounce" />
              <p className="px-5 py-3 italic text-sm text-center text-gray-400">Click the "New Chat" to start!</p>
            </div>
          )}

          {loading && (
            <div className="mt-5 text-center text-gray-400">
              <FontAwesomeIcon icon={faSpinner} spin className="h-10 w-10 mx-auto" />
              <p className="px-5 py-3 italic text-sm text-center">Loading Chats ...</p>
            </div>
          )}

          {chats && chats.docs.map((chat) => <ChatRow key={chat.id} id={chat.id} />)}
        </div>
      </div>

      {session && (
        <div className="hover:opacity-50 cursor-pointer" onClick={() => logOut()}>
          <div className="flex flex-row space-x-5 px-5 align-middle items-center">
            <div className="h-12 w-12">
              <img src={session.user.image} alt="proPic" className="rounded-full cursor-pointer mb-2 border" />
            </div>
            <div className="text-gray-200 text-sm">
              <p className="font-bold">{session.user.name}</p>
              <p>{session.user.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
