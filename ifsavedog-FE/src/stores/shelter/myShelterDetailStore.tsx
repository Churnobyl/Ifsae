import { ShelterDetailType } from '@/types/shelter/ShelterDetailType';
import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const middlewares = (
  f: StateCreator<ShelterDetailType & Setters & ExtraSetters>,
) =>
  devtools(immer(persist(f, { name: 'myShelterState' })), {
    name: 'myShelterDetailStore',
  });

type Setters = {
  [K in keyof ShelterDetailType as `set${Capitalize<K>}`]: (
    value: ShelterDetailType[K],
  ) => void;
};
type ExtraSetters = {
  setShelterState: (shelterState: ShelterDetailType) => void;
};

export const useMyShelterDetailStore = create<
  ShelterDetailType & Setters & ExtraSetters
>()(
  middlewares((set) => ({
    id: -1,
    name: '',
    address: '',
    phone: '',
    content: '',
    canBeDonated: true,
    shelterProfileImg: '',
    setId: (id: number) => set(() => ({ id })),
    setName: (name: string) => set(() => ({ name })),
    setAddress: (address: string) => set(() => ({ address })),
    setPhone: (phone: string) => set(() => ({ phone })),
    setContent: (content: string) => set(() => ({ content })),
    setCanBeDonated: (canBeDonated: boolean) => set(() => ({ canBeDonated })),
    setShelterProfileImg: (shelterProfileImg: string) =>
      set(() => ({ shelterProfileImg })),
    setShelterState: (shelterState: ShelterDetailType) => {
      const { ...rest } = shelterState;

      set(() => ({ ...rest }));
    },
  })),
);
