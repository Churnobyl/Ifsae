import { ENDPOINT } from '@/apis/ApiConstants';
import { instance } from '@/apis/axios';

export const getRecommendDogListApi = async (pageNum: number) => {
  return await instance.get(
    `${ENDPOINT.RECOMMENDED_DOG_LIST}?pageNum=${pageNum}`,
  );
};
