import { ENDPOINT } from '@/apis/ApiConstants';
import { instance } from '@/apis/axios';
import { PostRequestType } from '@/types/post/PostRequestType';

export const likePostListApi = async () => {
  return await instance.get(ENDPOINT.POST_LIKE);
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

export const createPostLikeApi = async (postId: number) => {
  return await instance.post(`${ENDPOINT.POST_LIKE}?postId=${postId}`);
};

export const deletePostLikeApi = async (postId: number) => {
  return await instance.delete(`${ENDPOINT.POST_LIKE}?postId=${postId}`);
};

export const checkPostLikeApi = async (postId: number) => {
  return await instance.get(ENDPOINT.POST_LIKE + '/' + postId);
};

export const getPostDetailApi = async (postId: number) => {
  return await instance.get(`${ENDPOINT.POST}/${postId}`);
};

export const createCommentApi = async (postId: number, content: string) => {
  return await instance.post(`${ENDPOINT.POST}/${postId}`, {
    content: content,
  });
};

export const shelterPostListApi = async (shelterId: number) => {
  return await instance.get(`${ENDPOINT.POST_SHELTER}/${shelterId}`);
};

export const searchPostApi = async (query: string) => {
  return await instance.get(ENDPOINT.SEARCH_POST, {
    params: {
      query,
    },
  });
};
