"use client";

import { useState } from "react";

import Image from "next/image";

import { toast } from "sonner";

import Input from "./Input";
import Button from "./Button";

interface ComingSoonProps {
  title: string;
}

export default function ComingSoon({ title }: ComingSoonProps) {
  //Email address
  const [email, setEmail] = useState<string>("");

  //Check if user can continue
  const canUserContinue = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) != null;

  //Function to update user
  function handleUpdateMe() {
    //Check if email is valid
    if (!canUserContinue) return;

    //Reset email
    setEmail("");

    //Toast message
    toast.success("You will be updated!");
  }

  return (
    <div>
      <div className="mt-12 w-max mx-auto">
        <Image
          src="/static/coming-soon.svg"
          className="h-10 md:h-13"
          height={40}
          width={213}
          alt="coming soon"
        />
      </div>

      <p className="mt-1 text-center text-[#4f4f4f] font-normal text-lg md:text-[21px]">
        {title} is almost here. Enter your email and we&apos;ll let you know the
        moment it&apos;s live.
      </p>

      {/** Email input */}
      <Input
        label="Email"
        placeholder="Enter your email address"
        value={email}
        setValue={setEmail}
        className="mt-8"
      />

      {/** Update me button */}
      <div className="mt-12">
        <Button disabled={!canUserContinue} onClick={handleUpdateMe}>
          Update me
        </Button>
      </div>
    </div>
  );
}
