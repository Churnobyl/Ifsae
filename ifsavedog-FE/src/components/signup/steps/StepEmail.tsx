import { Input } from '@/components/common/Input/Input';
import classNames from 'classnames';
import { ChangeEvent, useState } from 'react';
import { MdEmail } from 'react-icons/md';

interface StepEmailInterface {
  isSended: boolean;
  isAuthed: boolean;
  isPending: boolean;
  value: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleEmailAuth: () => void;
}

const StepEmail = ({
  isPending,
  isAuthed,
  value,
  handleInputChange,
  handleEmailAuth,
}: StepEmailInterface) => {
  const [disable, setDisable] = useState<boolean>(false);

  return (
    <div className="flex flex-row items-center justify-between gap-3 w-full">
      <Input
        name={'email'}
        placeholder="이메일"
        value={value}
        onChange={handleInputChange}
        icon={MdEmail}
        disabled={isPending || isAuthed}
      />
      <button
        className={classNames(
          'text-white',
          'w-20',
          'h-10',
          'rounded-md',
          'border-none',
          {
            'bg-main': !isAuthed && !isPending,
            '!bg-lightGray': isPending || isAuthed,
          },
        )}
        onClick={() => {
          setDisable(true);
          handleEmailAuth();
        }}
        disabled={isPending}
      >
        <span>{disable ? '재전송' : '인증'}</span>
      </button>
    </div>
  );
};

export default StepEmail;
