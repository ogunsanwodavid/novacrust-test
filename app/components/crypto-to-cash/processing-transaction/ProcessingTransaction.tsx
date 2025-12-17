"use client";

import Image from "next/image";

import { redirect, useRouter } from "next/navigation";

import { useAppDispatch } from "@/app/hooks/global/redux";

import {
  resetState,
  setCurrentStep,
} from "@/app/redux/slices/crypto-to-cash/cryptoToCashSlice";

import useCopyToClipboard from "@/app/hooks/global/useCopyClipboard";

import Tick from "../../ui/icons/Tick";
import Copy from "../../ui/icons/Copy";

export default function ProcessingTransaction() {
  //Router function
  const router = useRouter();

  //Redux dispatch function
  const dispatch = useAppDispatch();

  //Transaction ID
  const transactionId = "NC123456789";

  //Check status of copying trx id
  const { copied: copiedTrx, copy: copyTrx } = useCopyToClipboard("", 4000);

  //Function to go back to home
  function handleGoBackHome() {
    //Reset redux state
    dispatch(resetState());

    //Route to home
    redirect("/crypto-to-cash/step/1");
  }

  return (
    <div>
      {/** Logo */}
      <div className="w-max mx-auto">
        <Image
          src="/images/full-logo.svg"
          className="h-6"
          height="24"
          width="177"
          alt="novacrust logo"
        />
      </div>

      {/** Green check circle */}
      <Image
        src="/static/crypto-to-cash/green-check-circle.svg"
        className="mt-12 h-16.25 mx-auto md:h-18"
        height="65"
        width="65"
        alt="green check circle"
      />

      {/** Texts */}
      <div className="mt-9 space-y-1">
        <h4 className="text-center text-black text-2xl font-medium md:text-[26px]">
          Your transaction is processing.
        </h4>
        <p className="text-center text-[#4f4f4f] text-lg font-regular md:text-[22px]">
          The recipient will receive it shortly.
        </p>
      </div>

      {/** Transaction ID */}
      <div className="mt-10 bg-grey-4 py-4 px-6 w-full space-y-6 text-[15px] text-[#4f4f4f] font-normal rounded-[10px] md:text-[17px]">
        <div className="flex justify-between">
          <p>Transaction ID</p>{" "}
          <div className="flex items-center gap-x-2">
            <span>{transactionId}</span>

            {/** Copy icon
             * OR
             * Tick icon after copying trx id
             */}
            {copiedTrx ? (
              <Tick size="24" />
            ) : (
              <span
                className="cursor-pointer"
                onClick={() => copyTrx(transactionId)}
              >
                <Copy size="24" />
              </span>
            )}
          </div>
        </div>
      </div>

      {/** Go back home */}
      <p
        className="mt-14 w-max mx-auto text-green text-base font-bold cursor-pointer md:text-lg"
        onClick={handleGoBackHome}
      >
        Go back to home
      </p>
    </div>
  );
}
