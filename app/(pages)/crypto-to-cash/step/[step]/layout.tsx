import { ReactNode } from "react";

import StepLayout from "@/app/components/crypto-to-cash/StepLayout";

type paramsType = Promise<{ step: string }>;

interface CreateEventStepLayoutProps {
  children: ReactNode;
  params: paramsType;
}

export default async function CryptoToCashStepLayout({
  children,
  params,
}: CreateEventStepLayoutProps) {
  //Params
  const { step } = await params;

  return <StepLayout step={Number(step)}>{children}</StepLayout>;
}
