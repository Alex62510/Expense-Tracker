'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';

type RecordHistoryProps = {
  error?: string;
};

const RecordHistoryError = ({ error }: RecordHistoryProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white text-sm sm:text-lg">📝</span>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
            {t('expenseHistoryTitle')}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {t('expenseHistorySubtitle')}
          </p>
        </div>
      </div>
      <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-l-4 border-l-red-500 p-3 sm:p-4 rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 dark:bg-red-800 rounded-lg flex items-center justify-center">
            <span className="text-base sm:text-lg">⚠️</span>
          </div>
          <h4 className="font-bold text-red-800 dark:text-red-300 text-sm">
            {t('errorLoadingExpenseHistory')}
          </h4>
        </div>
        <p className="text-red-700 dark:text-red-400 ml-8 sm:ml-10 text-xs">
          {error || t('unknownError')}
        </p>
      </div>
    </div>
  );
};

export default RecordHistoryError;
