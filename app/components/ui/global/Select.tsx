import { Dispatch, MouseEvent, SetStateAction } from "react";

import Image from "next/image";

import ChevronDown from "../icons/ChevronDown";

export interface SelectOption {
  value: string;
  name: string;
  logo: string;
}

interface SelectProps {
  label: string;
  placeholder: string;
  options: SelectOption[];
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  openSelect: boolean;
  setOpenSelect: Dispatch<SetStateAction<boolean>>;
}

export default function Select({
  label,
  placeholder,
  options,
  value,
  setValue,
  openSelect,
  setOpenSelect,
}: SelectProps) {
  return (
    <div className="space-y-3">
      {/** Label */}
      <p className="text-green font-medium text-base md:text-lg">{label}</p>

      {/** Main select */}
      <main
        className="relative w-full px-6 py-4 border border-grey-3 rounded-full cursor-pointer"
        onClick={() => setOpenSelect((state) => !state)}
      >
        {/** Display section */}
        <section className="w-full flex items-center justify-between gap-x-2">
          {/** Show selected value and its logo
           * or custom no value text
           */}
          <div className="w-full text-green text-base font-normal line-clamp-1 whitespace-nowrap text-ellipsis md:text-lg">
            {value ? (
              <div className="flex gap-x-2">
                <Image
                  src={options.find((option) => option.value === value)?.logo!}
                  className="h-6 w-6 rounded-full shrink-0"
                  height={24}
                  width={24}
                  alt={value}
                />

                <span>
                  {options.find((option) => option.value === value)?.name}
                </span>
              </div>
            ) : (
              placeholder
            )}
          </div>

          {/** Chevron down */}
          <span
            className={`inline-block transition-all duration-200 ${
              openSelect && "-rotate-180"
            }`}
          >
            <ChevronDown size="20" />
          </span>
        </section>

        {/** Options */}
        <section
          className={`z-5 absolute w-[calc(100%-32px)] max-h-42.5 overflow-y-auto top-full left-0 ml-4 -mt-2 py-3 px-4 bg-white border border-grey-3 rounded-[20px] transition-all duration-200 ${
            openSelect ? "visible" : "invisible"
          }`}
        >
          {options.map((option) => {
            //Function to select a select option
            function handleSelectOption(e: MouseEvent<HTMLDivElement>) {
              e.stopPropagation(); //prevent parent onClick
              setOpenSelect(false);
              setValue(option.value);
            }

            return (
              <div
                key={option.value}
                className={`flex items-center gap-x-3 gap-y-1 py-3 px-4 rounded-xl ${
                  option.value === value && "bg-grey-5"
                }`}
                onClick={handleSelectOption}
              >
                {/** Logo */}
                <Image
                  src={option.logo}
                  className="h-6 w-6 rounded-full shrink-0"
                  height={24}
                  width={24}
                  alt={option.name}
                />

                {/** Name */}
                <p className="text-black text-[15px] font-medium line-clamp-1 whitespace-nowrap text-ellipsis md:text-[17px]">
                  {option.name}
                </p>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}
