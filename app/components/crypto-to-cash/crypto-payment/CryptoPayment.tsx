import PaymentSelect, { CurrencyOption } from "../../ui/global/PaymentSelect";

export default function CryptoPayment() {
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

  return (
    <div className="w-full mt-10">
      {/** You pay crypto select */}
      <PaymentSelect
        initialCurrency="Ethereum"
        currenyOptions={youPayCurrencyOptions}
      />
    </div>
  );
}
