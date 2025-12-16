import { ReactNode } from "react";

import StepPage from "@/app/components/crypto-to-cash/StepPage";

type paramsType = Promise<{ step: string }>;

interface CreateEventStepPageProps {
  children: ReactNode;
  params: paramsType;
}

export default async function CryptoToCashStepPage({
  children,
  params,
}: CreateEventStepPageProps) {
  //Params
  const { step } = await params;

  return <StepPage step={Number(step)} />;
}
