import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type RegistrationStep = 1 | 2 | 3 | 4;

interface RegistrationData {
  name: string;
  countryCode: string;
  phone: string;
  email: string;
  password: string;
}

interface RegistrationStore extends RegistrationData {
  step: RegistrationStep;

  setStep: (step: RegistrationStep) => void;
  setName: (name: string) => void;
  setPhone: (phone: string, countryCode?: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
  getData: () => RegistrationData;
}

const initialState: Omit<RegistrationStore, keyof Pick<RegistrationStore,
  'setStep' | 'setName' | 'setPhone' | 'setEmail' | 'setPassword' |
  'nextStep' | 'prevStep' | 'reset' | 'getData'>> = {
  step: 1,
  name: '',
  countryCode: '+1',
  phone: '',
  email: '',
  password: '',
};

export const useRegistrationStore = create<RegistrationStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      setStep: (step) => set({ step }),

      setName: (name) => set({ name }),

      setPhone: (phone, countryCode) =>
        set((state) => ({ phone, countryCode: countryCode ?? state.countryCode })),

      setEmail: (email) => set({ email }),

      setPassword: (password) => set({ password }),

      nextStep: () =>
        set((state) => ({
          step: Math.min(state.step + 1, 4) as RegistrationStep,
        })),

      prevStep: () =>
        set((state) => ({
          step: Math.max(state.step - 1, 1) as RegistrationStep,
        })),

      reset: () => set(initialState),

      getData: () => {
        const { name, countryCode, phone, email, password } = get();
        return { name, countryCode, phone, email, password };
      },
    }),
    { name: 'RegistrationStore' }
  )
);
