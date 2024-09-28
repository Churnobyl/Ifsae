import { Input } from '@/components/common/Input/Input';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { MdOutlinePermIdentity, MdOutlineVpnKey } from 'react-icons/md';

interface StepRestProps {
  password: string;
  passwordRepeat: string;
  nickname: string;
  role: number;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSignup: (event: MouseEvent<HTMLButtonElement>) => void;
}

const StepRest = ({
  password,
  passwordRepeat,
  nickname,
  role,
  handleInputChange,
  handleSignup,
}: StepRestProps) => {
  const [passwordError, setPasswordError] = useState<string | null>(null);
  console.log(passwordError);

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
          icon={MdOutlineVpnKey}
        />
        <Input
          name="passwordRepeat"
          type="password"
          placeholder="비밀번호 확인"
          value={passwordRepeat}
          onChange={handleInputChange}
          onBlur={checkPasswordsMatch}
          icon={MdOutlineVpnKey}
        />
        <Input
          name="nikcname"
          placeholder="닉네임"
          value={nickname}
          onChange={handleInputChange}
          icon={MdOutlinePermIdentity}
        />
        <div className="role-check flex flex-row items-center justify-between">
          <div>{role}</div>
          <div>{role}</div>
        </div>
        <button
          className="text-white w-full h-10 bg-main rounded-md border-none"
          onClick={() => ({
            checkPasswordsMatch,
            handleSignup,
          })}
        >
          <span>회원가입</span>
        </button>
      </div>
    </div>
  );
};

export default StepRest;
