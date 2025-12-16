"use client";

import { ReactNode } from "react";

import { usePathname } from "next/navigation";

import Navigation from "./Navigation";

export default function LayoutContent({ children }: { children: ReactNode }) {
  //Pathname function
  const pathname = usePathname();

  //Pathnames were navigation bar can be displayed
  const allowNavPaths = [
    "/crypto-to-cash/step/1",
    "/cash-to-crypto",
    "/crypto-to-flat",
  ];

  return (
    <div className="bg-white w-full">
      <main className="w-full max-w-150 px-4 mx-auto mt-24 lg:mt-36">
        {/** Navigation tab */}
        {allowNavPaths.some((path) => pathname.startsWith(path)) && (
          <Navigation />
        )}

        {/** Layout children */}
        {children}
      </main>
    </div>
  );
}
