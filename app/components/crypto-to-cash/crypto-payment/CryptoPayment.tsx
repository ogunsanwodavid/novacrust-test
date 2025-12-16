"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/app/hooks/global/redux";

import { setConversion } from "@/app/redux/slices/crypto-to-cash/cryptoToCashSlice";

import PaymentSelect, { CurrencyOption } from "./PaymentSelect";

import Select, { SelectOption } from "../../ui/global/Select";
import Button from "../../ui/global/Button";

export default function CryptoPayment() {
  //Router function
  const router = useRouter();

  //Redux dispatch function
  const dispatch = useAppDispatch();

  //Crypto to cash step state from redux
  const cryptoToCash = useAppSelector((state) => state.cryptoToCash);

  //You pay variables
  const [youPayAmount, setYouPayAmount] = useState<string>(
    cryptoToCash.conversion.youPayAmount
  );

  const [youPayCurrency, setYouPayCurrency] = useState<string>(
    cryptoToCash.conversion.youPayCurrency
  );

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
    {
      name: "Tether USD",
      symbol: "USDT",
      logo: "/static/crypto-to-cash/usdt.svg",
    },
  ];

  //You receive variables
  const [youReceiveAmount, setYouReceiveAmount] = useState<string>(
    cryptoToCash.conversion.youReceiveAmount
  );

  const [youReceiveCurrency, setYouReceiveCurrency] = useState<string>(
    cryptoToCash.conversion.youReceiveCurrency
  );

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

  //You pay from variables
  const [youPayFrom, setYouPayFrom] = useState<string>(
    cryptoToCash.conversion.youPayFrom
  );

  const [youPayFromOpenSelect, setYouPayFromOpenSelect] =
    useState<boolean>(false);

  const youPayFromOptions: SelectOption[] = [
    {
      value: "metamask",
      name: "Metamask",
      logo: "/static/crypto-to-cash/metamask.svg",
    },
    {
      value: "rainbow",
      name: "Rainbow",
      logo: "/static/crypto-to-cash/rainbow.svg",
    },
    {
      value: "wallet-connect",
      name: "WalletConnect",
      logo: "/static/crypto-to-cash/wallet-connect.svg",
    },
    {
      value: "other-wallets",
      name: "Other Crypto Wallets (Binance, Conibase, Bybit etc)",
      logo: "/static/crypto-to-cash/other-wallets.svg",
    },
  ];

  //State to monitor if user can convert currency after filling form
  const canUserConvert: boolean =
    Number(youPayAmount) > 0 &&
    Number(youReceiveAmount) > 0 &&
    youPayFrom !== "";

  //Function to convert
  function handleConvertCrypto() {
    if (!canUserConvert) return;

    //Dispatch changes to redux store
    dispatch(
      setConversion({
        youPayAmount,
        youPayCurrency,
        youReceiveAmount,
        youReceiveCurrency,
        youPayFrom,
      })
    );

    //Route to next step
    router.push("/crypto-to-cash/step/2");
  }

  //Close other selects if the one is open
  useEffect(() => {
    if (youPayOpenSelect) {
      setYouReceiveOpenSelect(false);
      setYouPayFromOpenSelect(false);
    }

    if (youReceiveOpenSelect) {
      setYouPayOpenSelect(false);
      setYouPayFromOpenSelect(false);
    }

    if (youPayFromOpenSelect) {
      setYouPayOpenSelect(false);
      setYouReceiveOpenSelect(false);
    }
  }, [youPayOpenSelect, youReceiveOpenSelect, youPayFromOpenSelect]);

  //USE EFFECT TO HANDLE DUMMY PAYMENT CONVERSION
  useEffect(() => {
    //Crypto value in USD
    const rates: Record<string, number> = {
      Ethereum: 3500,
      Bitcoin: 65000,
      Solana: 150,
      "Tether USD": 1,
    };

    //Fiat exchange rates
    const fiatRates: Record<string, number> = {
      "Nigerian Naira": 1500,
      "U.S Dollar": 1,
      "Canadian Dollar": 0.74,
    };

    const cryptoRate = rates[youPayCurrency] ?? 0;
    const fiatRate = fiatRates[youReceiveCurrency] ?? 0;

    const value = (Number(youPayAmount) || 0) * cryptoRate * fiatRate;

    //Set received amount to two decimal places
    setYouReceiveAmount(value.toFixed(2));
  }, [youPayAmount, youPayCurrency, youReceiveCurrency]);

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

      {/** You pay from select */}
      <Select
        label="You pay from"
        placeholder="Select an option"
        options={youPayFromOptions}
        value={youPayFrom}
        setValue={setYouPayFrom}
        openSelect={youPayFromOpenSelect}
        setOpenSelect={setYouPayFromOpenSelect}
      />

      {/** Convert now button
       * DISABLE TILL ALL NEEDED VARIABLES ARE FILLED
       */}
      <div className="mt-10!">
        <Button disabled={!canUserConvert} onClick={handleConvertCrypto}>
          Convert now
        </Button>
      </div>
    </div>
  );
}
