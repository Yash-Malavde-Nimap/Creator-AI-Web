import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface RegistrationData {
  name: string;
  countryCode: string;
  phone: string;
  email: string;
  password: string;
}

interface RegistrationStore extends RegistrationData {
  setRegistrationData: (data: Partial<RegistrationData>) => void;
  reset: () => void;
  getData: () => RegistrationData;
}

const initialState: RegistrationData = {
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

      setRegistrationData: (data) => set((state) => ({ ...state, ...data })),

      reset: () => set(initialState),

      getData: () => {
        const { name, countryCode, phone, email, password } = get();
        return { name, countryCode, phone, email, password };
      },
    }),
    { name: 'RegistrationStore' }
  )
);
