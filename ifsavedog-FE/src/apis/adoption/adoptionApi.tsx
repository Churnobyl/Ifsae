import { ENDPOINT } from '@/apis/ApiConstants';
import { instance } from '@/apis/axios';
import { AdoptionRequestType } from '@/types/adoption/AdoptionRequestType';

export const createAdoptionApi = async (userInput: AdoptionRequestType) => {
  return await instance.post(ENDPOINT.ADOPTION, userInput);
};
