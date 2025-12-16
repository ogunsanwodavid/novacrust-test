"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

export default function Navigation() {
  //Pathname function
  const pathname = usePathname();

  return (
    <div className="w-max mx-auto flex gap-x-1 bg-grey-1 rounded-full">
      {/** Crypto to cash */}
      <Link
        href="/crypto-to-cash"
        className={`py-2 px-4 text-[14px] font-medium rounded-full md:text-base ${
          pathname.startsWith("/crypto-to-cash")
            ? "bg-green text-white"
            : "bg-transparent text-grey-2"
        }`}
      >
        Crypto to cash
      </Link>

      {/** Cash to Crypto */}
      <Link
        href="/cash-to-crypto"
        className={`py-2 px-4 text-[14px] font-medium rounded-full md:text-base ${
          pathname === "/cash-to-crypto"
            ? "bg-green text-white"
            : "bg-transparent text-grey-2"
        }`}
      >
        Cash to crypto
      </Link>

      {/** Crypto to Flat Loan */}
      <Link
        href="/crypto-to-flat"
        className={`py-2 px-4 text-[14px] font-medium rounded-full md:text-base ${
          pathname === "/crypto-to-flat"
            ? "bg-green text-white"
            : "bg-transparent text-grey-2"
        }`}
      >
        Crypto to flat loan
      </Link>
    </div>
  );
}
