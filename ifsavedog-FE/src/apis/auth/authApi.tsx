import { ENDPOINT } from '@/apis/ApiConstants';
import { baseInstance } from '@/apis/axios';

export const loginApi = async (userInput: {
  email: string;
  password: string;
}) => {
  return await baseInstance.post(ENDPOINT.LOGIN, userInput);
};
