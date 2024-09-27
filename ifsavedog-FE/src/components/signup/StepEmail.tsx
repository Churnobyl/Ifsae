import { Input } from '@/components/common/Input/Input';
import classNames from 'classnames';
import { ChangeEvent } from 'react';
import { MdEmail } from 'react-icons/md';

interface StepEmailInterface {
  isSended: boolean;
  value: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleEmailAuth: () => void;
}

const StepEmail = ({
  isSended,
  value,
  handleInputChange,
  handleEmailAuth,
}: StepEmailInterface) => {
  return (
    <div className="flex flex-row items-center justify-between gap-3 w-full">
      <Input
        name={'email'}
        placeholder="이메일"
        value={value}
        onChange={handleInputChange}
        icon={MdEmail}
      />
      <button
        className={classNames(
          'text-white',
          'w-20',
          'h-10',
          'bg-main',
          'rounded-md',
          'border-none',
        )}
        onClick={handleEmailAuth}
      >
        <span>{isSended ? '재전송' : '인증'}</span>
      </button>
    </div>
  );
};

export default StepEmail;
