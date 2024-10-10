import { ENDPOINT } from '@/apis/ApiConstants';
import { instance } from '@/apis/axios';
import { UserSurveyType } from '@/types/user/UserSurveyType';

export const updateUserProfileImageApi = async (image: File) => {
  return await instance.putForm(ENDPOINT.UPDATE_USER_PROFILE_IMAGE, {
    profileImg: image,
  });
};

export const createSurveyApi = async (surveyInput: UserSurveyType) => {
  return await instance.post(ENDPOINT.SURVEY, surveyInput);
};
