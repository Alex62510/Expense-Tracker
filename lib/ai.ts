// import OpenAI from 'openai';
//
// interface RawInsight {
//   type?: string;
//   title?: string;
//   message?: string;
//   action?: string;
//   confidence?: number;
// }
//
// const openai = new OpenAI({
//   baseURL: 'https://openrouter.ai/api/v1',
//   apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
//   defaultHeaders: {
//     'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
//     'X-Title': 'ExpenseTracker',
//   },
// });
//
// export interface ExpenseRecord {
//   id: string;
//   amount: number;
//   category: string;
//   description: string;
//   date: string;
// }
//
// export interface AIInsight {
//   id: string;
//   type: 'warning' | 'info' | 'success' | 'tip';
//   title: string;
//   message: string;
//   action?: string;
//   confidence: number;
// }
//
// export async function generateExpenseInsights(
//   expenses: ExpenseRecord[],
//   lang: string = 'en',
// ): Promise<AIInsight[]> {
//   try {
//     // Prepare expense data for AI analysis
//     const expensesSummary = expenses.map((expense) => ({
//       amount: expense.amount,
//       category: expense.category,
//       description: expense.description,
//       date: expense.date,
//     }));
//
//     const prompt = `Analyze the following expense data and provide 3-4 actionable financial insights.
//     Respond in ${lang === 'ru' ? 'Russian' : 'English'}.
//
//     Return a JSON array of insights with this structure:
//     {
//       "type": "warning|info|success|tip",
//       "title": "Brief title",
//       "message": "Detailed insight message with specific numbers when possible",
//       "action": "Actionable suggestion",
//       "confidence": 0.8
//     }
//
//     Expense Data:
//     ${JSON.stringify(expensesSummary, null, 2)}
//
//     Focus on:
//     1. Spending patterns (day of week, categories)
//     2. Budget alerts (high spending areas)
//     3. Money-saving opportunities
//     4. Positive reinforcement for good habits
//
//     Return only valid JSON array, no additional text.`;
//
//     const completion = await openai.chat.completions.create({
//       model: 'deepseek/deepseek-chat-v3-0324:free',
//       messages: [
//         {
//           role: 'system',
//           content:
//             'You are a financial advisor AI that analyzes spending patterns and provides actionable insights. Always respond with valid JSON only.',
//         },
//         {
//           role: 'user',
//           content: prompt,
//         },
//       ],
//       temperature: 0.7,
//       max_tokens: 1000,
//     });
//
//     const response = completion.choices[0].message.content;
//     if (!response) {
//       throw new Error('No response from AI');
//     }
//
//     // Clean the response by removing markdown code blocks if present
//     let cleanedResponse = response.trim();
//     if (cleanedResponse.startsWith('```json')) {
//       cleanedResponse = cleanedResponse
//         .replace(/^```json\s*/, '')
//         .replace(/\s*```$/, '');
//     } else if (cleanedResponse.startsWith('```')) {
//       cleanedResponse = cleanedResponse
//         .replace(/^```\s*/, '')
//         .replace(/\s*```$/, '');
//     }
//
//     // Parse AI response
//     const insights = JSON.parse(cleanedResponse);
//
//     // Add IDs and ensure proper format
//     const formattedInsights = insights.map(
//       (insight: RawInsight, index: number) => ({
//         id: `ai-${Date.now()}-${index}`,
//         type: insight.type || 'info',
//         title: insight.title || (lang === 'ru' ? 'AI инсайт' : 'AI Insight'),
//         message:
//           insight.message ||
//           (lang === 'ru' ? 'Анализ завершён' : 'Analysis complete'),
//         action: insight.action,
//         confidence: insight.confidence || 0.8,
//       }),
//     );
//
//     return formattedInsights;
//   } catch (error) {
//     console.error('❌ Error generating AI insights:', error);
//
//     // Fallback to mock insights if AI fails
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
// export async function categorizeExpense(
//   description: string,
//   lang: string = 'en',
// ): Promise<string> {
//   try {
//     const completion = await openai.chat.completions.create({
//       model: 'deepseek/deepseek-chat-v3.1:free',
//       messages: [
//         {
//           role: 'system',
//           content: `You are an expense categorization AI. Categorize expenses into one of these categories ${
//             lang === 'ru'
//               ? '(на русском): Еда, Транспорт, Развлечения, Покупки, Коммунальные платежи, Здоровье, Другое'
//               : '(in English): Food, Transportation, Entertainment, Shopping, Bills, Healthcare, Other'
//           }. Respond with only the category name.`,
//         },
//         {
//           role: 'user',
//           content: `Categorize this expense: "${description}"`,
//         },
//       ],
//       temperature: 0.1,
//       max_tokens: 20,
//     });
//
//     const category = completion.choices[0].message.content?.trim();
//
//     // допустимые категории
//     const validCategoriesEn = [
//       'Food',
//       'Transportation',
//       'Entertainment',
//       'Shopping',
//       'Bills',
//       'Healthcare',
//       'Other',
//     ];
//
//     const validCategoriesRu = [
//       'Еда',
//       'Транспорт',
//       'Развлечения',
//       'Покупки',
//       'Коммунальные платежи',
//       'Здоровье',
//       'Другое',
//     ];
//
//     const validCategories =
//       lang === 'ru' ? validCategoriesRu : validCategoriesEn;
//
//     const finalCategory = validCategories.includes(category || '')
//       ? category!
//       : validCategories[validCategories.length - 1]; // Other/Другое
//
//     return finalCategory;
//   } catch (error) {
//     console.error('❌ Error categorizing expense:', error);
//     return lang === 'ru' ? 'Другое' : 'Other';
//   }
// }
//
// export async function generateAIAnswer(
//   question: string,
//   context: ExpenseRecord[],
//   lang: string = 'en',
// ): Promise<string> {
//   if (!window.puter) throw new Error('Puter.js not loaded');
//
//   try {
//     const expensesSummary = context.map((expense) => ({
//       amount: expense.amount,
//       category: expense.category,
//       description: expense.description,
//       date: expense.date,
//     }));
//
//     const prompt = `Based on the following expense data, provide a detailed and actionable answer to this question (reply in ${
//       lang === 'ru' ? 'Russian' : 'English'
//     }): "${question}"
//
// Expense Data:
// ${JSON.stringify(expensesSummary, null, 2)}
//
// Provide a comprehensive answer that:
// 1. Addresses the specific question directly
// 2. Uses concrete data from the expenses when possible
// 3. Offers actionable advice
// 4. Keeps the response concise but informative (2-3 sentences)
//
// Return only the answer text, no additional formatting.`;
//
//     const responseObj = await window.puter.ai.chat(prompt, {
//       model: 'gpt-5-nano',
//     });
//
//     const response = (
//       responseObj?.result?.message?.content ||
//       responseObj?.toString() ||
//       ''
//     ).trim();
//
//     if (!response) {
//       throw new Error('No response from AI');
//     }
//
//     return response;
//   } catch (error) {
//     console.error('❌ Error generating AI answer:', error);
//     return lang === 'ru'
//       ? 'Сейчас не удаётся получить подробный ответ. Попробуйте обновить инсайты или проверьте подключение.'
//       : "I'm unable to provide a detailed answer at the moment. Please try refreshing the insights or check your connection.";
//   }
// }
