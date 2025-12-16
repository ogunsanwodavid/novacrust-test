"use client";

import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import Image from "next/image";

import ChevronDown from "../../ui/icons/ChevronDown";

interface CallCodeSelectOption {
  flag: string;
  value: string;
  name: string;
  code: string;
}

interface PhoneNumberInputProps {
  label: string;
  phoneNumber: string;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  className?: string;
  placeholder?: string;
}

export default function PhoneNumberInput({
  label,
  phoneNumber,
  setPhoneNumber,
  className,
  placeholder,
}: PhoneNumberInputProps) {
  const callCodeSelectOptions: CallCodeSelectOption[] = [
    {
      flag: "/static/crypto-to-cash/nigeria.svg",
      value: "nigeria",
      name: "Nigeria",
      code: "+234",
    },
    {
      flag: "/static/crypto-to-cash/america.svg",
      value: "america",
      name: "U.S.A",
      code: "+1",
    },
    {
      flag: "/static/crypto-to-cash/uk.svg",
      value: "uk",
      name: "United Kingdom",
      code: "+44",
    },
    {
      flag: "/static/crypto-to-cash/canada.svg",
      value: "canada",
      name: "Canada",
      code: "+1",
    },
  ];

  //Format phone number to digits
  const phoneNumberToDigits = (phoneNumber: string, countryCode: string) => {
    // Remove country code
    let digits = phoneNumber.replace(countryCode, "").replace(/\D/g, "");

    // Limit to 10 or 11 digits depending on your standard
    digits = digits.slice(0, 10);

    //Format as 000-000-0000
    let formatted = digits;
    if (digits.length > 3)
      formatted = digits.slice(0, 3) + "-" + digits.slice(3);
    if (digits.length > 6)
      formatted = formatted.slice(0, 7) + "-" + formatted.slice(6);

    return formatted;
  };

  //Call code
  const [country, setCountry] = useState<string>(
    callCodeSelectOptions.find((c) => phoneNumber.startsWith(c.code))?.value! ||
      "nigeria"
  );

  const [openCodeSelect, setOpenCodeSelect] = useState<boolean>(false);

  //11 digits of phone number
  const [digits, setDigits] = useState<string>(
    phoneNumberToDigits(
      phoneNumber,
      callCodeSelectOptions.find((c) => phoneNumber.startsWith(c.code))?.code!
    )
  );

  //Set phone number if country and digits are filled correctly
  useEffect(() => {
    if (country && digits.length === 13) {
      const selectedCountry = callCodeSelectOptions.find(
        (c) => c.value === country
      );

      if (selectedCountry) {
        //Remove any non-digit characters from digits
        const cleanDigits = digits.replace(/\D/g, "");
        setPhoneNumber(`${selectedCountry.code}${cleanDigits}`);
      }
    } else {
      setPhoneNumber("");
    }
  }, [country, digits]);

  return (
    <div className={`space-y-3 ${className}`}>
      {/** Label */}
      <p className="text-green font-medium text-base md:text-lg">{label}</p>

      {/** Main */}
      <main className={`w-full cursor-pointer flex`}>
        {/** Country code select  */}
        <div
          className="relative shrink-0 w-32 px-6 py-4 rounded-l-full border border-grey-3 bg-[#fcfcfc] md:w-35"
          onClick={() => setOpenCodeSelect((state) => !state)}
        >
          {/** Display */}
          <section className="w-full flex gap-x-1.5 items-center">
            {/** Code */}
            <p className="text-grey-2 text-[15px] md:text-[17px]">
              {
                callCodeSelectOptions.find((option) => option.value === country)
                  ?.code
              }
            </p>

            {/** Flag */}
            <Image
              src={
                callCodeSelectOptions.find((option) => option.value === country)
                  ?.flag!
              }
              className="h-6 w-6 rounded-full shrink-0"
              height={24}
              width={24}
              alt={country}
            />

            {/** Chevron down */}
            <span
              className={`inline-block transition-all duration-200 ${
                openCodeSelect && "-rotate-180"
              }`}
            >
              <ChevronDown size="20" />
            </span>
          </section>

          {/** Options */}
          <section
            className={`z-5 absolute max-h-42.5 overflow-y-auto top-full left-0 -mt-2 py-3 px-4 bg-white border border-grey-3 rounded-[20px] transition-all duration-200 ${
              openCodeSelect ? "visible" : "invisible"
            }`}
          >
            {callCodeSelectOptions.map((option) => {
              //Function to select a select option
              function handleSelectOption(e: MouseEvent<HTMLDivElement>) {
                e.stopPropagation(); //prevent parent onClick
                setOpenCodeSelect(false);
                setCountry(option.value);
              }

              return (
                <div
                  key={option.value}
                  className={`flex items-center gap-x-3 gap-y-1 py-3 px-4 rounded-xl ${
                    option.value === country && "bg-grey-5"
                  }`}
                  onClick={handleSelectOption}
                >
                  {/** Code */}
                  <p className="w-10 text-grey-2 text-[15px] font-medium line-clamp-1 whitespace-nowrap text-ellipsis md:text-[17px]">
                    {option.code}
                  </p>

                  {/** Logo */}
                  <Image
                    src={option.flag}
                    className="h-6 w-6 rounded-full shrink-0"
                    height={24}
                    width={24}
                    alt={option.value}
                  />

                  {/** Name */}
                  <p className="text-black text-[15px] font-medium line-clamp-1 whitespace-nowrap text-ellipsis md:text-[17px]">
                    {option.name}
                  </p>
                </div>
              );
            })}
          </section>
        </div>

        {/** Digits input */}
        <input
          type="text"
          value={digits}
          //Format digits to form "000-000-00000"
          onChange={(e) => {
            let value = e.target.value.replace(/\D/g, ""); // remove non-digits
            if (value.length > 3)
              value = value.slice(0, 3) + "-" + value.slice(3);
            if (value.length > 7)
              value = value.slice(0, 7) + "-" + value.slice(7, 12);
            setDigits(value);
          }}
          className={`w-full outline-0 px-6 py-4 text-green text-base border border-l-0 border-grey-3 rounded-r-full placeholder:text-base placeholder:text-grey-2 md:text-lg md:placeholder:text-lg`}
          placeholder={placeholder}
        />
      </main>
    </div>
  );
}
