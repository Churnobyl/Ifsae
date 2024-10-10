import { DogType } from '@/types/dog/DogType';

export interface MainPrevVideoInterface {
  id: number;
  thumbnailUrl: string;
  like: number;
  title: string;
  dogs: DogType[];
}
