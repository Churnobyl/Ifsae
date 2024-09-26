import { ENDPOINT } from '@/apis/ApiConstants';
import { baseInstance } from '@/apis/axios';
import { UserInputType } from 'types/auth/UserInputType';

export const loginApi = async (userInput: UserInputType) => {
  return await baseInstance.post(ENDPOINT.LOGIN, userInput);
};
