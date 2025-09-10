import { useState } from 'react';

declare global {
  interface Window {
    puter: any;
  }
}

export function useSuggestCategory() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPuterScript = (): Promise<void> => {
    return new Promise((resolve) => {
      if (window.puter) return resolve();

      const existingScript = document.querySelector<HTMLScriptElement>(
        'script[src="https://js.puter.com/v2/"]',
      );
      if (existingScript) {
        existingScript.addEventListener('load', () => resolve());
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://js.puter.com/v2/';
      script.async = true;
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  };

  const suggestCategory = async (description: string): Promise<string> => {
    if (typeof window === 'undefined') return 'Other'; // SSR защита
    if (!description.trim()) {
      setError('Description too short for AI analysis');
      return 'Other';
    }

    setLoading(true);
    setError(null);

    try {
      await loadPuterScript(); // ждём загрузки Puter.js

      const prompt = `Categorize this expense into one of these categories: Food, Transportation, Entertainment, Shopping, Bills, Healthcare, Other. Respond only with the category name: "${description}"`;

      const responseObj = await window.puter.ai.chat(prompt, {
        model: 'gpt-5-nano',
      });

      const category =
        responseObj?.result?.message?.content?.trim() ||
        responseObj?.toString?.().trim() ||
        'Other';

      const validCategories = [
        'Food',
        'Transportation',
        'Entertainment',
        'Shopping',
        'Bills',
        'Healthcare',
        'Other',
      ];

      return validCategories.includes(category) ? category : 'Other';
    } catch (err) {
      console.error('❌ Error in suggestCategory client:', err);
      setError('Unable to suggest category at this time');
      return 'Other';
    } finally {
      setLoading(false);
    }
  };

  return { suggestCategory, loading, error };
}
