import classNames from 'classnames';
import { SelectHTMLAttributes, useState } from 'react';
import { IconType } from 'react-icons';

export interface SelectInputProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  icon?: IconType;
  options: { label: string; value: string }[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

export const SelectInput = ({
  label,
  name,
  value,
  placeholder,
  onChange,
  icon: Icon,
  options,
  disabled,
}: SelectInputProps) => {
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  return (
    <div
      className={classNames('flex', 'flex-col', 'w-full', 'my-2', {
        'opacity-60': disabled,
      })}
    >
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
            <Icon size={20} color={'var(--color-black)'} />
          </div>
        )}
        <select
          className="w-full h-12 pl-10 rounded-2xl outline-none bg-lightGray focus:bg-lightBlue"
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          disabled={disabled}
        >
          {!isInputFocused && placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
