import { Step } from '@/types/auth/SignupStepEnum';

export type UserSignupInputType = {
  step: Step;
  email: string;
  password: string;
  nickname: string;
  role: number;
  authNumber: string;
};
