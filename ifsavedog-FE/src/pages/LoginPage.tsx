import { HTTP_STATUS } from '@/apis/ApiConstants';
import { loginApi } from '@/apis/auth/authApi';
import { Input } from '@/components/index';
import { PATH } from '@/routers/pathConstants';
import { useTokenStore } from '@/stores/auth/tokenStore';
import axios from 'axios';
import MainLayout from '@/layouts/MainLayout';
import { ChangeEvent, useCallback, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserInputType } from 'types/auth/UserInputType';

const LoginPage = () => {
  // State
  const [userInput, setUserInput] = useState<UserInputType>({
    email: '',
    password: '',
  });

  const [errMessage, setErrMessage] = useState<string>('');

  const tokenStore = useTokenStore(); // 토큰 스토어 호출
  const navigate = useNavigate(); // 로그인 성공 후 이동할 Navigate 호출

  // Input 반영
  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setUserInput((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
  );

  /**
   * 로그인 로직
   */
  const handleLogin = useCallback(async () => {
    try {
      const response = await loginApi(userInput);

      if (response.status === HTTP_STATUS.OK) {
        console.log(response);
        tokenStore.setAccessToken(response.data.accessToken);
        setErrMessage(''); // 에러메시지 삭제
        navigate(PATH.MAIN);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrMessage(error.response!.data.errorMessage);
      }
    } finally {
      // Input 초기화
      setUserInput({
        email: '',
        password: '',
      });
    }
  }, [navigate, tokenStore, userInput]);

  return (
    <MainLayout showTopbar={true} showBottombar={true}>
      <main className="flex flex-col items-center gap-3 justify-center h-full">
        <div className="logo">로고</div>
        <div className="login text-2xl">로그인</div>
        <div className="login-form flex flex-col gap-1">
          <div>
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
          </div>
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
        <div className="err-message-box h-4 text-red text-sm">{errMessage}</div>
      </main>
    </MainLayout>
  );
};

export default LoginPage;
