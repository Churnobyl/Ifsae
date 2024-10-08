import { ENDPOINT } from '@/apis/ApiConstants';
import { instance } from '@/apis/axios';

export const likePostListApi = async () => {
  return await instance.get(ENDPOINT.LIKE_POST_LIST);
};

export const deletePostApi = async (postId: number) => {
  return await instance.delete(ENDPOINT.POST + '/' + postId);
};
