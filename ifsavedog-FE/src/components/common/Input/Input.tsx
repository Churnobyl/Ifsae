import { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import { IconType } from 'react-icons';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  icon?: IconType;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export const Input = ({
  label,
  name,
  value,
  placeholder,
  onChange,
  icon: Icon,
  type,
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
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <Icon />
          </div>
        )}
        <input
          className="w-full h-12 pl-10 rounded-md outline-none bg-gray text-lightGray focus:border-main lg:h-12 md:h-12 md:text-xs sm:h-12 sm:text-xs xs:h-12 xs:text-sm"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={isInputFocused ? '' : placeholder}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          type={type}
        />
      </div>
    </div>
  );
};
