// 'use client';
//
// import { checkUser } from '@/lib/checkUser';
// import { db } from '@/lib/db';
// import { AIInsight, ExpenseRecord } from '@/types/Record';
// import { generateExpenseInsightsPuter } from '@/lib/aiPuter';
//
// export async function getAIInsightsClient(
//   lang: string = 'en',
// ): Promise<AIInsight[]> {
//   try {
//     const user = await checkUser();
//     if (!user) throw new Error('User not authenticated');
//
//     // Получаем расходы пользователя за последние 30 дней
//     const thirtyDaysAgo = new Date();
//     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
//
//     const expensesRaw = await db.record.findMany({
//       where: {
//         userId: user.clerkUserId,
//         createdAt: { gte: thirtyDaysAgo },
//       },
//       orderBy: { createdAt: 'desc' },
//       take: 50, // Берём максимум 50 последних расходов
//     });
//
//     if (expensesRaw.length === 0) {
//       // Fallback для новых пользователей
//       return [
//         {
//           id: 'welcome-1',
//           type: 'info',
//           title: 'Welcome to ExpenseTracker AI!',
//           message:
//             'Start adding your expenses to get personalized AI insights about your spending patterns.',
//           action: 'Add your first expense',
//           confidence: 1.0,
//         },
//         {
//           id: 'welcome-2',
//           type: 'tip',
//           title: 'Track Regularly',
//           message:
//             'For best results, try to log expenses daily. This helps our AI provide more accurate insights.',
//           action: 'Set daily reminders',
//           confidence: 1.0,
//         },
//       ];
//     }
//
//     // Преобразуем расходы в формат ExpenseRecord
//     const expenses: ExpenseRecord[] = expensesRaw.map((e) => ({
//       id: e.id,
//       amount: e.amount,
//       category: e.category || 'Other',
//       description: e.text,
//       date: e.createdAt.toISOString(),
//     }));
//
//     // ❗ Генерация инсайтов через Puter.js
//     const insights = await generateExpenseInsightsPuter(expenses, lang);
//     return insights;
//   } catch (error) {
//     console.error('Error getting AI insights:', error);
//
//     // Fallback при ошибке
//     return [
//       {
//         id: 'error-1',
//         type: 'warning',
//         title: 'Insights Temporarily Unavailable',
//         message:
//           "We're having trouble analyzing your expenses right now. Please try again in a few minutes.",
//         action: 'Retry analysis',
//         confidence: 0.5,
//       },
//     ];
//   }
// }
