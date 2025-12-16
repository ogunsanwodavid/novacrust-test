import { ReactNode } from "react";

import StepPage from "@/app/components/crypto-to-cash/StepPage";

type paramsType = Promise<{ step: string }>;

interface CreateEventStepLayoutProps {
  children: ReactNode;
  params: paramsType;
}

export default async function CryptoToCashStepPage({
  children,
  params,
}: CreateEventStepLayoutProps) {
  //Params
  const { step } = await params;

  return <StepPage step={Number(step)} />;
}
