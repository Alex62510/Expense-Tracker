// import { categorizeExpensePuter } from '@/lib/aiPuter';
//
// export async function suggestCategory(
//   description: string,
//   lang: string,
// ): Promise<{ category: string; error?: string }> {
//   try {
//     if (!description || description.trim().length < 2) {
//       return {
//         category: 'Other',
//         error: 'Description too short for AI analysis',
//       };
//     }
//
//     const category = await categorizeExpensePuter(description.trim(), lang);
//     return { category };
//   } catch (error) {
//     console.error('❌ Error in suggestCategory server action:', error);
//     return {
//       category: 'Other',
//       error: 'Unable to suggest category at this time',
//     };
//   }
// }
'use server';

import { categorizeExpense } from '@/lib/aiMini';

export async function suggestCategory(
  description: string,
  lang: string,
): Promise<{ category: string; error?: string }> {
  try {
    if (!description || description.trim().length < 2) {
      return {
        category: lang === 'ru' ? 'Другое' : 'Other',
        error: 'Description too short for AI analysis',
      };
    }

    const category = await categorizeExpense(description.trim(), lang);
    return { category };
  } catch (error) {
    console.error('❌ Error in suggestCategory server action:', error);
    return {
      category: lang === 'ru' ? 'Другое' : 'Other',
      error: 'Unable to suggest category at this time',
    };
  }
}
