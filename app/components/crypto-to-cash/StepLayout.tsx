"use client";

import { ReactNode, useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAppSelector } from "@/app/hooks/global/redux";

interface StepLayoutProps {
  children: ReactNode;
  step: number;
}

export default function StepLayout({ children, step }: StepLayoutProps) {
  //Router function
  const router = useRouter();

  //Get current step from redux state
  const { currentStep } = useAppSelector((state) => state.cryptoToCash);

  useEffect(() => {
    //Route to first step if user attempts to navigate to steps above current step
    //::RUN ONLY ON MOUNT
    //if (step > currentStep) router.replace(`/crypto-to-cash/step/1`);
  }, []);

  return <div className="w-full">{children}</div>;
}
