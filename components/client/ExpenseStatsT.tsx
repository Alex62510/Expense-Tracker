'use client';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRateStore } from '@/store/useRateStore';

type Props = {
  averageExpense: number;
  validDays: number;
  bestExpense?: number;
  worstExpense?: number;
};

const ExpenseStatsT = ({
  bestExpense,
  worstExpense,
  averageExpense,
  validDays,
}: Props) => {
  const { t, i18n } = useTranslation();
  const { rate, fetchRate } = useRateStore();

  useEffect(() => {
    fetchRate(i18n.language);
  }, [i18n.language, fetchRate]);

  const currencySymbol = i18n.language === 'ru' ? 'Br' : '$';
  const formatAmount = (amount?: number) =>
    amount !== undefined
      ? i18n.language === 'ru'
        ? (amount * rate).toFixed(2)
        : amount.toFixed(2)
      : undefined;

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 hover:shadow-2xl">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white text-sm sm:text-lg">📊</span>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
            {t('expenseStats.title')}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {t('expenseStats.subtitle')}
          </p>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {/* Average Daily Spending */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-3 sm:p-4 border border-gray-200/50 dark:border-gray-600/50">
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-2 tracking-wide uppercase">
              {t('expenseStats.averageDailySpending')}
            </p>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {currencySymbol} {formatAmount(averageExpense)}
            </div>
            <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full text-xs font-medium">
              <span className="w-1.5 h-1.5 bg-emerald-500 dark:bg-emerald-400 rounded-full"></span>
              {t('expenseStats.basedOnDays', { count: validDays })}
            </div>
          </div>
        </div>

        {/* Expense Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {/* Highest Expense */}
          <div className="bg-red-50/80 dark:bg-red-900/20 backdrop-blur-sm p-3 sm:p-4 rounded-xl border-l-4 border-l-red-500 hover:bg-red-50 dark:hover:bg-red-900/30">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-100 dark:bg-red-800 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-sm leading-none text-red-600 dark:text-red-300 font-bold">
                  ↑
                </span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 dark:text-gray-100 text-xs mb-0.5">
                  {t('expenseStats.highest')}
                </h4>
                <p className="text-lg font-bold text-red-600 dark:text-red-300">
                  {bestExpense !== undefined
                    ? `${currencySymbol} ${formatAmount(bestExpense)}`
                    : t('expenseStats.noData')}
                </p>
              </div>
            </div>
          </div>

          {/* Lowest Expense */}
          <div className="bg-green-50/80 dark:bg-green-900/20 backdrop-blur-sm p-3 sm:p-4 rounded-xl border-l-4 border-l-green-500 hover:bg-green-50 dark:hover:bg-green-900/30">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-sm leading-none text-green-600 dark:text-green-300 font-bold">
                  ↓
                </span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 dark:text-gray-100 text-xs mb-0.5">
                  {t('expenseStats.lowest')}
                </h4>
                <p className="text-lg font-bold text-green-600 dark:text-green-300">
                  {worstExpense !== undefined
                    ? `${currencySymbol} ${formatAmount(worstExpense)}`
                    : t('expenseStats.noData')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseStatsT;
