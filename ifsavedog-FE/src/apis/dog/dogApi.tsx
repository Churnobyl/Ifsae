import { ENDPOINT } from '@/apis/ApiConstants';
import { instance } from '@/apis/axios';

export const dogDetailApi = async (dogId: number) => {
  return await instance.get(ENDPOINT.DOG + '/' + dogId);
};

export const dogPostApi = async (dogId: number) => {
  return await instance.get(ENDPOINT.POSTLIST_DOG + '/' + dogId);
};

export const followApi = async (dogId: number) => {
  return await instance.post(`${ENDPOINT.FOLLOW}?id=${dogId}`);
};

export const unFollowApi = async (dogId: number) => {
  return await instance.delete(`${ENDPOINT.FOLLOW}?id=${dogId}`);
};

export const checkFollowApi = async (dogId: number) => {
  return await instance.get(ENDPOINT.POSTLIST_DOG + '/' + dogId);
};
