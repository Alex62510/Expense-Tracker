import React from 'react';
import getUserRecord from '@/app/actions/getUserRecord';
import getBestWorstExpense from '@/app/actions/getBestWorstExpense';
import ExpenseStatsT from '@/components/client/ExpenseStatsT';
import ExpenseStatsError from '@/components/client/ExpenseStatsError';

const ExpenseStats = async () => {
  try {
    // Fetch both average and range data
    const [userRecordResult, rangeResult] = await Promise.all([
      getUserRecord(),
      getBestWorstExpense(),
    ]);

    const { record, daysWithRecords } = userRecordResult;
    const { bestExpense, worstExpense } = rangeResult;

    // Calculate average expense
    const validRecord = record || 0;
    const validDays =
      daysWithRecords && daysWithRecords > 0 ? daysWithRecords : 1;
    const averageExpense = validRecord / validDays;

    return (
      <ExpenseStatsT
        averageExpense={averageExpense}
        bestExpense={bestExpense}
        worstExpense={worstExpense}
        validDays={validDays}
      />
    );
  } catch (error) {
    console.error('Error fetching expense statistics:', error);
    return <ExpenseStatsError />;
  }
};

export default ExpenseStats;
