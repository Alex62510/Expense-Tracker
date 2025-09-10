// 'use client';
//
// import { useState, useEffect } from 'react';
// import { AIInsight, ExpenseRecord, RawInsight } from '@/types/Record';
//
// declare global {
//   interface Window {
//     puter: any;
//   }
// }
//
// // --------------------
// // Динамическая загрузка Puter.js
// // --------------------
// export function usePuterLoader(): boolean {
//   const [loaded, setLoaded] = useState(false);
//
//   useEffect(() => {
//     if (window.puter) {
//       if (!customElements.get('puter-dialog')) {
//         window.puter.registerCustomElements?.();
//       }
//       setLoaded(true);
//       return;
//     }
//
//     const script = document.createElement('script');
//     script.src = 'https://js.puter.com/v2/';
//     script.async = true;
//     script.onload = () => {
//       if (!customElements.get('puter-dialog')) {
//         window.puter.registerCustomElements?.();
//       }
//       setLoaded(true);
//     };
//     document.body.appendChild(script);
//
//     // Не удаляем скрипт при размонтировании
//   }, []);
//
//   return loaded;
// }
//
// // lib/aiPuter.ts
//
// export async function generateExpenseInsightsPuter(
//   lang: string = 'en',
// ): Promise<AIInsight[]> {
//   if (!window.puter) throw new Error('Puter.js not loaded');
//
//   try {
//     const res = await fetch('/api/records'); // серверный маршрут возвращает ExpenseRecord[]
//     const expenses: ExpenseRecord[] = await res.json();
//     if (!expenses || expenses.length === 0) {
//       return [
//         {
//           id: 'welcome-1',
//           type: 'info',
//           title:
//             lang === 'ru'
//               ? 'Добро пожаловать в ExpenseTracker AI!'
//               : 'Welcome to ExpenseTracker AI!',
//           message:
//             lang === 'ru'
//               ? 'Начните добавлять расходы, чтобы получать персонализированные инсайты.'
//               : 'Start adding your expenses to get personalized AI insights about your spending patterns.',
//           action:
//             lang === 'ru' ? 'Добавить первый расход' : 'Add your first expense',
//           confidence: 1.0,
//         },
//         {
//           id: 'welcome-2',
//           type: 'tip',
//           title:
//             lang === 'ru'
//               ? 'Отслеживайте расходы регулярно'
//               : 'Track Regularly',
//           message:
//             lang === 'ru'
//               ? 'Для лучших результатов фиксируйте расходы каждый день.'
//               : 'For best results, try to log expenses daily. This helps our AI provide more accurate insights.',
//           action:
//             lang === 'ru'
//               ? 'Установить ежедневные напоминания'
//               : 'Set daily reminders',
//           confidence: 1.0,
//         },
//       ];
//     }
//     let rate = 3;
//
//     if (lang === 'ru') {
//       try {
//         const res = await fetch(
//           `https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_EXCHANGERATE_API}latest/USD`,
//         );
//         if (res.ok) {
//           const data = await res.json();
//           rate = data?.conversion_rates?.BYN ?? 3;
//         } else {
//           console.warn('Ошибка при запросе курса, используем запасной 3');
//         }
//       } catch (error) {
//         console.error('Ошибка при получении курса USD/BYN:', error);
//       }
//     }
//
//     const expensesSummary = expenses.map((expense) => ({
//       amount:
//         lang === 'ru'
//           ? `${(expense.amount * rate).toFixed(2)} BYN`
//           : `${expense.amount.toFixed(2)} USD`,
//       category: expense.category,
//       description: expense.description,
//       date: expense.date,
//     }));
//
//     const prompt = `Analyze the following expense data and provide 3-4 actionable financial insights.
// Respond in ${lang === 'ru' ? 'Russian' : 'English'}.
// Return a JSON array of insights with this structure:
// {
//   "type": "warning|info|success|tip",
//   "title": "Brief title",
//   "message": "Detailed insight message with specific numbers when possible",
//   "action": "Actionable suggestion",
//   "confidence": 0.8
// }
// Expense Data:
// ${JSON.stringify(expensesSummary, null, 2)}
// Focus on:
// 1. Spending patterns (day of week, categories)
// 2. Budget alerts (high spending areas)
// 3. Money-saving opportunities
// 4. Positive reinforcement for good habits
// Return only valid JSON array, no additional text.`;
//
//     // ❗ Генерация инсайтов через Puter.js
//     const responseObj = await window.puter.ai.chat(prompt, {
//       model: 'gpt-5-nano',
//     });
//     let response = (
//       responseObj?.result?.message?.content ||
//       responseObj?.toString() ||
//       ''
//     ).trim();
//
//     if (!response) throw new Error('No response from AI');
//
//     // Чистим возможные обёртки ```json
//     if (response.startsWith('```json')) {
//       response = response.replace(/^```json\s*/, '').replace(/\s*```$/, '');
//     } else if (response.startsWith('```')) {
//       response = response.replace(/^```\s*/, '').replace(/\s*```$/, '');
//     }
//
//     const insights = JSON.parse(response);
//     const formattedInsights = insights.map(
//       (insight: RawInsight, index: number) => ({
//         id: `ai-${Date.now()}-${index}`,
//         type: insight.type || 'info',
//         title: insight.title || (lang === 'ru' ? 'AI инсайт' : 'AI Insight'),
//         message:
//           insight.message ||
//           (lang === 'ru' ? 'Анализ завершён' : 'Analysis complete'),
//         action:
//           insight.action ||
//           (lang === 'ru' ? 'Обновить инсайты' : 'Refresh insights'),
//         confidence: insight.confidence || 0.8,
//       }),
//     );
//
//     return formattedInsights;
//   } catch (error) {
//     console.error('❌ Error generating AI insights:', error);
//     return [
//       {
//         id: 'fallback-1',
//         type: 'info',
//         title: lang === 'ru' ? 'Анализ недоступен' : 'AI Analysis Unavailable',
//         message:
//           lang === 'ru'
//             ? 'Не удалось сгенерировать инсайты. Попробуйте позже.'
//             : 'Unable to generate personalized insights at this time. Please try again later.',
//         action: lang === 'ru' ? 'Обновить инсайты' : 'Refresh insights',
//         confidence: 0.5,
//       },
//     ];
//   }
// }
//
// // --------------------
// // Категоризация расходов
// // --------------------
// export async function categorizeExpensePuter(
//   description: string,
//   lang: string = 'en',
// ): Promise<string> {
//   if (!window.puter) throw new Error('Puter.js not loaded');
//   try {
//     const categoriesEn = [
//       'Food',
//       'Transportation',
//       'Entertainment',
//       'Shopping',
//       'Bills',
//       'Healthcare',
//       'Other',
//     ];
//     const categoriesRu = [
//       'Еда',
//       'Транспорт',
//       'Развлечения',
//       'Покупки',
//       'Коммунальные платежи',
//       'Здоровье',
//       'Другое',
//     ];
//     const validCategories = lang === 'ru' ? categoriesRu : categoriesEn;
//     const prompt =
//       lang === 'ru'
//         ? `Категоризируй этот расход в одну из категорий: ${validCategories.join(
//             ', ',
//           )}. Ответь только названием категории: "${description}"`
//         : `Categorize this expense into one of these categories: ${validCategories.join(
//             ', ',
//           )}. Respond only with the category name: "${description}"`;
//     const responseObj = await window.puter.ai.chat(prompt, {
//       model: 'gpt-5-nano',
//     });
//     const category = (
//       responseObj?.result?.message?.content ||
//       responseObj?.toString() ||
//       ''
//     ).trim();
//     return validCategories.includes(category)
//       ? category
//       : validCategories[validCategories.length - 1]; // "Other"/"Другое"
//   } catch (error) {
//     console.error('❌ Error categorizing expense:', error);
//     return lang === 'ru' ? 'Другое' : 'Other';
//   }
// }
//
// // --------------------
// // Генерация ответа AI
// // --------------------
// export async function generateAIAnswerPuter(
//   question: string,
//   context: ExpenseRecord[],
// ): Promise<string> {
//   if (!window.puter) throw new Error('Puter.js not loaded');
//   try {
//     const expensesSummary = context.map((e) => ({
//       amount: e.amount,
//       category: e.category,
//       description: e.description,
//       date: e.date,
//     }));
//     const prompt = `Based on the following expenses, answer: "${question}". Use concrete data and be concise. Return only text.
// Expense Data: ${JSON.stringify(expensesSummary, null, 2)}`;
//     const responseObj = await window.puter.ai.chat(prompt, {
//       model: 'gpt-5-nano',
//     });
//     return (
//       responseObj?.result?.message?.content ||
//       responseObj?.toString() ||
//       ''
//     ).trim();
//   } catch (error) {
//     console.error('❌ Error generating AI answer:', error);
//     return "I'm unable to provide a detailed answer at the moment.";
//   }
// }
