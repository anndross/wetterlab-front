"use client";
import Image from "next/image";
import { EmailStep } from "@/modules/auth/steps/email";
import { CodeStep } from "./steps/code";

export function Login() {
  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden bg-zinc-100">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md md:max-w-lg flex flex-col items-center justify-center gap-6">
        <Image
          src="/assets/logo.png"
          width={200}
          height={200}
          alt="Wetterlab"
          title="Wetterlab"
        />
        <EmailStep />
      </div>
    </div>
  );
}
