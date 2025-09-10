'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';

type RecordCartErrorProps = {
  errorMessage?: string;
};

const RecordChartError = ({ errorMessage }: RecordCartErrorProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 hover:shadow-2xl">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-sky-600 via-cyan-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white text-sm sm:text-lg">📊</span>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
            {t('chart.title')}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {t('chart.subtitle')}
          </p>
        </div>
      </div>
      <div className="bg-red-50/80 dark:bg-red-900/20 backdrop-blur-sm p-3 sm:p-4 rounded-xl border-l-4 border-l-red-500">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center">
            <span className="text-sm">⚠️</span>
          </div>
          <p className="text-red-800 dark:text-red-300 font-semibold text-sm">
            {t('chart.errorTitle')}
          </p>
        </div>
        <p className="text-red-700 dark:text-red-400 text-xs ml-8">
          {errorMessage}
        </p>
      </div>
    </div>
  );
};

export default RecordChartError;
