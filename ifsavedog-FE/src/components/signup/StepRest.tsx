import { Input } from '@/components/common/Input/Input';
import { ChangeEvent, useState } from 'react';
import { MdOutlinePermIdentity } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';

interface StepRestProps {
  password: string;
  passwordRepeat: string;
  nickname: string;
  role: number;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const StepRest = ({
  password,
  passwordRepeat,
  nickname,
  role,
  handleInputChange,
}: StepRestProps) => {
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Check if passwords match
  const checkPasswordsMatch = () => {
    if (password && passwordRepeat && password !== passwordRepeat) {
      setPasswordError('Passwords do not match.');
    } else {
      setPasswordError(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-between gap-3 w-full">
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={handleInputChange}
          onBlur={checkPasswordsMatch}
          icon={RiLockPasswordFill}
        />
        <Input
          name="passwordRepeat"
          type="password"
          placeholder="비밀번호 확인"
          value={passwordRepeat}
          onChange={handleInputChange}
          onBlur={checkPasswordsMatch}
          icon={RiLockPasswordFill}
        />
        <Input
          name="nikcname"
          placeholder="닉네임"
          value={nickname}
          onChange={handleInputChange}
          icon={MdOutlinePermIdentity}
        />
      </div>
      {passwordError && (
        <p className="text-red-500 text-sm mt-2">{passwordError}</p>
      )}
    </div>
  );
};

export default StepRest;
