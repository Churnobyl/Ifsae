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
      exerciseTime: -1,
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

/**
 * 서베이 질문 매핑
 */
const userSurveyMapper = {
  exerciseTime: ['운동 시간', '30분 이하', '2시간 이상'],
  barkingTolerance: ['짖는 정도', '조용해야함', '상관없음'],
  groomingEffort: ['털 관리', '관리가 쉬운 털', '관리가 어려운 털'],
  preferredSize: ['선호하는 크기', '소형', '대형'],
  cohabitationWithOtherDogs: [
    '다른 강아지들과의 공동생활 여부',
    '있음',
    '없음',
  ],
  exerciseLevel: ['운동 강도', '낮음', '매우 높음'],
  trainingExperience: ['훈련 경험', '없음', '훈련 경험 많음'],
  childFriendliness: [
    '아이와의 친화력',
    '아이와 상호작용 어려움',
    '매우 친화적',
  ],
};

export { useUserSurveyStore, userSurveyMapper };
