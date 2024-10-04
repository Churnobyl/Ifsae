import { UserSurveyType } from '@/types/user/UserSurveyType';
import { produce } from 'immer';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const middlewares = (f: StateCreator<State & Setters>) =>
  devtools(immer(f), { name: 'userSurveyStore' });

type State = {
  userInput: UserSurveyType;
};

type Setters = {
  setUserInput: (userInput: Partial<UserSurveyType>) => void;
};

const useUserSurveyStore = create<State & Setters>()(
  middlewares((set) => ({
    userInput: {
      exerciseScore: -1,
      barkingTolerance: -1,
      groomingEffort: -1,
      preferredSize: -1,
      cohabitationWithOtherDogs: -1,
      exerciseLevel: -1,
      trainingExperience: -1,
      childFriendliness: -1,
    },
    setUserInput: (userInput) =>
      set((state) =>
        produce(state, (draft) => {
          Object.assign(draft.userInput, userInput);
        }),
      ),
  })),
);

export { useUserSurveyStore };
