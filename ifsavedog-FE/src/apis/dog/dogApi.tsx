import { ENDPOINT } from '@/apis/ApiConstants';
import { instance } from '@/apis/axios';

export const dogDetailApi = async (dogId: number) => {
  return await instance.get(ENDPOINT.DOG + '/' + dogId);
};
