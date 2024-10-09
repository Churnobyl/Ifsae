import { ENDPOINT } from '@/apis/ApiConstants';
import { instance } from '@/apis/axios';

export const centerDonationListApi = async () => {
  return await instance.get(ENDPOINT.SHELTER_DONATION_LIST);
};

export const userDonationListApi = async () => {
  return await instance.get(ENDPOINT.USER_DONATION_LIST);
};
