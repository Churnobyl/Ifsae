import { ShelterCreateType } from '@/types/shelter/ShelterCreateRequest';
import { produce } from 'immer';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const middlewares = (f: StateCreator<State & Setters>) =>
  devtools(immer(f), { name: 'shelterCreateStore' });

type State = {
  userInput: ShelterCreateType;
};

type Setters = {
  setUserInput: (userInput: Partial<ShelterCreateType>) => void;
};

const useShelterCreateStore = create<State & Setters>()(
  middlewares((set) => ({
    userInput: {
      name: '',
      address: '',
      phone: '',
      content: '',
      canBeDonated: true,
    },
    setUserInput: (userInput) =>
      set((state) =>
        produce(state, (draft) => {
          Object.assign(draft.userInput, userInput);
        }),
      ),
  })),
);

export { useShelterCreateStore };
