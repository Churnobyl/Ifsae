import { ENDPOINT } from '@/apis/ApiConstants';
import { instance } from '@/apis/axios';
import { PostRequestType } from '@/types/post/PostRequestType';

export const likePostListApi = async () => {
  return await instance.get(ENDPOINT.LIKE_POST_LIST);
};

export const deletePostApi = async (postId: number) => {
  return await instance.delete(ENDPOINT.POST + '/' + postId);
};

export const createPostApi = async (data: PostRequestType, video: File) => {
  return await instance.postForm(ENDPOINT.POST, {
    data: new Blob([JSON.stringify(data)], { type: 'application/json' }),
    video: video,
  });
};
