import { ENDPOINT } from '@/apis/ApiConstants';
import { instance } from '@/apis/axios';

export const updateUserProfileImageApi = async (image: File) => {
  return await instance.putForm(ENDPOINT.UPDATE_USER_PROFILE_IMAGE, {
    profileImg: image,
  });
};
