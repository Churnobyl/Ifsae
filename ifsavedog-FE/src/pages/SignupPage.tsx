import { HTTP_STATUS } from '@/apis/ApiConstants';
import { emailAuthApi, signupApi } from '@/apis/auth/authApi';
import StepEmail from '@/components/signup/stepEmail';
import MainLayout from '@/layouts/MainLayout';
import { PATH } from '@/routers/pathConstants';
import { useTokenStore } from '@/stores/auth/tokenStore';
import axios from 'axios';
import { ChangeEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserSignupInputType } from 'types/auth/UserSignupInputType';

enum Step {
  이메일,
  인증번호,
  비밀번호,
  닉네임,
  롤,
  가입하기,
}

const SignupPage = () => {
  /**
   * State
   */

  // 회원가입 step
  const [step, setStep] = useState<Step>(Step.이메일);

  // 유저 인풋
  const [userInput, setUserInput] = useState<UserSignupInputType>({
    email: '',
    password: '',
    nickname: '',
    role: -1,
  });

  // 에러 메세지
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
   * 이메일 인증 로직
   */
  const handleEmailAuth = useCallback(async () => {
    try {
      const response = await emailAuthApi(userInput.email);

      if (response.status === HTTP_STATUS.OK) {
        console.log(response);
        navigate(PATH.MAIN);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrMessage(error.response!.data.errorMessage);
      }
    }
  }, [navigate, userInput.email]);

  /**
   * 회원가입 로직
   */
  const handleSignup = useCallback(async () => {
    try {
      const response = await signupApi(userInput);

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
        nickname: '',
        role: -1,
      });
    }
  }, [navigate, tokenStore, userInput]);

  return (
    <MainLayout showTopbar={false} showBottombar={false}>
      <main className="flex flex-col items-center gap-3 justify-center h-full w-full">
        <div className="signup text-2xl">회원가입</div>
        <div className="signup-form flex flex-col gap-1 w-26">
          <div>
            {step >= 0 && (
              <StepEmail
                value={userInput.email}
                handleInputChange={handleInputChange}
                handleEmailAuth={handleEmailAuth}
              />
            )}
          </div>
        </div>
        <div className="err-message-box h-4 text-red text-sm">{errMessage}</div>
      </main>
    </MainLayout>
  );
};

export default SignupPage;
