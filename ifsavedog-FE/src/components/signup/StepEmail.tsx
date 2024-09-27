import { Input } from '@/components/common/Input/Input';
import { ChangeEvent, useState } from 'react';

interface StepEmailInterface {
  value: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleEmailAuth: () => void;
}

const StepEmail = ({
  value,
  handleInputChange,
  handleEmailAuth,
}: StepEmailInterface) => {
  const [isSended] = useState<boolean>(false);

  return (
    <div className="flex flex-row items-center justify-between gap-3 w-full">
      <Input
        name={'email'}
        placeholder="이메일"
        value={value}
        onChange={handleInputChange}
      />
      <button
        className="text-white w-full h-10 bg-main rounded-md border-none"
        onClick={handleEmailAuth}
      >
        <span>{isSended ? '재전송' : '인증'}</span>
      </button>
    </div>
  );
};

export default StepEmail;
