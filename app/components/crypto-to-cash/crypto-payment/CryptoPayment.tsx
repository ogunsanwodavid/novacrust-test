"use client";

import { useState } from "react";

import PaymentSelect, { CurrencyOption } from "../../ui/global/PaymentSelect";

export default function CryptoPayment() {
  //You pay variables
  const [youPayAmount, setYouPayAmount] = useState<number>(0);

  const [youPayCurrency, setYouPayCurrency] = useState<string>("Ethereum");

  const [youPayOpenSelect, setYouPayOpenSelect] = useState<boolean>(false);

  const youPayCurrencyOptions: CurrencyOption[] = [
    {
      name: "Ethereum",
      symbol: "ETH",
      logo: "/static/crypto-to-cash/ethereum.svg",
    },
    {
      name: "Bitcoin",
      symbol: "BTC",
      logo: "/static/crypto-to-cash/bitcoin.svg",
    },
    {
      name: "Solana",
      symbol: "SOL",
      logo: "/static/crypto-to-cash/solana.svg",
    },
  ];

  //You receive variables
  const [youReceiveAmount, setYouReceiveAmount] = useState<number>(0);

  const [youReceiveCurrency, setYouReceiveCurrency] =
    useState<string>("Nigerian Naira");

  const [youReceiveOpenSelect, setYouReceiveOpenSelect] =
    useState<boolean>(false);

  const youReceiveCurrencyOptions: CurrencyOption[] = [
    {
      name: "Nigerian Naira",
      symbol: "NGN",
      logo: "/static/crypto-to-cash/nigeria.svg",
    },
    {
      name: "U.S Dollar",
      symbol: "USD",
      logo: "/static/crypto-to-cash/america.svg",
    },
    {
      name: "Canadian Dollar",
      symbol: "CAD",
      logo: "/static/crypto-to-cash/canada.svg",
    },
  ];

  return (
    <div className="w-full mt-10 space-y-4 md:space-y-6">
      {/** You pay crypto select */}
      <PaymentSelect
        editable={true}
        heading="You pay"
        amount={youPayAmount}
        setAmount={setYouPayAmount}
        currency={youPayCurrency}
        setCurrency={setYouPayCurrency}
        openSelect={youPayOpenSelect}
        setOpenSelect={setYouPayOpenSelect}
        currenyOptions={youPayCurrencyOptions}
      />

      {/** You receive crypto select */}
      <PaymentSelect
        editable={false}
        heading="You receive"
        amount={youReceiveAmount}
        setAmount={setYouReceiveAmount}
        currency={youReceiveCurrency}
        setCurrency={setYouReceiveCurrency}
        openSelect={youReceiveOpenSelect}
        setOpenSelect={setYouReceiveOpenSelect}
        currenyOptions={youReceiveCurrencyOptions}
      />
    </div>
  );
}
