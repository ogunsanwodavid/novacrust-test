import CryptoPayment from "./crypto-payment/CryptoPayment";

import RecipientDetails1 from "./recipient-details-1/RecipientDetails1";

import RecipientDetails2 from "./recipient-details-2/RecipientDetails2";

import SendCrypto from "./send-crypto/SendCrypto";

import ProcessingTransaction from "./processing-transaction/ProcessingTransaction";

interface StepPageProps {
  step: number;
}

export default function StepPage({ step }: StepPageProps) {
  return (
    <div className="w-full">
      {/** Crypto payment */}
      {step === 1 && <CryptoPayment />}

      {/** Recipient Details 1 */}
      {step === 2 && <RecipientDetails1 />}

      {/** Recipient Details 2 */}
      {step === 3 && <RecipientDetails2 />}

      {/** Send Crypto */}
      {step === 4 && <SendCrypto />}

      {/** Processing Transaction */}
      {step === 5 && <ProcessingTransaction />}
    </div>
  );
}
