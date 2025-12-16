import CryptoPayment from "./crypto-payment/CryptoPayment";

interface StepPageProps {
  step: number;
}

export default function StepPage({ step }: StepPageProps) {
  return (
    <div className="w-full">
      {/** Crypto payment */}
      {step === 1 && <CryptoPayment />}
    </div>
  );
}
