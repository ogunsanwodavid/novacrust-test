"use client";

import { useState } from "react";

import ChevronDown from "../icons/ChevronDown";
import Image from "next/image";

export interface CurrencyOption {
  name: string;
  symbol: string;
  logo: string;
}

interface PaymentSelectProps {
  initialCurrency: string;
  currenyOptions: CurrencyOption[];
}

export default function PaymentSelect({
  initialCurrency,
  currenyOptions,
}: PaymentSelectProps) {
  const [value, setValue] = useState<number>(1.0);

  const [currency, setCurrency] = useState<string>(initialCurrency);

  const [openCurrencySelect, setOpenCurrencySelect] = useState<boolean>(false);

  return (
    <div className="w-full rounded-[30px] border border-grey-3 p-6 space-y-2">
      <p className="text-grey-2 text-base font-medium md:text-lg">You pay</p>

      <section className="w-full flex  items-center justify-between gap-x-4">
        <input
          type="text"
          //Allow only digits and decimal point "." in input
          onChange={(e) => {
            e.target.value = e.target.value.replace(/[^0-9.]/g, "");
          }}
          className="w-max outline-0 text-2xl text-black font-semibold"
        />

        {/** Currency select */}
        <div className="relative w-max py-2 px-3  bg-grey-4 border border-grey-3 rounded-full cursor-pointer">
          {/** Main Display */}
          <main
            className="flex gap-x-1 items-center md:gap-x-2"
            onClick={() => setOpenCurrencySelect((state) => !state)}
          >
            {/** Currency logo */}
            <Image
              src={
                currenyOptions.find((option) => option.name === currency)?.logo!
              }
              className="h-5 rounded-full shrink-0 md:h-7"
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
              className={`inline-block transition-all duration-250 ${
                openCurrencySelect && "-rotate-180"
              }`}
            >
              <ChevronDown size="20" />
            </span>
          </main>

          {/** Options */}
          <section
            className={`z-5 absolute top-full -right-2 mt-1 py-3 px-4 bg-white border border-grey-3 rounded-[20px] transition-all duration-250 ${
              openCurrencySelect ? "visible" : "invisible"
            }`}
          >
            {currenyOptions.map((option) => {
              function handleSelectOption() {
                setOpenCurrencySelect(false);
                setCurrency(option.name);
              }

              return (
                <div
                  className={`flex items-center gap-x-2 gap-y-1 py-3 px-4 rounded-xl ${
                    option.name === currency && "bg-grey-5"
                  }`}
                  onClick={handleSelectOption}
                >
                  {/** Logo */}
                  <Image
                    src={option.logo}
                    className="h-6 shrink-0"
                    height={24}
                    width={24}
                    alt={option.name}
                  />

                  {/** Name */}
                  <p className="uppercase text-black text-[14px] font-medium md:text-base">
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
