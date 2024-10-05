import { UserReponseType } from '@/types/auth/UserResponseType';
import { UserStateType } from '@/types/auth/UserStateType';
import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const middlewares = (f: StateCreator<UserStateType & Setters & ExtraSetters>) =>
  devtools(immer(persist(f, { name: 'userState' })), {
    name: 'userStateStore',
  });

type Setters = {
  [K in keyof UserStateType as `set${Capitalize<K>}`]: (
    value: UserStateType[K],
  ) => void;
};
type ExtraSetters = {
  setUserState: (userState: UserReponseType) => void;
};

export const useUserStateStore = create<
  UserStateType & Setters & ExtraSetters
>()(
  middlewares((set) => ({
    id: 0,
    email: '',
    nickname: '',
    grade: '',
    profileImgUrl: '',
    role: '',
    userStatus: '',
    setId: (id: number) => set(() => ({ id })),
    setEmail: (email: string) => set(() => ({ email })),
    setNickname: (nickname: string) => set(() => ({ nickname })),
    setGrade: (grade: string) => set(() => ({ grade })),
    setProfileImgUrl: (profileImgUrl: string) => set(() => ({ profileImgUrl })),
    setRole: (role: string) => set(() => ({ role })),
    setUserStatus: (userStatus: string) => set(() => ({ userStatus })),
    setUserState: (userResponse: UserReponseType) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { accessToken, ...rest } = userResponse;

      set(() => ({ ...rest }));
    },
  })),
);
