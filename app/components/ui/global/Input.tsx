import {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
} from "react";

interface InputProps {
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
  formatValueFunction?: (arg: string) => string;
  minLength?: number;
  maxLength?: number;
}

export default function Input({
  label,
  placeholder,
  value,
  setValue,
  className,
  inputClassName,
  disabled,
  formatValueFunction,
  minLength,
  maxLength,
}: InputProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {/** Label */}
      <p className="text-green font-medium text-base md:text-lg">{label}</p>

      {/** Main input */}
      <main
        className={`relative w-full px-6 py-4 border border-grey-3 rounded-full cursor-pointer ${
          disabled && "bg-grey-1 cursor-not-allowed"
        } `}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => {
            formatValueFunction
              ? setValue(formatValueFunction(e.target.value))
              : setValue(e.target.value);
          }}
          className={`w-full outline-0 text-green text-base placeholder:text-base placeholder:text-grey-2 md:text-lg md:placeholder:text-lg ${inputClassName}`}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          minLength={minLength}
        />
      </main>
    </div>
  );
}
