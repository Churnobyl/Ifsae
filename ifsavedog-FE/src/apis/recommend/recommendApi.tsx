import { ENDPOINT } from '@/apis/ApiConstants';
import { instance } from '@/apis/axios';

export const getRecommendDogListApi = async () => {
  return await instance.get(ENDPOINT.RECOMMENDED_DOG_LIST);
};

export const getLastPageNumApi = async () => {
  return await instance.get(ENDPOINT.RECOMMEND + '/index/lastpage');
};

export const getRecommendListApi = async (pageNum: number) => {
  return await instance.get(ENDPOINT.RECOMMEND + `/ranking?pageNum=${pageNum}`);
};
