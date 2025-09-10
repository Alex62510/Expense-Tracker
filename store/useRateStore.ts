// stores/useRateStore.ts
'use client';
import { create } from 'zustand';

type RateStore = {
  rate: number;
  setRate: (newRate: number) => void;
  fetchRate: (lang: string) => Promise<void>;
};

export const useRateStore = create<RateStore>((set) => ({
  rate: 1, // по умолчанию USD

  setRate: (newRate) => set({ rate: newRate }),

  fetchRate: async (lang: string) => {
    if (lang !== 'ru') {
      set({ rate: 1 });
      return;
    }

    try {
      const res = await fetch(
        `https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_EXCHANGERATE_API}/latest/USD`,
      );
      if (res.ok) {
        const data = await res.json();
        set({ rate: data?.conversion_rates?.BYN ?? 3 });
      } else {
        console.warn('Ошибка при запросе курса, используем запасной 3');
        set({ rate: 3 });
      }
    } catch (error) {
      console.error('Ошибка при получении курса USD/BYN:', error);
      set({ rate: 3 });
    }
  },
}));
