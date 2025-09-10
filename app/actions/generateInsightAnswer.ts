'use server';

import { checkUser } from '@/lib/checkUser';
import { db } from '@/lib/db';
import { ExpenseRecord, generateAIAnswer } from '@/lib/aiMini';

export async function generateInsightAnswer(
  question: string,
  lang: string,
): Promise<string> {
  try {
    const user = await checkUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const expenses = await db.record.findMany({
      where: {
        userId: user.clerkUserId,
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    });

    const expenseData: ExpenseRecord[] = expenses.map((expense) => ({
      id: expense.id,
      amount: expense.amount,
      category: expense.category || 'Other',
      description: expense.text,
      date: expense.createdAt.toISOString(),
    }));

    // Generate AI answer
    return await generateAIAnswer(question, expenseData, lang);
  } catch (error) {
    console.error('Error generating insight answer:', error);
    return "I'm unable to provide a detailed answer at the moment. Please try refreshing the insights or check your connection.";
  }
}
