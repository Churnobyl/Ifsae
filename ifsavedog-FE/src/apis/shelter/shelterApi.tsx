import { ENDPOINT } from '@/apis/ApiConstants';
import { instance } from '@/apis/axios';
import { ShelterCreateType } from '@/types/shelter/ShelterCreateRequest';

export const createShelterApi = async (userInput: ShelterCreateType) => {
  return await instance.post(ENDPOINT.SHELTER, userInput);
};

export const getMyShelterApi = async () => {
  return await instance.get(ENDPOINT.GET_MY_SHELTER);
};

export const updateShelterProfileImageApi = async (image: File) => {
  return await instance.putForm(ENDPOINT.UPDATE_SHELTER_PROFILE_IMAGE, {
    profileImg: image,
  });
};

export const getShelterDetailApi = async (shelterId: number) => {
  return await instance.get(`${ENDPOINT.SHELTER}/${shelterId}`);
};