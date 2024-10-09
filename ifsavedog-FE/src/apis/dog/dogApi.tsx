import { ENDPOINT } from '@/apis/ApiConstants';
import { instance } from '@/apis/axios';
import { DogCreateDtoType } from '@/types/dog/DogCreateDtoType';

export const dogCreateApi = async (
  dogCreateRequest: DogCreateDtoType,
  dogImage: File,
) => {
  return await instance.postForm(ENDPOINT.DOG, {
    dogCreateRequest: new Blob([JSON.stringify(dogCreateRequest)], {
      type: 'application/json',
    }),
    dogImage: dogImage,
  });
};

export const dogDetailApi = async (dogId: number) => {
  return await instance.get(ENDPOINT.DOG + '/' + dogId);
};

export const dogPostApi = async (dogId: number) => {
  return await instance.get(ENDPOINT.POSTLIST_DOG + '/' + dogId);
};

export const followApi = async (dogId: number) => {
  return await instance.post(`${ENDPOINT.FOLLOW}?dogId=${dogId}`);
};

export const unFollowApi = async (dogId: number) => {
  return await instance.delete(`${ENDPOINT.FOLLOW}?dogId=${dogId}`);
};

export const checkFollowApi = async (dogId: number) => {
  return await instance.get(ENDPOINT.FOLLOW + '/' + dogId);
};

export const followDogListApi = async () => {
  return await instance.get(ENDPOINT.FOLLOW_DOG_LIST);
};

export const shelterDogListApi = async (shelterId: number) => {
  return await instance.get(ENDPOINT.SHELTER_DOG_LIST + '/' + shelterId);
};
