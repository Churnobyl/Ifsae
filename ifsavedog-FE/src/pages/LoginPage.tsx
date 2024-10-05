import { HTTP_STATUS } from '@/apis/ApiConstants';
import { loginApi } from '@/apis/auth/authApi';
import { Input } from '@/components/index';
import MainLayout from '@/layouts/MainLayout';
import { PATH } from '@/routers/pathConstants';
import { useTokenStore } from '@/stores/auth/tokenStore';
import { useUserStateStore } from '@/stores/auth/userStateStore';
import { UserReponseType } from '@/types/auth/UserResponseType';
import axios from 'axios';
import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserLoginInputType } from 'types/auth/UserLoginInputType';

const LoginPage = () => {
  // State
  const [userInput, setUserInput] = useState<UserLoginInputType>({
    email: '',
    password: '',
  });

  const [errMessage, setErrMessage] = useState<string>('');

  const tokenStore = useTokenStore(); // 토큰 스토어 호출
  const userStateStore = useUserStateStore(); // 유저 상태 스토어 호출
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
      const response = await loginApi(userInput); // api 호출
      const data: UserReponseType = response.data;

      // 성공
      if (response.status === HTTP_STATUS.OK) {
        // 액세스 토큰 저장
        tokenStore.setAccessToken(data.accessToken);

        // 유저 State 저장
        userStateStore.setUserState(data);
        setErrMessage(''); // 에러메시지 삭제
        navigate(PATH.MAIN); // MAIN페이지로 이동
      }
    } catch (error) {
      // 에러 발생
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
  }, [navigate, tokenStore, userInput, userStateStore]);

  // Enter 키 입력 시 로그인
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleLogin();
      }
    },
    [handleLogin],
  );

  return (
    <MainLayout showTopbar={false} showBottombar={false}>
      <main className="flex flex-col items-center gap-3 justify-center h-full w-full">
        <div className="logo"></div>
        <div className="login text-2xl">로그인</div>
        <div className="login-form flex flex-col gap-1 w-26">
          <div>
            <Input
              name={'email'}
              placeholder="이메일을 입력해주세요"
              value={userInput.email}
              onChange={handleInputChange}
            />
            <Input
              type={'password'}
              name={'password'}
              placeholder="비밀번호를 입력해주세요"
              value={userInput.password}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
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
              비밀번호 재설정
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
