import { DogListDtoType } from '@/types/dog/DogListDtoType';
import { CommentResponseDtoType } from '@/types/post/CommentResponseDtoType';
import { ShelterPreviewDtoType } from '@/types/shelter/ShelterPreviewDtoType';

export type MungtsuResponseType = {
  id: number;
  title: string;
  content: string;
  videoUrl: string;
  thumbnailUrl: string;
  shelter: ShelterPreviewDtoType;
  dogs: DogListDtoType[];
  comments: CommentResponseDtoType[];
  likeCnt: number;
  viewCnt: number;
};
