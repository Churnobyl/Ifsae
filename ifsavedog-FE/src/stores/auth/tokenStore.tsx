import { StateCreator, create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

const middlewares = (f: StateCreator<State & Action>) =>
  devtools(
    persist(f, {
      name: 'accessToken',
      storage: createJSONStorage(() => localStorage),
    }),
    { name: 'tokenStore' },
  );

interface State {
  accessToken: string | undefined;
}

interface Action {
  setAccessToken: (accessToken: string | undefined) => void;
}

const useTokenStore = create(
  middlewares((set) => ({
    accessToken: '',
    setAccessToken: (accessToken) => {
      const token = accessToken?.startsWith('Bearer ')
        ? accessToken.slice(7)
        : accessToken;
      set({ accessToken: token });
    },
  })),
);

export { useTokenStore };
