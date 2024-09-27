import { ChangeEvent, InputHTMLAttributes, useState } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  label,
  name,
  value,
  placeholder,
  onChange,
}: InputProps) => {
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  return (
    <div className="flex flex-col w-full my-2">
      {label && (
        <label
          htmlFor={name}
          className={`left-5 px-2 font-semibold transition-all duration-300`}
        >
          {label}
        </label>
      )}
      <input
        className="w-full h-12 pl-2 bg-transparent border-2 rounded-md outline-none border-black/30 text-black/50 focus:border-main lg:h-12 md:h-12 md:text-xs md:pr-15 sm:h-12 sm:text-xs sm:pr-10 xs:h-12 xs:text-sm xs:pr-10"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={isInputFocused ? '' : placeholder}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
      />
    </div>
  );
};
