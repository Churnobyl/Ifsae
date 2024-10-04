import { Input } from '@/components/common/Input/Input';
import RoleItem from '@/components/signup/RoleItem';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { MdOutlinePermIdentity, MdOutlineVpnKey } from 'react-icons/md';

interface StepRestProps {
  password: string;
  nickname: string;
  role: number;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSignup: (event: MouseEvent<HTMLButtonElement>) => void;
}

const StepRest = ({
  password,
  nickname,
  handleInputChange,
  handleSignup,
}: StepRestProps) => {
  const [passwordRepeat, setPasswordRepeat] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordMatch, setPasswordMatch] = useState<boolean>(false);

  // 비밀번호 일치 확인
  const handlePasswordRepeatChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPasswordRepeat(value);

    // 비밀번호와 일치하는지 검사
    if (password && value !== password) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      setPasswordMatch(false);
    } else if (password && value === password) {
      setPasswordError(null);
      setPasswordMatch(true);
    } else {
      setPasswordError(null);
      setPasswordMatch(false);
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
          icon={MdOutlineVpnKey}
        />
        <Input
          name="passwordRepeat"
          type="password"
          placeholder="비밀번호 확인"
          value={passwordRepeat}
          onChange={handlePasswordRepeatChange}
          icon={MdOutlineVpnKey}
        />
        {passwordError && <p className="text-red">{passwordError}</p>}
        {passwordMatch && (
          <p className="text-pointGreen">비밀번호가 일치합니다.</p>
        )}
        <Input
          name="nickname"
          placeholder="닉네임"
          value={nickname}
          onChange={handleInputChange}
          icon={MdOutlinePermIdentity}
        />
        <div className="role-check flex flex-row items-center justify-between gap-20">
          <RoleItem roleId={0} roleName={'개인'} image={'individual'} />
          <RoleItem roleId={1} roleName={'단체'} image={'shelter'} />
        </div>
        <button
          className="text-white w-full h-10 bg-main rounded-md border-none"
          onClick={handleSignup}
          disabled={!passwordMatch} // 비밀번호 일치하지 않을 경우 버튼 비활성화
        >
          <span>회원가입</span>
        </button>
      </div>
    </div>
  );
};

export default StepRest;
