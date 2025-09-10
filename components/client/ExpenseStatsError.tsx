'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ExpenseStatsError = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 hover:shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white text-xl">📊</span>
        </div>
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
            {t('expenseStats.title')}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {t('expenseStats.subtitle')}
          </p>
        </div>
      </div>
      <div className="bg-red-50/80 dark:bg-red-900/20 backdrop-blur-sm p-6 rounded-xl border-l-4 border-l-red-500">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center">
            <span className="text-lg">⚠️</span>
          </div>
          <p className="text-red-800 dark:text-red-300 font-semibold">
            {t('expenseStats.errorTitle')}
          </p>
        </div>
        <p className="text-red-700 dark:text-red-400 text-sm ml-11">
          {t('expenseStats.errorMessage')}
        </p>
      </div>
    </div>
  );
};

export default ExpenseStatsError;
