import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface State {
  accessToken: string | undefined;
}

interface Action {
  setAccessToken: (accessToken: string | undefined) => void;
}

const useTokenStore = create(
  persist<State & Action>(
    (set) => ({
      accessToken: '',
      setAccessToken: (accessToken) => {
        const token = accessToken?.startsWith('Bearer ')
          ? accessToken.slice(7)
          : accessToken;
        set({ accessToken: token });
      },
    }),
    { name: 'accessToken', storage: createJSONStorage(() => localStorage) },
  ),
);

export { useTokenStore };
