import { ENDPOINT } from '@/apis/ApiConstants';
import { instance } from '@/apis/axios';
import { ShelterCreateType } from '@/types/shelter/ShelterCreateRequest';

export const createShelterApi = async (userInput: ShelterCreateType) => {
  return await instance.post(ENDPOINT.CREATE_SHELTER, userInput);
};
