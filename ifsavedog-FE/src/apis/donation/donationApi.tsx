import { ENDPOINT } from '@/apis/ApiConstants';
import { instance } from '@/apis/axios';

export const donationListApi = async () => {
  return await instance.get(ENDPOINT.SHELTER_DONATION_LIST);
};