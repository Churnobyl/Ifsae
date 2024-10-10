import { Step } from '@/types/auth/SignupStepEnum';
import { UserSignupInputType } from '@/types/auth/UserSignupInputType';
import { produce } from 'immer';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const middlewares = (f: StateCreator<State & Setters>) =>
  devtools(immer(f), { name: 'signupStore' });

type State = {
  userInput: UserSignupInputType;
};

type Setters = {
  setStep: (step: Step) => void;
  setUserInput: (userInput: Partial<UserSignupInputType>) => void;
};

const useSignupStore = create<State & Setters>()(
  middlewares((set) => ({
    userInput: {
      step: Step.기타정보,
      email: '',
      password: '',
      nickname: '',
      role: -1,
      authNumber: '',
    },
    setStep: (step) =>
      set((state) =>
        produce(state, (draft) => {
          draft.userInput.step = step;
        }),
      ),
    setUserInput: (userInput) =>
      set((state) =>
        produce(state, (draft) => {
          Object.assign(draft.userInput, userInput);
        }),
      ),
  })),
);

export { useSignupStore };
