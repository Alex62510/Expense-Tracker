// app/api/records/route.ts
import {  NextResponse } from 'next/server';
import { checkUser } from '@/lib/checkUser';
import { db } from '@/lib/db';
import { ExpenseRecord } from '@/types/Record';

export async function GET() {
  try {
    const user = await checkUser();
    if (!user) throw new Error('User not authenticated');

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const expensesRaw = await db.record.findMany({
      where: { userId: user.clerkUserId, createdAt: { gte: thirtyDaysAgo } },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    const expenses: ExpenseRecord[] = expensesRaw.map((e) => ({
      id: e.id,
      amount: e.amount,
      category: e.category || 'Other',
      description: e.text,
      date: e.createdAt.toISOString(),
    }));

    return NextResponse.json(expenses);
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 500 });
  }
}
