import { Input } from '@/components/common/Input/Input';
import classNames from 'classnames';
import { ChangeEvent } from 'react';

interface StepAuthNumberInterface {
  isAuthed: boolean;
  value: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAuthNumber: () => void;
}

const StepAuthNumber = ({
  isAuthed,
  value,
  handleInputChange,
  handleAuthNumber,
}: StepAuthNumberInterface) => {
  return (
    <div>
      <div className="flex flex-row items-center justify-between gap-3 w-full">
        <Input
          name={'authNumber'}
          placeholder="인증번호"
          value={value}
          onChange={handleInputChange}
          disabled={isAuthed}
        />
        <button
          className={classNames(
            'text-white',
            'w-20',
            'h-10',
            'bg-main',
            'rounded-md',
            'border-none',
            {
              disabled: isAuthed,
              'bg-lightGray': isAuthed,
              'bg-main': !isAuthed,
            },
          )}
          onClick={handleAuthNumber}
        >
          <span>{isAuthed ? '인증완료' : '인증하기'}</span>
        </button>
      </div>
    </div>
  );
};

export default StepAuthNumber;
