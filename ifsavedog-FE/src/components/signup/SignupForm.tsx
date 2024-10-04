import { HTTP_STATUS } from '@/apis/ApiConstants';
import {
  emailAuthApi,
  signupApi,
  verifyEmailCodeApi,
} from '@/apis/auth/authApi';
import StepAuthNumber from '@/components/signup/steps/StepAuthNumber';
import StepEmail from '@/components/signup/steps/StepEmail';
import StepRest from '@/components/signup/steps/StepRest';
import MainLayout from '@/layouts/MainLayout';
import { PATH } from '@/routers/pathConstants';
import { useSignupStore } from '@/stores/auth/signupStore';
import { useTokenStore } from '@/stores/auth/tokenStore';
import { Step } from '@/types/auth/SignupStepEnum';
import axios from 'axios';
import { ChangeEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';

const SignupForm = () => {
  /**
   * State
   */

  const signupStore = useSignupStore();

  // 에러 메세지
  const [errMessage, setErrMessage] = useState<string>('');

  const tokenStore = useTokenStore(); // 토큰 스토어 호출
  const navigate = useNavigate(); // 로그인 성공 후 이동할 Navigate 호출

  /**
   * 이메일 Step
   */
  const [isSended, setIsSended] = useState<boolean>(false);
  const [isEmailSendPending, setIsEmailSendPending] = useState<boolean>(false);

  /**
   * 인증번호 Step
   */
  const [isAuthed, setIsAuthed] = useState<boolean>(false);
  const [isAuthSendPending, setIsAuthSendPending] = useState<boolean>(false);

  /**
   * 기타정보 Step
   */
  const [isSignupSendPending, setIsSignupSendPending] =
    useState<boolean>(false);

  // Input 반영
  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      signupStore.setUserInput({
        [name]: value,
      });

      setErrMessage('');
    },
    [signupStore],
  );

  /**
   * 이메일 인증 로직
   */
  const handleEmailAuth = useCallback(async () => {
    try {
      setErrMessage('');
      setIsEmailSendPending(true);
      const response = await emailAuthApi(signupStore.userInput.email);

      if (response.status === HTTP_STATUS.OK) {
        signupStore.setStep(Step.인증번호);
        setIsSended(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrMessage(error.response!.data.errorMessage);
      }
    } finally {
      setIsEmailSendPending(false);
    }
  }, [signupStore]);

  /**
   * 인증번호 로직
   */
  const handleAuthNumber = useCallback(async () => {
    if (isAuthed) return; // 이미 인증됐다면 패스

    try {
      setErrMessage('');
      setIsAuthSendPending(true);
      const response = await verifyEmailCodeApi({
        email: signupStore.userInput.email,
        code: signupStore.userInput.authNumber,
      });

      if (response.status === HTTP_STATUS.OK) {
        setIsAuthed(true);
        signupStore.setStep(Step.기타정보);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrMessage(error.response!.data.errorMessage);
      }
    } finally {
      setIsAuthSendPending(false);
    }
  }, [isAuthed, signupStore]);

  /**
   * 회원가입 로직
   */
  const handleSignup = useCallback(async () => {
    try {
      setIsSignupSendPending(true);
      const response = await signupApi(signupStore.userInput);

      if (response.status === HTTP_STATUS.OK) {
        tokenStore.setAccessToken(response.data.accessToken);
        navigate(PATH.LOGIN);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrMessage(error.response!.data.errorMessage);
      }
    } finally {
      setIsSignupSendPending(false);
      setErrMessage('');
    }
  }, [navigate, signupStore.userInput, tokenStore]);

  return (
    <MainLayout showTopbar={false} showBottombar={false}>
      <main className="flex flex-col items-center gap-3 h-screen w-full pt-16">
        <div className="signup text-2xl">회원가입</div>
        <div className="signup-form flex flex-col gap-1 w-26">
          {signupStore.userInput.step >= 0 && (
            <StepEmail
              isAuthed={isAuthed}
              isSended={isSended}
              isPending={isEmailSendPending}
              value={signupStore.userInput.email}
              handleInputChange={handleInputChange}
              handleEmailAuth={handleEmailAuth}
            />
          )}
          {isEmailSendPending && (
            <div className="flex items-center justify-center">
              <MoonLoader size={30} color={'var(--color-black)'} />
            </div>
          )}
          {signupStore.userInput.step >= 1 && (
            <StepAuthNumber
              isAuthed={isAuthed}
              value={signupStore.userInput.authNumber}
              handleInputChange={handleInputChange}
              handleAuthNumber={handleAuthNumber}
            />
          )}
          {isAuthSendPending && (
            <div className="flex items-center justify-center">
              <MoonLoader size={30} color={'var(--color-black)'} />
            </div>
          )}
          {signupStore.userInput.step >= 2 && (
            <StepRest
              password={signupStore.userInput.password}
              nickname={signupStore.userInput.nickname}
              role={signupStore.userInput.role}
              handleInputChange={handleInputChange}
              handleSignup={handleSignup}
            />
          )}
          {isSignupSendPending && (
            <div className="flex items-center justify-center">
              <MoonLoader size={30} color={'var(--color-black)'} />
            </div>
          )}
        </div>
        <div className="err-message-box h-4 text-red text-sm">{errMessage}</div>
      </main>
    </MainLayout>
  );
};

export default SignupForm;
