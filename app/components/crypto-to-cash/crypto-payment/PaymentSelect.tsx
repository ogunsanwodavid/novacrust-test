"use client";

import { Dispatch, MouseEvent, SetStateAction, useState } from "react";

import Image from "next/image";

import ChevronDown from "../../ui/icons/ChevronDown";

export interface CurrencyOption {
  name: string;
  symbol: string;
  logo: string;
}

interface PaymentSelectProps {
  heading: string;
  editable: boolean;
  currenyOptions: CurrencyOption[];
  amount: string;
  setAmount: Dispatch<SetStateAction<string>>;
  currency: string;
  setCurrency: Dispatch<SetStateAction<string>>;
  openSelect: boolean;
  setOpenSelect: Dispatch<SetStateAction<boolean>>;
}

export default function PaymentSelect({
  heading,
  editable,
  currenyOptions,
  amount,
  setAmount,
  currency,
  setCurrency,
  openSelect,
  setOpenSelect,
}: PaymentSelectProps) {
  return (
    <div className="w-full rounded-[30px] border border-grey-3 p-6 space-y-2">
      {/** Heading */}
      <h3 className="text-grey-2 text-base font-medium md:text-lg">
        {heading}
      </h3>

      <section className="relative w-full flex  items-center justify-between gap-x-4">
        {/** Show input if component editable
         *  OR static display of amount
         */}
        {editable ? (
          <input
            type="text"
            value={amount}
            //Allow only digits and decimal point "." in input
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9.]/g, "");
              setAmount(value);
            }}
            //Reset input value if user exits with empty value
            onBlur={(e) => {
              if (e.target.value === "") {
                setAmount("0.00");
              }
            }}
            className="w-full outline-0 text-2xl text-black font-semibold"
          />
        ) : (
          <p className="text-2xl text-black font-semibold cursor-pointer line-clamp-1 whitespace-nowrap text-ellipsis">
            {amount}
          </p>
        )}

        {/** Currency select */}
        <div
          className="relative w-max py-2 px-3  bg-grey-4 border border-grey-3 rounded-full cursor-pointer"
          onClick={() => setOpenSelect((state) => !state)}
        >
          {/** Display */}
          <main className="flex gap-x-1 items-center md:gap-x-2">
            {/** Currency logo */}
            <Image
              src={
                currenyOptions.find((option) => option.name === currency)?.logo!
              }
              className="h-5 w-5 rounded-full shrink-0"
              height={20}
              width={20}
              alt={currency}
            />

            {/** Currency symbol */}
            <p className="text-[14px] text-green font-medium md:text-base">
              {
                currenyOptions.find((option) => option.name === currency)
                  ?.symbol!
              }
            </p>

            {/** Chevron down */}
            <span
              className={`inline-block transition-all duration-200 ${
                openSelect && "-rotate-180"
              }`}
            >
              <ChevronDown size="20" />
            </span>
          </main>

          {/** Options */}
          <section
            className={`z-5 absolute w-62.5 max-h-42.5 overflow-y-auto top-full -right-2 mt-1 py-3 px-4 bg-white border border-grey-3 rounded-[20px] transition-all duration-200 ${
              openSelect ? "visible" : "invisible"
            }`}
          >
            {currenyOptions.map((option) => {
              //Function to select a currency option
              function handleSelectOption(e: MouseEvent<HTMLDivElement>) {
                e.stopPropagation(); //prevent parent onClick
                setOpenSelect(false);
                setCurrency(option.name);
              }

              return (
                <div
                  key={option.symbol}
                  className={`flex items-center gap-x-2 gap-y-1 py-3 px-4 rounded-xl ${
                    option.name === currency && "bg-grey-5"
                  }`}
                  onClick={handleSelectOption}
                >
                  {/** Logo */}
                  <Image
                    src={option.logo}
                    className="h-6 w-6 rounded-full shrink-0"
                    height={24}
                    width={24}
                    alt={option.name}
                  />

                  {/** Name */}
                  <p className="capitalize text-black text-[14px] font-medium md:text-base">
                    {option.name}
                  </p>
                </div>
              );
            })}
          </section>
        </div>
      </section>
    </div>
  );
}
