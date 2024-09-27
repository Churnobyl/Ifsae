import { HTTP_STATUS } from '@/apis/ApiConstants';
import {
  emailAuthApi,
  signupApi,
  verifyEmailCodeApi,
} from '@/apis/auth/authApi';
import StepAuthNumber from '@/components/signup/StepAuthNumber';
import StepEmail from '@/components/signup/StepEmail';
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
    authNumber: '',
  });

  // 에러 메세지
  const [errMessage, setErrMessage] = useState<string>('');

  const tokenStore = useTokenStore(); // 토큰 스토어 호출
  const navigate = useNavigate(); // 로그인 성공 후 이동할 Navigate 호출

  /**
   * 이메일 Step
   */
  const [isSended, setIsSended] = useState<boolean>(false);

  /**
   * 인증번호 Step
   */
  const [isAuthed, setIsAuthed] = useState<boolean>(false);

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
      // const response = await emailAuthApi(userInput.email);

      setStep(Step.인증번호);
      setIsSended(true);
      // if (response.status === HTTP_STATUS.OK) {
      //   console.log(response);
      // }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrMessage(error.response!.data.errorMessage);
      }
    }
  }, [userInput.email]);

  /**
   * 인증번호 로직
   */
  const handleAuthNumber = useCallback(async () => {
    try {
      // const response = await verifyEmailCodeApi({
      //   email: userInput.email,
      //   code: userInput.authNumber,
      // });

      // if (response.status === HTTP_STATUS.OK) {
      setIsAuthed(true);
      setStep(Step.비밀번호);
      // }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrMessage(error.response!.data.errorMessage);
      }
    }
  }, [userInput.authNumber, userInput.email]);

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
        authNumber: '',
      });
    }
  }, [navigate, tokenStore, userInput]);

  return (
    <MainLayout showTopbar={false} showBottombar={false}>
      <main className="flex flex-col items-center gap-3 h-screen w-full pt-16">
        <div className="signup text-2xl">회원가입</div>
        <div className="signup-form flex flex-col gap-1 w-26">
          {step >= 0 && (
            <StepEmail
              isSended={isSended}
              value={userInput.email}
              handleInputChange={handleInputChange}
              handleEmailAuth={handleEmailAuth}
            />
          )}
          {step >= 1 && (
            <StepAuthNumber
              isAuthed={isAuthed}
              value={userInput.authNumber}
              handleInputChange={handleInputChange}
              handleAuthNumber={handleAuthNumber}
            />
          )}
        </div>
        <div className="err-message-box h-4 text-red text-sm">{errMessage}</div>
      </main>
    </MainLayout>
  );
};

export default SignupPage;
