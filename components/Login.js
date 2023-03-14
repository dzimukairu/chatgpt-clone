"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

import chatgpt from "../public/chatgpt.png";

function Login() {
  return (
    <div className="bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center">
      <div onClick={() => signIn("google")} className="cursor-pointer p-10">
        <Image src={chatgpt} width={300} height={300} alt="logo" />

        <p className="text-white font-bold text-3xl animate-pulse">Sign In to use ChatGPT</p>
      </div>
    </div>
  );
}

export default Login;
