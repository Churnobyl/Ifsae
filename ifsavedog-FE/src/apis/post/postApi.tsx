import { ENDPOINT } from '@/apis/ApiConstants';
import { instance } from '@/apis/axios';
import { PostRequestType } from '@/types/post/PostRequestType';

export const createPostApi = async (data: PostRequestType, video: File) => {
  return await instance.postForm(ENDPOINT.CREATE_POST, {
    data: new Blob([JSON.stringify(data)], { type: 'application/json' }),
    video: video,
  });
};
