import { ENDPOINT } from '@/apis/ApiConstants';
import { baseInstance } from '@/apis/axios';
import { UserLoginInputType } from 'types/auth/UserInputType';
import { UserSignupInputType } from 'types/auth/UserSignupInputType';

export const loginApi = async (userInput: UserLoginInputType) => {
  return await baseInstance.post(ENDPOINT.LOGIN, userInput);
};

export const signupApi = async (userInput: UserSignupInputType) => {
  return await baseInstance.post(ENDPOINT.SIGNUP, userInput);
};

export const emailAuthApi = async (email: string) => {
  return await baseInstance.post(ENDPOINT.EMAIL_AUTH, email);
};

export const verifyEmailCodeApi = async ({
  email,
  code,
}: {
  email: string;
  code: string;
}) => {
  return await baseInstance.post(ENDPOINT.EMAIL_AUTH, { email, code });
};
