"use client";

import { redirect, useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/app/hooks/global/redux";

import useCopyToClipboard from "@/app/hooks/global/useCopyClipboard";

import {
  resetState,
  setCurrentStep,
} from "@/app/redux/slices/crypto-to-cash/cryptoToCashSlice";

import {
  youPayCurrencyOptions,
  youPayFromOptions,
} from "../crypto-payment/CryptoPayment";

import ArrowLeft from "../../ui/icons/ArrowLeft";
import Copy from "../../ui/icons/Copy";
import Tick from "../../ui/icons/Tick";
import Info from "../../ui/icons/Info";
import Button from "../../ui/global/Button";

export default function SendCrypto() {
  //Router function
  const router = useRouter();

  //Redux dispatch function
  const dispatch = useAppDispatch();

  //Crypto to cash step state from redux
  const cryptoToCash = useAppSelector((state) => state.cryptoToCash);

  //Payment details
  const currency = youPayCurrencyOptions.find(
    (option) => option.name == cryptoToCash.conversion.youPayCurrency
  )?.symbol!;
  const amount = cryptoToCash.conversion.youPayAmount;
  const wallet =
    youPayFromOptions.find(
      (option) => option.value === cryptoToCash.conversion.youPayFrom
    )?.value === "other-wallets"
      ? "Others"
      : youPayFromOptions.find(
          (option) => option.value === cryptoToCash.conversion.youPayFrom
        )?.name;
  const address = "4LiV4YjbxsL6739MKghUd";

  //Check status of copying address
  const { copied: copiedAddress, copy: copyAddress } = useCopyToClipboard(
    "",
    4000
  );

  //Next function
  function handleNext() {
    //Update redux state
    dispatch(setCurrentStep(5));

    //Route to next step
    redirect("/crypto-to-cash/step/5");
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
          Send {currency} to the address below
        </h2>
      </header>

      {/** Address */}
      <div className="w-max mx-auto mt-8 flex items-center py-3 px-4 gap-x-2 rounded-[30px] bg-pastel-green text-green">
        <p className="text-base font-medium md:text-lg">{address}</p>

        {/** Copy icon
         * OR
         * Tick icon after copying address
         */}
        {copiedAddress ? (
          <Tick size="24" />
        ) : (
          <span
            className="inline-block cursor-pointer"
            onClick={() => copyAddress(address)}
          >
            <Copy size="24" />
          </span>
        )}
      </div>

      {/** Main */}
      <main className="mt-12 text-[15px] text-[#4f4f4f] font-normal space-y-8 md:text-[17px]">
        <div className="bg-grey-4 py-4 px-6 w-full space-y-6 rounded-[10px]">
          {/** Amount to send */}
          <div className="flex justify-between">
            <p>Amount to send</p>{" "}
            <p>
              {amount}
              {currency}
            </p>
          </div>

          {/** Network */}
          <div className="flex justify-between">
            <p>Network</p> <p>{currency}</p>
          </div>

          {/** Wallet */}
          <div className="flex justify-between">
            <p>Wallet</p> <p>{wallet}</p>
          </div>
        </div>

        {/** Warning */}
        <div className="flex gap-x-3 text-[#4f4f4f] font-normal">
          <span className="shrink-0">
            <Info size="22" />
          </span>

          <p className="-mt-1">
            Only send USDT to this address. Ensure the sender is on the CELO
            network otherwise you might lose your deposit
          </p>
        </div>

        {/** Next button */}
        <div className="mt-10!">
          <Button onClick={handleNext}>Next</Button>
        </div>
      </main>
    </div>
  );
}
