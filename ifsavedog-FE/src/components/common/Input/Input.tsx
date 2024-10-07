import classNames from 'classnames';
import {
  ChangeEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  useState,
} from 'react';
import { IconType } from 'react-icons';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  icon?: IconType;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  type?: string;
}

export const Input = ({
  label,
  name,
  value,
  placeholder,
  onChange,
  onKeyDown,
  icon: Icon,
  type,
  disabled,
}: InputProps) => {
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
        <input
          className="w-full h-12 pl-10 rounded-2xl outline-none bg-lightGray focus:bg-lightBlue"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={isInputFocused ? '' : placeholder}
          onFocus={() => setIsInputFocused(true)}
          onKeyDown={onKeyDown}
          onBlur={() => setIsInputFocused(false)}
          type={type}
          disabled={disabled}
        />
      </div>
    </div>
  );
};
