"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/app/hooks/global/redux";

import { setRecipientField } from "@/app/redux/slices/crypto-to-cash/cryptoToCashSlice";

import PhoneNumberInput from "./PhoneNumberInput";

import Button from "../../ui/global/Button";
import Input from "../../ui/global/Input";

import ArrowLeft from "../../ui/icons/ArrowLeft";

export default function RecipientDetails2() {
  //Router function
  const router = useRouter();

  //Redux dispatch function
  const dispatch = useAppDispatch();

  //Crypto to cash step state from redux
  const cryptoToCash = useAppSelector((state) => state.cryptoToCash);

  //Recipient account info
  const [recipientEmail, setRecipientEmail] = useState<string>(
    cryptoToCash.recipient.email
  );
  const [recipientPhoneNumber, setRecipientPhoneNumber] = useState<string>(
    cryptoToCash.recipient.phoneNumber
  );

  //State to monitor if user can go to the next step
  //If email is valid
  //and phone number of required length
  const canUserNext: boolean =
    recipientEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) != null &&
    recipientPhoneNumber !== "";

  //Function to go to the next step
  function handleNext() {
    if (!canUserNext) return;

    //Dispatch changes to redux store
    dispatch(
      setRecipientField({
        email: recipientEmail,
        phoneNumber: recipientPhoneNumber,
      })
    );

    //Route to next step
    router.push("/crypto-to-cash/step/4");
  }

  return (
    <div>
      {/** Header */}
      <header className="flex items-center">
        {/** Left arrow
         * TO NAVIGATE BACK
         */}
        <span
          className="inline-block shrink-0 cursor-pointer"
          onClick={() => router.back()}
        >
          <ArrowLeft size="21" fill="#000" />
        </span>

        <h2 className="w-max mx-auto text-xl text-green font-medium md:text-[22px]">
          Recipient details
        </h2>
      </header>

      {/**Main content  */}
      <main className="w-full mt-10 space-y-4 md:space-y-6">
        {/**Recipient email input */}
        <Input
          label="Recipient email"
          placeholder="Enter recipient email"
          value={recipientEmail}
          setValue={setRecipientEmail}
          //Allow only standard email characters
          formatValueFunction={(value: string) => {
            return value.replace(/[^a-zA-Z0-9@._-]/g, "");
          }}
        />

        {/**Recipient phone number input */}
        <PhoneNumberInput
          label="Recipient phone number"
          phoneNumber={recipientPhoneNumber}
          setPhoneNumber={setRecipientPhoneNumber}
          placeholder="000-000-00000"
        />

        {/** Next button
         * DISABLE TILL ALL NEEDED VARIABLES ARE FILLED
         */}
        <div className="mt-10!">
          <Button disabled={!canUserNext} onClick={handleNext}>
            Next
          </Button>
        </div>
      </main>
    </div>
  );
}
