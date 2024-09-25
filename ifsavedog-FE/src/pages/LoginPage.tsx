import { HTTP_STATUS } from '@/apis/ApiConstants';
import { loginApi } from '@/apis/auth/authApi';
import { Input } from '@/components/index';
import { PATH } from '@/routers/pathConstants';
import { useTokenStore } from '@/stores/auth/tokenStore';
import { ChangeEvent, useCallback, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  });

  const tokenStore = useTokenStore();
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInput((userInput) => ({
      ...userInput,
      [name]: value,
    }));
  };

  /**
   * 로그인
   */
  const handleLogin = useCallback(async () => {
    const response = await loginApi(userInput);

    if (response.status === HTTP_STATUS.OK) {
      console.log(response);
      tokenStore.setAccessToken(response.data.accessToken);
      navigate(PATH.MAIN);
    }
  }, [navigate, tokenStore, userInput]);

  return (
    <main className="flex flex-col items-center justify-center h-full">
      <div className="logo"></div>
      <div className="login">로그인</div>
      <div className="login-form">
        <Input
          name={'email'}
          placeholder="이메일을 입력해주세요"
          value={userInput.email}
          onChange={handleInputChange}
        />
        <Input
          name={'password'}
          placeholder="비밀번호를 입력해주세요"
          value={userInput.password}
          onChange={handleInputChange}
        />
        <button
          className="text-white w-full h-10 bg-main rounded-md border-none"
          onClick={handleLogin}
        >
          <span>로그인</span>
        </button>
        <div className="flex flex-row justify-end gap-1 text-sm text-black">
          <NavLink to={`${PATH.PASSWORD_RESET}`} className="text-main">
            비밀번호 초기화
          </NavLink>
          <div> | </div>
          <NavLink to={`${PATH.SIGNUP}`} className="text-main">
            회원가입
          </NavLink>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
