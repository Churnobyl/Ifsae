export type DogDetailType = {
  id: number;
  name: string;
  age: number;
  gender: 'MALE' | 'FEMALE' | 'NEUTRAL';
  dogStatus: 'NOT_ADOPTED' | 'ADOPTED';
  species: string;
  info: string;
  image: string;
  shelterId: number;
  shelterName: string;
  followCnt: number;
};
