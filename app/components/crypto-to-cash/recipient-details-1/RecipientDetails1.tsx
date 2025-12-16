"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/app/hooks/global/redux";

import { setRecipientField } from "@/app/redux/slices/crypto-to-cash/cryptoToCashSlice";

import Select, { SelectOption } from "../../ui/global/Select";
import Input from "../../ui/global/Input";
import Button from "../../ui/global/Button";

import ArrowLeft from "../../ui/icons/ArrowLeft";

export default function RecipientDetails1() {
  //Router function
  const router = useRouter();

  //Redux dispatch function
  const dispatch = useAppDispatch();

  //Crypto to cash step state from redux
  const cryptoToCash = useAppSelector((state) => state.cryptoToCash);

  //Bank select variables
  const [bank, setBank] = useState<string>(cryptoToCash.recipient.bank);

  const [bankOpenSelect, setBankOpenSelect] = useState<boolean>(false);

  const bankOptions: SelectOption[] = [
    {
      value: "first-bank",
      name: "First Bank",
      logo: "/static/crypto-to-cash/first-bank.svg",
    },
    {
      value: "opay",
      name: "Opay",
      logo: "/static/crypto-to-cash/opay.svg",
    },
    {
      value: "zenith-bank",
      name: "Zenith Bank",
      logo: "/static/crypto-to-cash/zenith-bank.png",
    },
    {
      value: "polaris",
      name: "Polaris Bank",
      logo: "/static/crypto-to-cash/polaris-bank.png",
    },
  ];

  //Recipient account info
  const [recipientAccountNumber, setRecipientAccountNumber] = useState<string>(
    cryptoToCash.recipient.accountNumber
  );
  const [recipientAccountName, setRecipientAccountName] = useState<string>(
    cryptoToCash.recipient.accountName
  );

  //State to monitor if user can go to the next step
  const canUserNext: boolean =
    bank !== "" &&
    recipientAccountNumber.length === 10 &&
    recipientAccountName !== "";

  //Function to go to the next step
  function handleNext() {
    if (!canUserNext) return;

    //Dispatch changes to redux store
    dispatch(
      setRecipientField({
        bank,
        accountName: recipientAccountName,
        accountNumber: recipientAccountNumber,
      })
    );

    //Route to next step
    router.push("/crypto-to-cash/step/3");
  }

  //Simulate auto generation of account name
  useEffect(() => {
    if (recipientAccountNumber.length === 10) {
      setRecipientAccountName("Ogunsanwo David Oluwadamilare");
    } else {
      setRecipientAccountName("");
    }
  }, [recipientAccountNumber]);

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
        {/** Bank select */}
        <Select
          label="Bank"
          placeholder="Select an option"
          options={bankOptions}
          value={bank}
          setValue={setBank}
          openSelect={bankOpenSelect}
          setOpenSelect={setBankOpenSelect}
        />

        {/**Recipient Account number input */}
        <Input
          label="Account number"
          placeholder="Enter your account number"
          value={recipientAccountNumber}
          setValue={setRecipientAccountNumber}
          //Allow only digits and decimal point "." in input
          formatValueFunction={(value: string) => {
            return value.replace(/[^0-9.]/g, "");
          }}
          maxLength={10}
        />

        {/**Recipient Account name input */}
        <Input
          label="Account name"
          value={recipientAccountName}
          setValue={setRecipientAccountName}
          disabled={true}
          inputClassName="uppercase"
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
